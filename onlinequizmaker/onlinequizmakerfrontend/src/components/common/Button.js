import React from "react";

const Button = ({ style, text, onClick, type, props }) => {
  return (
    <button className={style} type={type} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;
