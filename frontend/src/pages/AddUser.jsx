import { useEffect, useState } from "react";
import { getAvatars } from "../api/avatarApi";
import "../styles/addUser.css";


function AddUser() {

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [avatars, setAvatars] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarData = await getAvatars();
            setAvatars(avatarData);
        };

        fetchAvatars();
    }, []);

 const handleNext = () => {
  if (name.trim() === "") {
    setErrorMessage("Du måste fylla i ditt namn.");
    return;
  }

  setErrorMessage("");
  setStep(2);
};

const handleCreateUser = () => {
  if (selectedAvatar === "") {
    setErrorMessage("Du måste välja en avatar!");
    return;
  }

  setErrorMessage("");
  console.log("Användare skapad:", { name, selectedAvatar });
};

        return (
            <div className="add-user-container">
                <h1>Skapa en användare</h1>
                {step === 1 && (
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
    )}
    {step === 2 && (
        <div className="step">
            <h2>Välj en avatar till {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</h2>
            <div className="avatar-grid">
                {avatars.map((avatar) => (
                    <div className="avatar-card">
                    <img
                        className="avatar"
                        key={avatar.id}
                        src={avatar.image_url}
                        alt={avatar.name}
                        className={`avatar ${selectedAvatar === avatar.id ? "selected" : ""}`}
                        onClick={() => setSelectedAvatar(avatar.id)}
                    />
                    </div>
                ))}

            </div>
            {errorMessage && (
    <p className="error-message">
    {errorMessage}
    </p>
    )}
                        <button className="primary-btn" onClick={handleCreateUser}>Skapa användare</button>
                    </div>
                )}
                {step === 3 && (
                    <div className="step">
                        <h2>Användare skapad!</h2>
                        <img src={avatars.find((avatar) => avatar.id === selectedAvatar)?.image_url} alt="Vald avatar" className="selected-avatar" />
                        <p>Namn: {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
                        <button className="flat-btn" onClick={() => setStep(1)}>Redigera användare</button>
                        <button className="secondary-btn" onClick={() => setStep(1)}>Skapa ytterligare en användare</button>
                        <button className="primary-btn" onClick={() => console.log("Gå till startsidan")}>Gå till {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}s startsida</button>
                    </div>
                )}

            </div>
        );
    }

    export default AddUser;