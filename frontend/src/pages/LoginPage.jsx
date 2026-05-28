import "../styles/loginPage.css"
import UserCard from "../components/UserCard"
import logo from "../assets/logos/logo.png";
  
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useState } from "react";


function LoginPage() {
    const navigate = useNavigate();
    const { users, deleteUser, setCurrentUser } = useAppContext();
    const [manageProfiles, setManageProfiles] = useState(false);
/*  */
 return (

  <div className="login-container">
      <div className = "login-text-content">
        <img src={logo} alt="Lex Lax" className="h1-logo" />
        <p>Välj din profil eller skapa en ny för att komma igång!</p>
      </div>
                
      <div className="login-user-content">
        {users.map((user) => (
      <UserCard
  key={user.id}
  user={user}
  manageProfiles={manageProfiles}
    onClick={() => {
      setCurrentUser(user);
      navigate(`/dashboard/${user.id}`)}}
    onEdit={() => navigate(`/redigera-profil/${user.id}`)}
    onDelete={() => {
      deleteUser(user.id);
      navigate("/logga-in");
    }}
    />  
        ))}
        <div className="new-user-text">
      <button type="button" className="flat-btn add-btn" onClick={() => navigate("/skapa-profil")}>+</button>
      <h2> Ny användare</h2>
      </div>
      </div>
      

      <button onClick={() => setManageProfiles(!manageProfiles)} className="flat-btn open-edit-btn"> {manageProfiles ? "Klar" : "Hantera Profiler"} </button>    
  </div>
 
)}

export default LoginPage