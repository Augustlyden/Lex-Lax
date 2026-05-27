import "../styles/navbar.css"
import { useAppContext } from "../hooks/useAppContext";
import {useState} from "react"
import { useNavigate } from "react-router-dom";


export default function Navbar() {

 
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const navigate = useNavigate();
    const { users, currentUser, setCurrentUser } = useAppContext();

    const handleSwitchUser = (user) => {
      setCurrentUser(user);
        setProfileMenuOpen(false);
      navigate(`/dashboard/${user.id}`);
    }

    const handleEditProfile = () => {
      setProfileMenuOpen(false);
      navigate(`/redigera-profil/${currentUser.id}`);
    }
    const handleLogout = () => {
      setCurrentUser(null);
      navigate("/");
      setProfileMenuOpen(false);
    };

    return (
    <header>
      <nav>
        
        <div className = "nav-container">
          <div className = "nav-content">

            <div className = "nav-logo">
              <h1>LEX LÄX</h1>
            </div>


           <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <button type="button" onClick={() => navigate("/")}>
  Hem
</button>

<button type="button" onClick={() => navigate("/statistik")}>
  Statistik
</button>

<button
  type="button"
  onClick={() => navigate(`/dashboard/${currentUser?.id}`)}
>
  Profil
</button>
            </div>

        
    {currentUser && (
          <div className="active-user-menu">
            <button
              type="button"
              className="active-user-btn"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <img
                src={currentUser.image_url}
                alt={currentUser.username}
                className="active-user-avatar"
              />
            </button>

            {profileMenuOpen && (
              <div className="profile-menu">
                <h2>{currentUser.username}</h2>

                <button type="button" onClick={handleEditProfile}>
                  Redigera profil
                </button>

                <p>Byt användare</p>

                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className="profile-menu-user"
                    onClick={() => handleSwitchUser(user)}
                  >
                    {user.username}
                  </button>
                ))}
<br />
                <button type="button" onClick={handleLogout}>
                  Logga ut  
                </button>
              </div>
            )}
          </div>
        )}
            
            <div
      className="hamburger"
      onClick={() => setMenuOpen(!menuOpen)}
      > ☰
      </div>
     </div>

   </div>
     </nav>
    </header>
    )}