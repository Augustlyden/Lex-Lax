import { useState } from "react";
import "../styles/addUser.css";

function AddUser() {

    const [step, setStep] = useState(1);

    const [name, setName] = useState("");

    const [selectedAvatar, setSelectedAvatar] = useState("");

    const handleNext = () => {
        if (step === 1 && name.trim() === "") {
            alert("Du måste fylla i ditt namn. Sen får du välja en avatar!");

            return;
        }

        if (step === 2 && selectedAvatar === "") {
            alert("Du måste välja en avatar!");

            return;
        }

        /* Plats förSupabase-kod */

        console.log("Användare skapad:", { name, selectedAvatar });

        return (
            <main className="add-user-container">
                <h1>Skapa en användare</h1>
                {step === 1 && (
                    <div className="step">
                        <label htmlFor="name">Namn:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Skriv användarens namn..."
                        />

                    <button className="btn-primary" onClick={handleNext}>Välj avatar</button>
                    </div>
                )}
                {step === 2 && (
                    <div className="step">
                        <h2>Välj en avatar</h2>
                        <div className="avatar-grid">
                            {avatars.map((avatar) => (
                            ))}

                        </div>
                    </div>

                    <button className="btn-primary" onClick={handleNext}>Skapa användare</button>
                )}

            </main>
        );
    }

    export default AddUser;