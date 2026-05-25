function UserCard({ user, onClick }) {
  return (
    <div className="login-user-card" onClick={onClick}>
      <div className="login-user-image">
        <img
          src={user.image_url}
          alt={user.username}
          className="created-avatar"
        />
      </div>

      <h2>{user.username}</h2>
    </div>
  );
}

export default UserCard;