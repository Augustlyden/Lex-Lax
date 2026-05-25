
function NameStep({ name, setName, errorMessage, handleNext }) {

    return (
        <div className="step">
            <h2>Vad heter användaren?</h2>
            <label htmlFor="name">Namn:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Skriv användarens namn..."
            />

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}

            <button type="button" className="primary-btn" onClick={handleNext}>Nästa</button>
        
        </div>
    );
}

export default NameStep;