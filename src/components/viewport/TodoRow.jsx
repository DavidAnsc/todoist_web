import { Priorities } from "../../fetch/TodoModel";
import { useContext, useState, useRef, useEffect } from "react";
import { TodosContext } from "../../contexts/Contexts";
import downArrow from "../../assets/icons/downArrow.png"
// import { useOverflowDetector } from 'react-detectable-overflow';

export function TodoRow({ todo, box }) {
  const { setTodos } = useContext(TodosContext) ?? {};

  const { boxFocused, setBoxFocused } = box;
  const [prevIsEditing, setPrevIsEditing] = useState(null);

  const updateTitle = (nextTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, title: nextTitle } : t
      )
    );
  };
  const updateDescription = (description) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, description: description } : t
      )
    );
  };
  const updatePriority = (priority) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, priority: priority } : t
      )
    );
  };

  const handleFocusClick = (value) => {
    setPrevIsEditing(isEditing);
    setBoxFocused(value ? todo.id : -1);
    setShowDropdown(false);
  };

  const priorityColour = todo.priority === Priorities.HIGH ? "rgb(233, 69, 76)" : todo.priority === Priorities.MED ? "rgb(92, 127, 222)" : "gray";

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isEditing = boxFocused === todo.id;


  useEffect(() => {
    if (boxFocused != todo.id) {
      setShowDropdown(false);
    }
  }, [boxFocused, todo.id]);
  

  return (
    <>
      <div style={{
        marginBottom: showDropdown ? "90px" : "20px",

        width: isEditing ? "469px" : "100%",
        paddingTop: isEditing ? "10px" : "0px",
        paddingLeft: isEditing ? "14px" : "0px",
        height: isEditing ? "150px" : "",
        backgroundColor: isEditing ? "white" : "",
        borderRadius: isEditing ? "20px" : "0px",
        boxShadow: isEditing ? "0px 4px 20px -8px gray" : "",
        transition: isEditing ? "padding 200ms ease, margin 200ms ease, background-color 200ms ease-in-out" : "padding 200ms ease, margin 200ms ease",
      }}
        className={"flex flex-col justify-between"}
        data-todo-id={todo.id}
      >

        <div className="flex items-start w-full">
          <div className="grid place-items-center">
            <div style={{ marginTop: "4px" }} className={"row-start-1 col-start-1 w-5 h-5" + (todo.status === false ? " bg-white " : " bg-blue-600 ") + "border border-gray-400 rounded-md"}></div>
            <svg style={{ display: todo.status === false ? "none" : "" }} className="row-start-1 col-start-1 w-4 h-4 pt-1 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div onClick={() => { isEditing ? null : handleFocusClick(true) }} className="ml-3 flex-1 min-w-0">
            <div className="flex items-start w-full">
              <h1
                style={{
                  color: priorityColour,
                  display: isEditing ? "none" : "",
                  transition: "display 200ms ease",
                }}
                className="mr-1.5"
              >
                {todo.priority === Priorities.HIGH ? "!!!" : todo.priority === Priorities.MED ? "!!" : "!"}
              </h1>
              <div className="grid place-items-start flex-1 min-w-0 pr-2">
                <input
                  ref={(item) => {
                    if (isEditing != prevIsEditing) {
                      item?.focus();
                    }
                  }}
                  value={todo.title}
                  placeholder="Add a title..."
                  onFocus={() => handleFocusClick(true)}
                  onChange={(e) => { updateTitle(e.target.value); handleFocusClick(true) }}
                  rows="1"
                  style={{ display: isEditing ? "" : "none" }}
                  className="w-full col-start-1 row-start-1 inter-font focus:outline-none focus:ring-0"
                />
                <div
                  style={{ display: isEditing ? "none" : "" }}
                  className="col-start-1 row-start-1 inter-font line-clamp-1"
                  title-click="2"
                  onClick={() => {
                    handleFocusClick(true);
                  }}
                >
                  {todo.title}
                </div>
              </div>
            </div>
            <div className="grid place-items-start w-full">
              <textarea
                value={todo.description}
                placeholder="Add a description..."
                onFocus={() => handleFocusClick(true)}
                onChange={(e) => { updateDescription(e.target.value); handleFocusClick(true); }}
                style={{ display: isEditing ? "" : "none" }}
                className={`w-full col-start-1 row-st art-1 h-15 inter-font resize-none focus:outline-none focus:pr-2 focus:ring-0 font-light text-sm text-gray-700`}
              >
              </textarea>
              <div style={{ display: isEditing ? "none" : "" }} className="line-clamp-2 col-start-1 row-start-1 inter-font font-light text-sm text-gray-700">{todo.description}</div>
            </div>
          </div>
        </div>

        <div className="relative select-none" style={{display: isEditing ? "" : "none", marginBottom: "14px"}}>
          <div style={{
            backgroundColor: priorityColour,
          }}
            className={"w-20 h-8 rounded-md grid place-items-center"}
          >
            <div onClick={() => setShowDropdown(!showDropdown)} className="flex justify-between px-2.5 w-full items-center row-start-1 col-start-1 cursor-pointer text-gray-900">
              <img src={downArrow} style={{rotate: showDropdown ? "180deg" : "0deg", transition: "rotate 200ms ease"}} className="w-3.5 h-2"></img>
              <h1 className="inter-font text-xs">{todo.priority}</h1>
            </div>
          </div>

          <div
            ref={dropdownRef}
            style={{display: showDropdown ? "" : "none"}}
            className="absolute rounded-md p-3 bg-gray-100 max-w-20 text-xs text-gray-700"
          >
            <div onClick={() => {
                updatePriority(Priorities.HIGH);
              }}
              className="cursor-pointer flex pb-2.5">
              <svg style={{ visibility: todo.priority === Priorities.HIGH ? "" : "hidden" }} className=" row-start-1 col-start-1 w-3.5 h-3.5 pt-1 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div value={Priorities.HIGH} className="pl-1">HIGH</div>
            </div>
            <div onClick={() => {
                updatePriority(Priorities.MED);
              }}
              className="cursor-pointer flex pb-2.5">
             <svg style={{ visibility: todo.priority === Priorities.MED ? "" : "hidden" }} className=" row-start-1 col-start-1 w-3.5 h-3.5 pt-1 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
              <div value={Priorities.MED} className="pl-1">MED</div>
            </div>
            <div onClick={() => {
                updatePriority(Priorities.LOW);
              }}
              className="cursor-pointer flex">
             <svg style={{ visibility: todo.priority === Priorities.LOW ? "" : "hidden" }} className=" row-start-1 col-start-1 w-3.5 h-3.5 pt-1 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
              <div value={Priorities.LOW} className="pl-1">LOW</div>
            </div>
          </div>

        </div>


      </div>
    </>
  );
}
