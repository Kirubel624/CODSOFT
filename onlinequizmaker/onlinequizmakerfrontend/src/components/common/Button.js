import React from "react";

const Button = ({ style, text, onClick, type, props,disabled }) => {
  return (
    <button className={style} type={type} onClick={onClick} disabled={disabled}  {...props}>
      {text}
    </button>
  );
};

export default Button;
