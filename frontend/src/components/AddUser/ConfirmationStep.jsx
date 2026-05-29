import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

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

  const { currentUser } = useAppContext();

  // Use createdUser first, fallback to currentUser
  const activeUser = createdUser || currentUser;

  const avatar = avatars.find(
    (avatar) => String(avatar.id) === String(selectedAvatar)
  )?.image_url;

  return (
    // This component is used for both creating and editing users, so we check if we're in edit mode to adjust the text accordingly.
    <div className="step">
      <h2>
        {isEditMode
          ? "Användare uppdaterad!"
          : "Användare skapad!"}
      </h2>

      <div className="profile-actions">
        <EditProfileButton
          onClick={() =>
            navigate(`/redigera-profil/${activeUser.id}`)
          }
        />

        <DeleteUserButton
          user={activeUser}
          redirectTo="/logga-in"
        />
      </div>

      <img
        src={avatar}
        alt="Vald avatar"
        className="created-avatar"
      />

      <h2 className="User-name">{name}</h2>

      <div className="button-group">
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
          onClick={() =>
            navigate(`/dashboard/${activeUser.id}`)
          }
        >
          {name}s startsida
        </button>
      </div>
    </div>
  );
}

export default ConfirmationStep;