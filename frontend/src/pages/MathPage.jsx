import { Link } from "react-router-dom";
import "../styles/MathPage.css"
import { useAppContext } from "../hooks/useAppContext";

function MathPage() {

   const { currentUser } = useAppContext();

    return (
        <div className = "math-page-container">
         <div className="">
           <Link to={"/Dashboard/" + currentUser?.id} className="flat-btn">Tillbaka </Link>
          </div>

          <div className = "math-header-content">
            <h1>Under Konstruktion</h1>
          </div>
        </div>
    )
}
export default MathPage