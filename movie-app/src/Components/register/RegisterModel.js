import Register from "../../pages/Registeration";
import "../../styles/register/registerModal.css";

function RegisterModal({ show, onClose }) {
  // if show is false, do not render anything
  if (!show) return null;

  return (
    <div
      className="register-modal-overlay"
      onClick={onClose}
    >
      <div
        className="register-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button for the modal */}
        <button
          className="register-close-btn"
          onClick={onClose}
          aria-label="Close register modal"
        >
          ×
        </button>

        {/* pass setShowRegister so the form can close the modal after success */}
        <Register setShowRegister={onClose} />
      </div>
    </div>
  );
}

export default RegisterModal;