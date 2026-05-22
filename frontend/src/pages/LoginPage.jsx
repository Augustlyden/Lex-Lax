import "../styles/loginPage.css"
import UserCard from "../components/UserCard"
import {useState} from "react"

function LoginPage() {

 return (

    <div className = "login-text-content">

      <h1>Vem ska plugga idag?</h1>
      <p>Välj din profil för att komma igång!</p>
                
      <div className="login-user-content">
                {users.map((user) => (
                    <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => navigate(`/dashboard/${user.id}`)}
                    />
                ))}
      </div>
    </div> 
  )}



export default LoginPage;