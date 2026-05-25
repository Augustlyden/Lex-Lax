import EditProfileButton from "./UI/EditProfileButton";
import DeleteUserButton from "./UI/DeleteUserButton";
import "../styles/UserCard.css";

function UserCard({ user, onClick, manageProfiles, onEdit }) {
  return (
    
    <div className="login-user-card" onClick={onClick}>
      <div className="login-user-image">
        <img
          src={user.image_url}
          alt={user.username}
          className="round-image"
        />
      </div>
      <div className="login-user-name">
      <h2>{user.username}</h2>
 
  {manageProfiles && (
  <div className="profile-actions">
    
    <EditProfileButton
      onClick={(e) => {
        e.stopPropagation();
        onEdit?.();
      }}
    />

   <DeleteUserButton user={user} redirectTo="/login" />

  </div>
)}
    </div>

    </div>
  );
}

export default UserCard;
