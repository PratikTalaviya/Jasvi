import React, { useEffect, useState } from 'react'

const ColorButton = ({ colors, doSomethingAfterClick }) => {
  const [clickedId, setClickedId] = useState(-1);
  
  const handleClick = (event, id) => {
    setClickedId(id);
    doSomethingAfterClick(event);
  };
  return (
    <>
      {
        colors && colors.map((data, i) => {
          return (
            <button
              key={i}
              name={data.color}
              onClick={(event) => handleClick(event, i)}
              className={i === clickedId ? "me-2  color-name color-active" : "color-name me-2"} 
              style={{ backgroundColor: data.color }} height="100px" width="100px">
            </button>
          
          )
        })
      }

    </>
  )
}

export default ColorButton
