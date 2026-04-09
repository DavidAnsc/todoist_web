import { Priorities } from "../../fetch/TodoModel";
import { useContext, useState } from "react";
import { TodosContext } from "../../contexts/Contexts";
// import { useOverflowDetector } from 'react-detectable-overflow';

export function TodoRow({todo, box}) {
  const { setTodos } = useContext(TodosContext) ?? {};

  const {boxFocused, setBoxFocused} = box;
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

  const handleFocusClick = (value) => {
    setPrevIsEditing(isEditing);
    setBoxFocused(value ? todo.id : -1);
  };

  
  
  const isEditing = boxFocused === todo.id;

  return (
    <>
    <div style={{
        width: isEditing ? "469px" : "100%", 
        paddingTop: isEditing ? "10px" : "0px", 
        paddingLeft: isEditing ? "14px" : "0px", 
        height: isEditing ? "150px" : "", 
        backgroundColor: isEditing ? "white" : "", 
        borderRadius: isEditing ? "20px" : "0px",
        boxShadow: isEditing ? "0px 4px 20px -8px gray" : "",
        transition: "padding 200ms ease",
      }} 
      className={"flex items-start mb-5 w-full"}
      data-todo-id={todo.id}
    >
      <div className="grid place-items-center">
        <div style={{marginTop: "4px"}} className={"row-start-1 col-start-1 w-5 h-5" + (todo.status === false ? " bg-white " : " bg-blue-600 ") + "border border-gray-400 rounded-md"}></div>
        <svg style={{display: todo.status === false ? "none" : ""}} className="row-start-1 col-start-1 w-4 h-4 pt-1 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div onClick={() => {isEditing ? null : handleFocusClick(true)}} className="ml-3 flex-1 min-w-0">
        <div className="flex items-start w-full">
          <h1
            style={{
              color: todo.priority === Priorities.HIGH ? "rgb(233, 69, 76)" : todo.priority === Priorities.MED ? "rgb(92, 127, 222)" : "gray",
              display: isEditing ? "none" : "",
              transition: "display 200ms ease",
            }}
            className="mr-1.5"   
          >
            {todo.priority === Priorities.HIGH ? "!!!" : todo.priority === Priorities.MED ? "!!" : "!"}
          </h1>
          <div className="grid place-items-start flex-1 min-w-0 pr-2">
            <textarea
              ref={(item) => {
                if (isEditing != prevIsEditing) {
                  item?.focus();
                }
              }}
              value={todo.title}
              placeholder="Add a title..."
              onChange={(e) => {updateTitle(e.target.value);handleFocusClick(true)}}
              rows="1"
              style={{display: isEditing ? "" : "none"}}
              className="w-full col-start-1 row-start-1 inter-font resize-none focus:outline-none focus:ring-0"
            />
            <div 
              style={{display: isEditing ? "none" : ""}}
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
            onChange={(e) => {updateDescription(e.target.value);handleFocusClick(true);}}
            style={{display: isEditing ? "" : "none"}}
            className={`w-full col-start-1 row-st art-1 inter-font resize-none focus:outline-none focus:h-25 focus:pr-2 focus:ring-0 font-light text-sm text-gray-700`}
          >
          </textarea>
          <div style={{display: isEditing ? "none" : ""}} className="line-clamp-2 col-start-1 row-start-1 inter-font font-light text-sm text-gray-700">{todo.description}</div>
        </div>
      </div>
    </div>
    </>
  );
}
