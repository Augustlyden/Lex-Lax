import '../styles/testResult.css';
import { Link } from 'react-router-dom';

const TestResult = ({ 
    score, 
    totalQuestions, 
    userAnswers, 
    onRestart, 
    children
}) => {
    return (
        <div className="end-screen">
            <h3>{`Du fick ${score} av ${totalQuestions} rätt`}</h3>

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

            {/* Render actions section with standard restart button and injected custom buttons */}
            <div className="end-buttons">
                <button className="primary-btn" onClick={onRestart}>
                    Spela igen
                </button>
                <Link className="secondary-btn" to={`/statistik`}>
                Se all statistik
                </Link>

                {children}
            </div>
        </div>
    );
};

export default TestResult;