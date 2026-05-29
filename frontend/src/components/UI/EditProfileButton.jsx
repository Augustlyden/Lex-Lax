import { FaPen } from "react-icons/fa";

function EditProfileButton({ onClick }) {
  return (
    <button
      type="button"
      className="flat-btn edit-profile-btn"
      onClick={onClick}
    >
      <FaPen />
    </button>
  );
}

export default EditProfileButton;