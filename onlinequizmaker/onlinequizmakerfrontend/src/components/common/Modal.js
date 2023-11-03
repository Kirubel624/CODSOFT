const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-0" onClick={onClose}></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto opacity-0 transform translate-y-4 transition-all duration-300 ease-out">
          <div className="modal-close absolute top-0 right-0 cursor-pointer z-50" onClick={onClose}>
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M0 0l18 18m-18 0L0 18"/>
            </svg>
          </div>
          <div className="modal-content py-4 text-left px-6">{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal