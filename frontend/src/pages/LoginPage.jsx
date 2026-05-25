import "../styles/loginPage.css"
import UserCard from "../components/UserCard"
  
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../provider/ContextProvider";
import { useState } from "react";


function LoginPage() {
    const navigate = useNavigate();
    const { users, deleteUser } = useAppContext();
    const [manageProfiles, setManageProfiles] = useState(false);

 return (
  <div>

      <div className = "login-text-content">
        <h1>Vem ska plugga?</h1>
        <p>Välj din profil eller skapa en ny för att komma igång!</p>
      </div>
                
      <div className="login-user-content">
        {users.map((user) => (
      <UserCard
  key={user.id}
  user={user}
  manageProfiles={manageProfiles}
  onClick={() => navigate(`/dashboard/${user.id}`)}
  
    onEdit={() => navigate(`/edit-user/${user.id}`)}
    onDelete={() => {
      deleteUser(user.id);
      navigate("/login");
    }}
    />  
        ))}
        <div className="new-user-text">
      <button type="button" className="flat-btn add-btn" onClick={() => navigate("/add-user")}>+</button>
      <h2> Ny användare</h2>
      </div>
      </div>
      

      <button onClick={() => setManageProfiles(!manageProfiles)} className="flat-btn open-edit-btn"> {manageProfiles ? "Klar" : "Hantera Profiler"} </button>    
  </div>
 
)}

export default LoginPage