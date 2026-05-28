import { useEffect, useState } from 'react';
import { getQuestions } from '../api/questionsApi';
import TestCard from '../components/TestCard';
import TestResult from '../components/TestResult';
import Loading from '../components/UI/Loading';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { updateAndCreateStats } from '../api/statisticApi';
import {Link} from "react-router-dom"

const QuestionPage = () => {
    // --- State Management ---
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);
    const { subjectId, listId } = useParams();
    const { currentUser } = useAppContext();

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

    const nextQuestion = async () => {
        // Was the answer correct?
        const wasCorrect = validateQuestion(currentAnswer);
        const updatedScore = wasCorrect ? score + 1 : score;

        // Save the user's answer to display in the final summary
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
            const wrongAnswersCount = amountOfQuestions - updatedScore;

            if (currentUser && currentUser.id) {
                try {
                    await updateAndCreateStats(
                        Number(currentUser.id),
                        Number(listId),
                        updatedScore,
                        wrongAnswersCount
                    );
                } catch (error) {
                    console.error('Misslyckades att spara statistik:', error.message);
                }
            } else {
                console.warn('No active user found. Statistics could not be saved.');
            }
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

            {questions.length === 0 ? (
                (loading ? <Loading /> : <p>Inga frågor hittades...</p>)
            ) : gameFinished ? (
                <TestResult
                    score={score}
                    totalQuestions={questions.length}
                    userAnswers={userAnswers}
                    onRestart={restartGame}
                >
                    <Link className="secondary-btn" to={`/sprak/${subjectId}/skapa`}> Skapa nytt test </Link>

                   <Link className="secondary-btn" to={`/sprak/${subjectId}`}> Välj annat test </Link>
                </TestResult>
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