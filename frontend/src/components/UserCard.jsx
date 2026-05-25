import EditProfileButton from "./UI/EditProfileButton";

function UserCard({ user, onClick, manageProfiles, onEdit }) {
  return (
    
    <div className="login-user-card" onClick={onClick}>
      <div className="login-user-image">
        <img
          src={user.image_url}
          alt={user.username}
          className="created-avatar"
        />
      </div>
      <div className="login-user-name">
      <h2>{user.username}</h2>

      {manageProfiles && (
        <EditProfileButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        />
      )}
    </div>

    </div>
  );
}

export default UserCard;
