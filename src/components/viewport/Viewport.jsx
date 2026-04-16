import { SelectionContext, TodoListsContext, TodosContext } from "../../contexts/Contexts";
import { useContext, useEffect, useRef, useState } from "react";
import { Priorities, TodoModel } from "../../fetch/models/TodoModel";
import { TodoRow } from "./TodoRow";
import trash from "../../assets/icons/bin.png";
import { EmojiChooser } from "../small_components/EmojiPickerView";
import { deleteTodoList, postNewTodo, postUpdateList } from "../../fetch/fetchers/APIDataFetcher";
import { TokenContext } from "../../contexts/Contexts";
import { ErrorBadgeContext } from "../../contexts/Contexts";


export function Viewport() {
  const incrementation = useRef(-2);

  const {selected} = useContext(SelectionContext);
  const { jwtToken, setToken } = useContext(TokenContext);
  const {setError} = useContext(ErrorBadgeContext);
  const {todos, setTodos} = useContext(TodosContext) ?? [];
  const {todoLists, setTodoLists} = useContext(TodoListsContext) ?? [];
  const [boxFocused, setBoxFocused] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const correspondingTodos = todos.filter((todo) => {
    return todo.todoList.id == selected;
  });

  const selectedList = todoLists.filter((list) => {
    return list.id == selected;
  }).at(0);
  

  //* handle random click useEffect
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

  const updateTitle = async (title) => {
    const updatedList = {
      ...selectedList,
      title: title,
    };

    setTodoLists((prevLists = []) =>
      prevLists.map((t) =>
        t.id === selectedList.id ? {...t, title: title} : t
      )
    );

    await postUpdateList("/app/editList", updatedList, jwtToken, setToken, setError)
  };

  async function addNewTodo() {
    const newTodo = new TodoModel(incrementation.current, "new todo", "", Priorities.LOW, false, selectedList);
    incrementation.current -= 1;

    console.log(newTodo);
    setTodos((prevTodos = []) => [...prevTodos, newTodo]);
    setBoxFocused(newTodo.id);

    const output = await postNewTodo("/app/addTodo", newTodo, jwtToken, setToken, setError);

    if (output === null) {
      console.log("sth error");
      setTodos((prev) => prev.filter((i) => i.id !== newTodo.id));
      return;
    }
    setBoxFocused(-1);

    const savedTodo = new TodoModel(output.id, newTodo.title, newTodo.description, newTodo.priority, newTodo.status, newTodo.todoList);
    setTodos((prev = []) => prev.map((i) => i.id === newTodo.id ? savedTodo : i));
    setBoxFocused(savedTodo.id);
  };

  async function removeList(id) {
    const didDelete = await deleteTodoList(`/app/delList?id=${id}`, jwtToken, setToken, setError);
    if (didDelete) {
      setTodoLists((prev = []) => prev.filter((i) => i.id !== id || i.parent !== id));
    }
    window.location.reload();
  }

  return (
    <>
    <div className="lg:w-200">
      {(() => {
        if (selectedList !== undefined && correspondingTodos != [null]) {
          return (
            <>
              <div className="flex justify-between px-4">
                <div className="fixed w-full z-10 flex pt-28 items-center pb-6 bg-[#E5E5E5]">
                  <div className="relative">
                    <h1 emojiid="-1" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="select-none inter-font font-extralight tracking-wide text-2xl mr-2 cursor-pointer">{selectedList.icon}</h1>
                    <EmojiChooser emojiPickerState={{showEmojiPicker,setShowEmojiPicker}} />
                  </div>
                  <input value={selectedList.title} onChange={(e) => updateTitle(e.target.value)} className="focus:outline-none p-2 focus:bg-gray-100 rounded-lg focus:ring-0 inter-font font-extralight tracking-wide text-4xl"></input>
                  <img 
                    src={trash} 
                    className="w-6 h-6 cursor-pointer fixed right-60"
                    onClick={() => removeList(selectedList.id)}
                  />
                </div>

              </div>
              <div className="relative top-55 z-0 pb-10">
                {correspondingTodos.map((todo) => (
                  <TodoRow key={todo.id} todo={todo} box={{boxFocused, setBoxFocused}} />
                ))}
              </div>

              <div className="fixed right-3 bottom-3 w-13 h-13 rounded-xl bg-blue-200 grid place-items-center">
                <svg
                  aria-label="add list"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className='w-8 h-8 rounded-sm cursor-pointer row-start-1 col-start-1'
                  onClick={() => addNewTodo()}
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </div>
            </>
          );
        }
      })()}
    </div>
    </>
  )
}



