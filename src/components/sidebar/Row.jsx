import downArrow from "./../../assets/icons/downArrow.png";
import editIcon from "./../../assets/icons/editPencil.png";
import { SelectionContext } from "../../contexts/Contexts";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoListsContext } from "../../contexts/Contexts";

export function Row({id, icon, name, children, indent, childState}) {
  const {showChild, setShowChild} = childState;
  const {selected, setSelected} = useContext(SelectionContext)
  const {setTodoLists} = useContext(TodoListsContext) ?? [];

  const [onHover, setOnHover] = useState(false);
  const [onEdit, setOnEdit] = useState(null);

  const inputRef = useRef({});

  const setTodoListTitle = (title) => {
    setTodoLists((prevLists) => 
      prevLists.map((t) =>
        t.id == selected ? {...t, title: title} : t
      )
    )
  };

  useEffect(() => {
    if (onEdit === true) {
      inputRef.current?.focus();
    }
  }, [onEdit]);

  return (
    <>
    <div style={{display: showChild || children !== undefined ? "" : "none"}} onPointerEnter={() => setOnHover(true)} onPointerLeave={() => setOnHover(false)}>
      <div 
        style={{
          marginLeft: `${indent*26 || 8}px`,
          backgroundColor: selected === id ? "#B2C5FF" : "#F6F6F6"
        }} 
        className="flex justify-between items-center rounded-xl py-1.5 my-2 mx-2 cursor-default"
      >
        <div onClick={() => setSelected(id)} className="flex gap-2.5 items-center w-full">
          <h1 className="ml-2 text-xs">{icon}</h1>
          <div className="grid place-items-start">
            <h1 style={{display: onEdit ? "none" : ""}} className="col-start-1 row-start-1 text-sm font-extralight p-0.5">{name}</h1>
            <input onBlur={() => setOnEdit(false)} ref={inputRef} style={{display: onEdit ? "" : "none"}} value={name} onChange={(e) => setTodoListTitle(e.target.value)} className="col-start-1 row-start-1 text-sm font-extralight w-2/3 focus:outline-none p-0.5 focus:bg-gray-100 rounded-sm focus:ring-0"></input>
          </div>
        </div>

        <div className="flex items-center select-none">
          <img src={editIcon} style={{visibility: onHover ? "" : "hidden"}} onClick={() => setOnEdit(true)} className="w-3 aspect-square relative right-2 cursor-pointer"></img>
          { children == undefined || children.length < 1 ? 
            null : 
            <img 
              src={downArrow} 
              alt="down arrow" 
              onClick={() => setShowChild(!showChild)} 
              style={{rotate: showChild ? "" : "90deg", transition: "rotate 200ms ease"}}
              className="w-2.5 mr-3"
            /> 
          }
        </div>
      </div>
    </div>
    </>
  );
}