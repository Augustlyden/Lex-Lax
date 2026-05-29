import '../styles/testCard.css';
import {Link} from "react-router-dom";

const TestCard = ({
    questionText,
    nextQuestion,
    setCurrentAnswer,
    currentAnswer,
    currentCount,
    totalCount,
    subject = 'sprak', // Default fallback subject
    backUrl
}) => {

    // Handles form submission, preventing empty inputs and triggering the next question
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prevent submission if the user only entered whitespace
        if (!currentAnswer.trim()) return; 
        nextQuestion();
    };

    // Background gradient depending on the current subject
    const cardStyle = {
        backgroundImage: subject === 'matematik' ? 'var(--subject-2-gradient)' : 'var(--subject-1-gradient)'
    };

    return (
        <div className='question-card' style={cardStyle}>
            <h2 className="question-text">{questionText}</h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    // Different input type for martematik and språk
                    type={subject === 'matematik' ? 'number' : 'text'} 
                    placeholder="Skriv ditt svar här..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    autoFocus 
                    required
                />

                <span className="progress-text">Fråga {currentCount} / {totalCount}</span>
                
                {/* Redirects the user back to the correct category view using the provided URL string */}
               <Link to={backUrl} className="flat-btn"> Avsluta test </Link>

                <button type="submit" className='primary-btn'>
                    {currentCount === totalCount ? 'Se resultat' : 'Nästa fråga'}
                </button>
            </form>
        </div>
    );
};

export default TestCard;