import { MdCalculate } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import languageIcon from "../assets/subjects/language-icon.webp";
import mathIcon from "../assets/subjects/math-icon.webp";
import swedishIcon from "../assets/subjects/swedish-icon.webp";




function Subjects({subject}) {

      let borderName = "";
      let iconName = "";
     if (subject.subject_name === "Matematik") {
        borderName = "border-math";
        iconName = mathIcon;
        } else if (subject.subject_name === "Språk") {
         borderName = "border-vocabulary";
          iconName = languageIcon;
        } else if (subject.subject_name === "Svenska") {
         borderName = "border-swedish";
         iconName = swedishIcon;
        }
    
    return (
  
             <div className={`subject-card ${borderName}`}>
            <div className="subject-icon-wrapper maths">
            <img src={iconName} className = "subject-icon" alt="Math icon" />
            </div>
        <h2>{subject.subject_name}</h2>
        <p>Du har 5 uppgifter kvar att slutföra.</p>
     </div>

    )
}
export default Subjects