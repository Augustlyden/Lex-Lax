import { FaTrash } from "react-icons/fa";

function ConfirmationStep({ name, avatars, selectedAvatar, setStep, handleAddAnotherUser, handleDeleteUser }) {
            const avatar = avatars.find((avatar) => avatar.id === selectedAvatar)?.image_url;
            return (
                <div className="step">
                    <h2>Användare skapad!</h2>
                    <button className="flat-btn delete-user-btn" onClick={handleDeleteUser}>
                        <FaTrash />
                    </button>
                    <img src={avatar} alt="Vald avatar" className="created-avatar" />
                    <h2 className="User-name">{name}</h2>
                    <div className="button-group">
                        <button className="flat-btn" onClick={() => setStep(1)}>
                            Redigera
                        </button>
                        <button className="secondary-btn" onClick={handleAddAnotherUser}>
                            Skapa en till användare
                        </button>
                        <button className="primary-btn" onClick={() => console.log("Gå till startsidan")}>
                            {name}s startsida
                        </button>
                    </div>
                </div>
            );
        }

        export default ConfirmationStep;