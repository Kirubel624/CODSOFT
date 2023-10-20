import React from 'react'

const Button = ({style,text,onClick,type}) => {
  return (
    <button className={style} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
