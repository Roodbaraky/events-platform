

function ErrorPopup({ errorMessage, onClose }) {
  return (
    <dialog id="error-popup" className="modal" open>
      <div className="modal-box p-4">
        <h2 className="text-lg font-bold text-red-500">Error</h2>
        <p className="text-gray-700 my-2">{errorMessage}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ErrorPopup;
