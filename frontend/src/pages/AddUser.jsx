import { useEffect, useState } from "react";
import { getAvatars } from "../api/avatarApi";
import "../styles/addUser.css";


function AddUser() {

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarData = await getAvatars();
            setAvatars(avatarData);
        };

        fetchAvatars();
    }, []);

    const handleNext = () => {
        if (step === 1 && name.trim() === "") {
            alert("Du måste fylla i ditt namn. Sen får du välja en avatar!");

            return;
        }

        if (step === 2 && selectedAvatar === "") {
            alert("Du måste välja en avatar!");

            return;
        }

        setStep(step + 1);

        console.log("Användare skapad:", { name, selectedAvatar });
    };

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

                    <button type="button" className="primary-btn" onClick={handleNext}>Nästa</button>
                    </div>
                )}
                {step === 2 && (
                    <div className="step">
                        <h2>Välj en avatar</h2>
                        <div className="avatar-grid">
                            {avatars.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.image_url}
                                    alt={avatar.name}
                                    className={`avatar ${selectedAvatar === avatar.id ? "selected" : ""}`}
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                />
                            ))}

                        </div>
                        <button className="primary-btn" onClick={handleNext}>Skapa användare</button>
                    </div>
                )}

            </main>
        );
    }

    export default AddUser;