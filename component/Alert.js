import React from "react";

const Alert = ({ text, setAlertMessage, style }) => {
  const handleAlert = (e) => {
    e.preventDefault();
    setAlertMessage("");
  };

  return (
    <>
      <div
        className="alert w-50 align-self-center alert-success alert-dismissible fade show"
        role="alert"
        style={{ display: style }}
      >
        {text}
        <button type="button" className="close" onClick={(e) => handleAlert(e)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </>
  );
};

export default Alert;
