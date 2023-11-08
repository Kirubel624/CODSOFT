import React from 'react'

const Button = ({text, style, disabled, onClick, props}) => {
  return (
    <button className={style} onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  )
}

export default Button
