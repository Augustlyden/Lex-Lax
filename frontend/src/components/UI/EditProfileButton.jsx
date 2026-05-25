import { FaPen } from "react-icons/fa";

function EditProfileButton({ onClick }) {
    return (
        <button className="flat-btn" onClick={onClick}>
            <FaPen />
        </button>
    );
}

export default EditProfileButton;
