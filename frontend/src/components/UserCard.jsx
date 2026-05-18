
function UserCard({user}) {
    return (
       <div className="login-user-card">
                        <div className="login-user-image">
                              <img 
                               src={user.image}
                               alt={user.name}
                              />
                        </div>
                        <h2>{user.name}</h2>
                        </div>
    )
}

export default UserCard;