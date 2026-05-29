import languageIcon from "../assets/subjects/language-icon.webp";
import mathIcon from "../assets/subjects/math-icon.webp";
import swedishIcon from "../assets/subjects/swedish-icon.webp";
import {Link} from "react-router-dom";

function Subjects({subject}) {
     

  // IF/ELSE FOR SETTING DIFFERENT THEMES/TEXTS DEPENDNG ON SUBJECT.ID
  let borderName = "";
  let iconName = "";
  let path = "";
  let description = "";
  
  if (subject.subject_name === "Matematik") {
    borderName = "border-math";
    iconName = mathIcon;
    path = `/matematik/${subject.id}`
    description = "Träna multiplikationstabellen och huvudräkning.";
  
  } else if (subject.subject_name === "Språk") {
    borderName = "border-vocabulary";
    path = `/sprak/${subject.id}`;
    iconName = languageIcon;
    description = "Öva glosor och bygg upp ditt ordförråd.";
    
  } else if (subject.subject_name === "Svenska") {
    borderName = "border-swedish";
    iconName = swedishIcon;
    description = "";
  }

return (
          
  <Link to={path} className="subject-link">
    <div className={`subject-card ${borderName}`}>
      <div className="subject-icon-wrapper">
        <img src={iconName} className = "subject-icon" alt="ÄMNE" />
      </div>
      <h2>{subject.subject_name}</h2>
      <p>{description}</p>
    </div>
  </Link>

    

    )
}
export default Subjects