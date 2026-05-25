import '../styles/questionCard.css';

const QuestionCard = ({
    questionObj,
    nextQuestion,
    setCurrentAnswer,
    currentAnswer,
    currentCount,
    totalCount
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentAnswer.trim()) {
            return; 
        }
        nextQuestion();
    };

    return (
        <div className='question-card'>
    
            <h2 className="question-text">{questionObj.question}</h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Skriv ditt svar här..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    autoFocus 
                    required
                />

                <span className="progress-text">Fråga {currentCount} / {totalCount}</span>
                
                {/* ÄNDRA SÖKVÄG PÅ KNAPPEN SENARE */}
                <button type="button" className="flat-btn" onClick={() => window.location.href = '/amne'}>
                    Avsluta test
                </button>
                {/* ÄNDRA SÖKVÄG PÅ KNAPPEN SENARE */}


                <button type="submit" className='primary-btn'>
                    {currentCount === totalCount ? 'Avsluta test' : 'Nästa fråga'}
                </button>
            </form>
        </div>
    );
};

export default QuestionCard;