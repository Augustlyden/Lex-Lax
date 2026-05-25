import "../styles/loginPage.css"
import UserCard from "../components/UserCard"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../provider/ContextProvider";


function LoginPage() {
    const navigate = useNavigate();
    const { users } = useAppContext();

 return (
  <div className = "login-page-container">
    <div className = "login-content-wrapper">

      <div className = "login-text-content">
        <h1>Vem ska plugga idag?</h1>
        <p>Välj din profil för att komma igång!</p>
      </div>
                
      <div className="login-user-content">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => navigate(`/dashboard/${user.id}`)}
          />
        ))}
      </div>
      
      <button type="button" className="new-profile-btn" onClick={() => navigate("/add-user")}>+</button>

      <button className = "flat-btn">Hantera Profiler</button>
    
    </div>
  </div>
 
)}

export default LoginPage