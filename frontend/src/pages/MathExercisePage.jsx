import { useState } from 'react';
import TestCard from '../components/TestCard';

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

    // Generates a new math question and updates the component state
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCurrentQuestion({
            question: `${num1} × ${num2}`,
            answer: String(num1 * num2) 
        });
    };

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
            generateQuestion(); 
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

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCurrentQuestion({
            question: `${num1} × ${num2}`,
            answer: String(num1 * num2)
        });
    };

    return (
        <div className="question-page">
            <h1 className='page-title'>Multiplikationstabellen</h1>

            {/* --- Game View Conditional Rendering --- */}
            {gameFinished ? (
                <div className="end-screen">
                    <h3>{`Du fick ${score} av ${TOTAL_QUESTIONS} rätt!`}</h3>

                    <div className="summary-container">
                        <h4>Dina svar:</h4>
                        <ul className="summary-list">
                            {userAnswers.map((item, index) => (
                                <li key={index} className={`summary-item ${item.isCorrect ? 'correct-row' : 'wrong-row'}`}>
                                    <div className="summary-status">
                                        {item.isCorrect ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="#15F1B5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#D8003B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                    </div>
                                    <div className="summary-details">
                                        <p><strong>Fråga:</strong> {item.question}</p>
                                        <p><strong>Ditt svar:</strong> {item.userAnswer}</p>
                                        {!item.isCorrect && <p><strong>Rätt svar:</strong> <span className="correct-ans">{item.correctAnswer}</span></p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="end-buttons">
                        <button className="primary-btn" onClick={restartGame}>Spela igen</button>
                        <button className="secondary-btn" onClick={() => window.location.href = '/matematik/:subjectId'}>
                            Välj annat test
                        </button>                    
                    </div>
                </div>
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