import languageIcon from "../assets/subjects/language-icon.webp";
import mathIcon from "../assets/subjects/math-icon.webp";
import swedishIcon from "../assets/subjects/swedish-icon.webp";
import {Link} from "react-router-dom";

function Subjects({subject}) {
     

  // IF/ELSE SATS FÖR ATT SÄTTA OLIKA TEMAN & BILDER BEROENDE PÅ SUBJEKT.
  let borderName = "";
  let iconName = "";
  let path = "";
  
  if (subject.subject_name === "Matematik") {
    borderName = "border-math";
    iconName = mathIcon;
    path = `/matematik/${subject.id}`
  
  } else if (subject.subject_name === "Språk") {
    borderName = "border-vocabulary";
    path = `/sprak/${subject.id}`;
      iconName = languageIcon;
    
  } else if (subject.subject_name === "Svenska") {
    borderName = "border-swedish";
    iconName = swedishIcon;
  }

return (
        
        <Link to={path} className="subject-link">
          <div className={`subject-card ${borderName}`}>
          <div className="subject-icon-wrapper">
        <img src={iconName} className = "subject-icon" alt="ÄMNE" />
        </div>
    <h2>{subject.subject_name}</h2>

     {/*Hårdkodad info. Ändra senare.*/}
    <p>Du har 5 uppgifter kvar att slutföra.</p>

  </div>
</Link>

    

    )
}
export default Subjects