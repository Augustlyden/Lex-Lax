import { useEffect, useState } from 'react';
import { getQuestions } from '../api/questionsApi';
import TestCard from '../components/TestCard';
import Loading from '../components/UI/Loading';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
    // --- State Management ---
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);

    // Extract route parameters to know which quiz list and subject to load
    const { subjectId, listId } = useParams();

    // --- Side Effects ---
    // Fetch quiz questions from the API whenever the listId changes
    useEffect(() => {
        const fetchListById = async () => {
            try {
                const data = await getQuestions(listId);
                setLoading(false);
                
                // Shuffle the questions to ensure a random order
                const randomizedData = [...data].sort(() => Math.random() - 0.5);
                setQuestions(randomizedData);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };
        fetchListById();
    }, [listId]);

    // --- Game Logic ---
    // Handles transition to the next question or triggers the end game screen
    const nextQuestion = () => {
        const wasCorrect = validateQuestion(currentAnswer);
        const updatedScore = wasCorrect ? score + 1 : score;

        // Save the user's answer details to display in the final summary
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

        // Check if there are more questions left, otherwise finish the game
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setCurrentAnswer('');
        } else {
            const amountOfQuestions = questions.length;
            console.log(`du fick ${updatedScore} av ${amountOfQuestions} rätt!`);
            setGameFinished(true);
        }
    };

    // Resets the game state and reshuffles the questions for a new round
    const restartGame = () => {
        const randomizedData = [...questions].sort(() => Math.random() - 0.5);
        setQuestions(randomizedData);
        setCurrentIndex(0);
        setGameFinished(false);
        setScore(0);
        setCurrentAnswer('');
        setUserAnswers([]);
    };

    // Reference to the currently active question object
    const currentQuestion = questions[currentIndex];

    // Validates the user input against the correct answer (case-insensitive and trimmed)
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

            {/* --- Game View Conditional Rendering --- */}
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
                                            // Checkmark Icon
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12L10 17L20 7" stroke="#15F1B5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            // Cross Icon
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
                        <button className="secondary-btn" onClick={() => window.location.href = '/sprak/:subjectId/skapa'}>
                            Skapa nytt test
                        </button>
                        <button className="secondary-btn" onClick={() => window.location.href = '/sprak/:subjectId'}>
                            Välj annat test
                        </button>
                    </div>
                </div>
            ) : (
                <TestCard
                    key={currentQuestion.id}
                    questionText={currentQuestion.question}
                    nextQuestion={nextQuestion}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    currentCount={currentIndex + 1}
                    totalCount={questions.length}
                    subject="sprak"
                    backUrl={`/sprak/${subjectId}`}
                />
            )}
        </div>
    );
};

export default QuestionPage;