import { Link } from "react-router-dom";
import "../styles/MathPage.css"

function MathPage() {

    return (
        <div className = "math-page-container">
         <div className="">
           <Link to={"/Dashboard"} className="flat-btn">Tillbaka </Link>
          </div>

          <div className = "math-header-content">
            <h1>Under Konstruktion</h1>
          </div>
        </div>
    )
}
export default MathPage