import React from "react";

const ChatbotConfirmModel = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <button
        className="px-4 py-2 mx-3 rounded bg-blue-500 font-bold"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <button
        className="px-4 py-2 mx-3 rounded bg-red-500 font-bold"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default ChatbotConfirmModel;
