import "../styles/navbar.css"
import { useAppContext } from "../hooks/useAppContext";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom"
import logo from "../assets/logos/logo.png";


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

          <NavLink className="nav-logo" to={`/dashboard/${currentUser?.id}`}>
          <img src={logo} alt="Lex Lax" />
          </NavLink>

{/* Profile Menu */}        
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

              <h4>Byt användare</h4>

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

       
     </div>

   </div>
     </nav>
    </header>
    
)}
