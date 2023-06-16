import React from 'react'
import './styles.css'

function Button({text, onClick, outlined}) {
  // console.log(onClick,typeof onClick)
  return (
    <div className={outlined?'outlined-btn':'btn'} 
      onClick={()=>{
        if(onClick !== undefined){
          onClick()
        }
        else{
          return;
        }
      }}
    >
        {text}
    </div>
  )
}

export default Button