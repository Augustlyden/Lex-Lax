import '../styles/questionCard.css';
import { useEffect, useState } from 'react';
import { getQuestions } from '../api/questionsApi';
import QuestionCard from '../components/QuestionCard';
import Loading from '../components/UI/Loading';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);

    const { listId } = useParams();

    useEffect(() => {
        const fetchListById = async (listId) => {
            try {
                const data = await getQuestions(listId);
                setLoading(false);
                const randomizedData = [...data].sort(() => Math.random() - 0.5);
                setQuestions(randomizedData);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };
        fetchListById(listId);
    }, []);

    const nextQuestion = () => {
        // 1. Kolla om svaret var rätt
        const wasCorrect = validateQuestion(currentAnswer);
        const updatedScore = wasCorrect ? score + 1 : score;

        // 2. Spara svar
        setUserAnswers(prevAnswers => [
            ...prevAnswers,
            {
                id: currentQuestion.id,
                question: currentQuestion.question,
                correctAnswer: currentQuestion.answer,
                userAnswer: currentAnswer,
                isCorrect: wasCorrect
            }
        ]);

        // 3. Gå vidare eller avsluta
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setCurrentAnswer('');
        } else {
            const amountOfQuestions = questions.length;
            console.log(`du fick ${updatedScore} av ${amountOfQuestions} rätt!`);
            setGameFinished(true);
        }
    };

    const restartGame = () => {
        const randomizedData = [...questions].sort(() => Math.random() - 0.5);
        setQuestions(randomizedData);
        setCurrentIndex(0);
        setGameFinished(false);
        setScore(0);
        setCurrentAnswer('');
        setUserAnswers([]); 
    };

    const currentQuestion = questions[currentIndex];

    const validateQuestion = (answer) => {
        const userAnswerCleaned = answer.trim().toLowerCase();
        const correctAnswerCleaned = currentQuestion.answer.trim().toLowerCase();
        const isCorrect = userAnswerCleaned === correctAnswerCleaned;

        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="question-page">
            <h1 className='page-title'>{questions[0]?.title}</h1>

            {/* SPEL-LOGIK */}
            {questions.length === 0 ? (
                (loading ? <Loading /> : <p>Inga frågor hittades...</p>)
            ) : gameFinished ? (
                <div className="end-screen">
                    <h3>{`Du fick ${score} av ${questions.length} rätt`}</h3>

                    <div className="summary-container">
                        <h4>Resultat:</h4>
                        <ul className="summary-list">
                            {userAnswers.map((item, index) => (
                                <li
                                    key={item.id || index}
                                    className={`summary-item ${item.isCorrect ? 'correct-row' : 'wrong-row'}`}
                                >
                                    <div className="summary-status">
                                        {item.isCorrect ? (
                                            //  Bock-ikon
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12L10 17L20 7" stroke="#15F1B5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            //  Kors-ikon
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="#D8003B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="summary-details">
                                        <p><strong>Fråga:</strong> {item.question}</p>
                                        <p><strong>Ditt svar:</strong> <span>{item.userAnswer || <i>Inget svar</i>}</span></p>
                                        {!item.isCorrect && (
                                            <p><strong>Rätt svar:</strong> <span className="correct-ans">{item.correctAnswer}</span></p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="end-buttons">
                        <button className="primary-btn" onClick={restartGame}>
                            Spela igen
                        </button>
                        <button className="secondary-btn" onClick={() => window.location.href = '/skapa-test'}>
                            Skapa nytt test
                        </button>
                        <button className="secondary-btn" onClick={() => window.location.href = '/amne'}>
                            Välj annat test
                        </button>
                    </div>
                </div>
            ) : (
                <QuestionCard
                    key={currentQuestion.id}
                    questionObj={currentQuestion}
                    nextQuestion={nextQuestion}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    currentCount={currentIndex + 1}
                    totalCount={questions.length}
                />
            )}
        </div>
    );
};

export default QuestionPage;