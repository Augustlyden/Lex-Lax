import EditProfileButton from "./UI/EditProfileButton";
import DeleteUserButton from "./UI/DeleteUserButton";
import "../styles/UserCard.css";

function UserCard({ user, onClick, manageProfiles, onEdit }) {
  return (
    
    <div className="login-user-card" onClick={onClick}>
        {manageProfiles && (
        <div className="profile-actions-start">
          
          <DeleteUserButton user={user} redirectTo="/login" />
          <EditProfileButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          />
      
      
        </div>
      )}
      <div className="login-user-image">
        <img
          src={user.image_url}
          alt={user.username}
          className="round-image"
        />
      </div>
      <div className="login-user-name">
      <h2>{user.username}</h2>
 
    </div>

    </div>
  );
}

export default UserCard;
