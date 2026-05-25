        function AvatarStep({
                name,
                avatars,
                selectedAvatar,
                setSelectedAvatar,
                errorMessage,
                handleCreateUser,
                isEditing,
}) {
  return (
    <div className="step">
      <h2>Välj en avatar till {name}</h2>

      <div className="avatar-grid">
        {avatars.map((avatar) => (
          <div className="avatar-card" key={avatar.id}>
            <img
              src={avatar.image_url}
              alt={avatar.name}
              className={`avatar ${
                selectedAvatar === avatar.id ? "selected" : ""
              }`}
              onClick={() => setSelectedAvatar(avatar.id)}
            />
          </div>
        ))}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="button" className="primary-btn" onClick={handleCreateUser}>
        {isEditing ? "Uppdatera användaren" : "Skapa användaren"}
      </button>
    </div>
  );
}

export default AvatarStep;