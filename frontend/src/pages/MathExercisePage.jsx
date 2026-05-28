import { useState } from 'react';
import TestCard from '../components/TestCard';
import TestResult from '../components/TestResult';

// Generate a random math question object (factors between 1 and 10)
const generateNewQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
        question: `${num1} × ${num2}`,
        // Store answer as a string to simplify comparison with the text input field
        answer: String(num1 * num2) 
    };
};

const MathExercisePage = () => {
    // --- Game Configuration & State ---
    const TOTAL_QUESTIONS = 10;

    // Uses a callback to run generateNewQuestion() only once on initial mount.
    // This avoids cascading renders and keeps the initial generation out of a useEffect.
    const [currentQuestion, setCurrentQuestion] = useState(() => generateNewQuestion());

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [gameFinished, setGameFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    // --- Game Logic ---
    // Evaluates the current answer and advances the game state
    const nextQuestion = () => {
        // Compare values directly as strings since form input values are always strings
        const isCorrect = currentAnswer.trim() === currentQuestion.answer;
        if (isCorrect) setScore(prev => prev + 1);

        // Append the current turn results to the user history array
        setUserAnswers(prev => [...prev, {
            question: currentQuestion.question,
            correctAnswer: currentQuestion.answer,
            userAnswer: currentAnswer || 'No answer',
            isCorrect
        }]);

        // Go to the next turn or end session
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setCurrentAnswer('');
            setCurrentQuestion(generateNewQuestion());
        } else {
            setGameFinished(true);
        }
    };

    // Resets game states and generates a fresh question for a new round
    const restartGame = () => {
        setScore(0);
        setCurrentIndex(0);
        setCurrentAnswer('');
        setUserAnswers([]);
        setGameFinished(false);
        setCurrentQuestion(generateNewQuestion());
    };

    return (
        <div className="question-page">
            <h1 className='page-title'>Multiplikationstabellen</h1>

            {gameFinished ? (
                /* 🌟 Reusing the same result layout with dynamic math buttons */
                <TestResult
                    score={score}
                    totalQuestions={TOTAL_QUESTIONS}
                    userAnswers={userAnswers}
                    onRestart={restartGame}
                >
                    <button className="secondary-btn" onClick={() => window.location.href = '/matematik/2'}>
                        Välj annat test
                    </button>                    
                </TestResult>
            ) : (
                <TestCard
                    key={currentIndex} 
                    questionText={currentQuestion.question}
                    nextQuestion={nextQuestion}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    currentCount={currentIndex + 1}
                    totalCount={TOTAL_QUESTIONS}
                    subject="matematik"
                    // Test not from database so no simple way to fetch subjectId
                    backUrl={`/matematik/2`}
                />
            )}
        </div>
    );
};

export default MathExercisePage;