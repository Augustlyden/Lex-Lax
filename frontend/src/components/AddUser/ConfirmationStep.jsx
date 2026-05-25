import { useNavigate } from "react-router-dom";
import EditProfileButton from "../UI/EditProfileButton";
import DeleteUserButton from "../UI/DeleteUserButton";

function ConfirmationStep({
  name,
  avatars,
  selectedAvatar,
  createdUser,
  handleAddAnotherUser,
  isEditMode,
}) {
  const navigate = useNavigate();

  const avatar = avatars.find(
    (avatar) => String(avatar.id) === String(selectedAvatar)
  )?.image_url;

  return (
    <div className="step">
      <h2>{isEditMode ? "Användare uppdaterad!" : "Användare skapad!"}</h2>

      <DeleteUserButton user={createdUser} redirectTo="/login" />

      <img
        src={avatar}
        alt="Vald avatar"
        className="created-avatar"
      />

      <h2 className="User-name">{name}</h2>

      <div className="button-group">
        <EditProfileButton
  onClick={() => navigate(`/edit-user/${createdUser.id}`)}
/>

        {!isEditMode && (
          <button
            className="secondary-btn"
            onClick={handleAddAnotherUser}
          >
            Skapa en till användare
          </button>
        )}

        <button
          className="primary-btn"
          onClick={() => navigate(`/dashboard/${createdUser.id}`)}
        >
          {name}s startsida
        </button>
      </div>
    </div>
  );
}

export default ConfirmationStep;