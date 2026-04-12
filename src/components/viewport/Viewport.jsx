import { SelectionContext, TodoListsContext, TodosContext } from "../../contexts/Contexts";
import { useContext, useEffect, useState } from "react";
import { Priorities } from "../../fetch/models/TodoModel";
import { TodoRow } from "./TodoRow";
import { EmojiChooser } from "../small_components/EmojiPickerView";


export function Viewport() {
  const {selected} = useContext(SelectionContext);
  const {todos} = useContext(TodosContext) ?? [];
  const {todoLists, setTodoLists} = useContext(TodoListsContext) ?? [];

  const correspondingTodos = todos.filter((todo) => {
    return todo.parent.id == selected;
  });

  const selectedList = todoLists.filter((list) => {
    return list.id == selected;
  }).at(0);
  
  const [boxFocused, setBoxFocused] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    function handleRandomClick(event) {
      const target = event.target.closest("[data-todo-id]");
      const emojiTarget = event.target.closest("[emojiid]");
      if (!showEmojiPicker) {
        if (boxFocused !== -1 && target) {
          return;
        } else if (boxFocused !== -1 && target == undefined) {
          setBoxFocused(-1);
        } else {
          return;
        }
      } else {
        if (showEmojiPicker !== false && emojiTarget == undefined) {
          setShowEmojiPicker(false);
        } else {
          return;
        }
      }
    }

    document.addEventListener("pointerdown", handleRandomClick);

    return () => {
      document.removeEventListener("pointerdown", handleRandomClick);
    }
  }, [boxFocused, showEmojiPicker])

  const updateTitle = (title) => {
    setTodoLists((prevLists) =>
      prevLists.map((t) =>
        t.id === selectedList.id ? {...t, title: title} : t
      )
    );
  };

  return (
    <>
    <div className="lg:w-200">
      {(() => {
        if (selectedList !== undefined && correspondingTodos != [null]) {
          return (
            <>
              <div className="fixed w-full z-10 flex pt-28 items-center pb-6 bg-[#E5E5E5]">
                <div className="relative">
                  <h1 emojiid="-1" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="select-none inter-font font-extralight tracking-wide text-2xl mr-2 cursor-pointer">{selectedList.icon}</h1>
                  <EmojiChooser emojiPickerState={{showEmojiPicker,setShowEmojiPicker}} />
                </div>
                <input value={selectedList.title} onChange={(e) => updateTitle(e.target.value)} className="focus:outline-none p-2 focus:bg-gray-100 rounded-lg focus:ring-0 inter-font font-extralight tracking-wide text-4xl"></input>
              </div>
              <div className="relative top-55 z-0 pb-10">
                {correspondingTodos.map((todo) => (
                  <TodoRow key={todo.id} todo={todo} box={{boxFocused, setBoxFocused}} />
                ))}
              </div>
            </>
          );
        }
      })()}
    </div>
    </>
  )
}



