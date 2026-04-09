import { SelectionContext, TodoListsContext, TodosContext } from "../../contexts/Contexts";
import { useContext, useEffect, useState } from "react";
import { Priorities } from "../../fetch/TodoModel";
import { TodoRow } from "./TodoRow";

export function Viewport() {
  const {selected} = useContext(SelectionContext);
  const {todos} = useContext(TodosContext) ?? [];
  const {todoLists} = useContext(TodoListsContext) ?? [];

  const correspondingTodos = todos.filter((todo) => {
    return todo.parent.id == selected;
  });

  const selectedList = todoLists.filter((list) => {
    return list.id == selected;
  }).at(0);
  
  const [boxFocused, setBoxFocused] = useState(null);

  useEffect(() => {
    function handleRandomClick(event) {
      const target = event.target.closest("[data-todo-id]");
      if (boxFocused !== -1 && target) {
        return;
      } else if (boxFocused !== -1 && target == undefined) {
        setBoxFocused(-1);
      } else {
        return;
      }
    }

    document.addEventListener("pointerdown", handleRandomClick);

    return () => {
      document.removeEventListener("pointerdown", handleRandomClick);
    }
  }, [boxFocused])

  return (
    <>
    <div className="lg:w-200 mt-20">
    {(() => {
      if (selectedList !== undefined && correspondingTodos != [null]) {
        return (
          <>
            <div className="flex items-center mb-10">
              <h1 className="inter-font font-extralight tracking-wide text-2xl mr-3">{selectedList.icon}</h1>
              <h1 className="inter-font font-extralight tracking-wide text-4xl">{selectedList.title}</h1>
            </div>
            {correspondingTodos.map((todo) => (
              <TodoRow key={todo.id} todo={todo} box={{boxFocused, setBoxFocused}} />
            ))}
          </>
        );
      }
    })()}
    </div>
    </>
  )
}
