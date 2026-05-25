import "../styles/dashboardPage.css"
import { MdCalculate } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import languageIcon from "../assets/subjects/language-icon.webp";
import mathIcon from "../assets/subjects/math-icon.webp";
import swedishIcon from "../assets/subjects/swedish-icon.webp";
import stars from "../assets/ui/stars.webp";
function DashboardPage() {
 
    return (
        <div className="dashboard-page-container">
            <div className ="dashboard-content-wrapper">
            
            <div className = "info-box-wrapper">

                <div className = "image-content-left">
                  <img src={stars} className = "subject-icon" alt="Math icon" />
                </div>

                <div className = "info-content-right">
                <h2>Välkommen till din Dashboard!</h2>
                <p>Här kan du se din studiehistorik, kommande uppgifter och anpassa dina inställningar.</p>
                <div className="progress-bar">
               <div className="progress-fill"></div>
               </div>
            </div>
           </div>
                <div className = "subject-container">
                    
                        
                   <div className = "subject-card border-math">
                    <div className="subject-icon-wrapper maths">
                      <img src={mathIcon} className = "subject-icon" alt="Math icon" />
                         </div>
                        <h2>MATEMATIK</h2>
                        <p>Du har 5 uppgifter kvar att slutföra.</p>
                    </div>
                       <div className = "subject-card border-glosor">
                    <div className="subject-icon-wrapper glosor">
                        <img src={languageIcon} className = "subject-icon" alt="Language icon" />
                         </div>
                        <h2>GLOSOR</h2>
                        <p>Du har 5 uppgifter kvar att slutföra.</p>
                    </div>
                       <div className = "subject-card border-watch">
                    <div className="subject-icon-wrapper watch">
                        <IoTime className="subject-icon" />
                         </div>
                        <h2>KLOCKAN</h2>
                        <p>Du har 5 uppgifter kvar att slutföra.</p>
                    </div>
                       <div className = "subject-card border-swedish">
                    <div className="subject-icon-wrapper swedish">
                          <img src={swedishIcon} className = "subject-icon" alt="Language icon" />
                         </div>
                        <h2>SVENSKA</h2>
                        <p>Du har 5 uppgifter kvar att slutföra.</p>
                    </div>
                </div>
                         </div>
                               </div>

           
                
    )

}
export default DashboardPage;