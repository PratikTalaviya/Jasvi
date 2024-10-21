import React, { useEffect, useState } from "react";


const ButtonGroup = ({ sizebtn, doSomethingAfterClick }) => {
  const [clickedId, setClickedId] = useState(-1);

  const handleClick = (event, id) => {
    setClickedId(id);
    doSomethingAfterClick(event);
  };
  return (
    <>
      {
        sizebtn && sizebtn.map((data, i) => {
          return (
            <button
              key={i}
              name={data}
              onClick={(event) => handleClick(event, i)}
              className={i === clickedId ? "size-name me-2 size-active" : "size-name me-2"} >
              {data}
            </button>
          )
        })
      }

    </>
  );
};
export default ButtonGroup
