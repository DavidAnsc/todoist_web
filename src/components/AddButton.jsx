import { TodosContext } from "../contexts/Contexts";
import { Priorities, TodoModel } from "../fetch/models/TodoModel";
import { useContext } from "react";
import { postNewTodo } from "../fetch/fetchers/APIDataFetcher";
import { ErrorBadgeContext, UserContext, TokenContext } from "../contexts/Contexts";

export function AddButton({ parent, boxState }) {
  const { setTodos } = useContext(TodosContext) ?? {};
  const { setBoxFocused } = boxState;
  const {setError} = useContext(ErrorBadgeContext);
  const { user } = useContext(UserContext);
  const {jwtToken} = useContext(TokenContext);

  async function handleAddTodo() {
    const newTodo = new TodoModel(-Date.now(), "", "", Priorities.LOW, false, parent);
    setTodos((old = []) => [...old, newTodo]);

    const output = await postNewTodo("app/addTodo", newTodo, jwtToken, setError);

    if (output === null) {
      setTodos((old = []) => old.filter((i) => i.id !== newTodo.id));
      return;
    }

    const savedTodo = new TodoModel(output.id, "", "", Priorities.LOW, false, parent);
    setTodos((old = []) => old.map((i) => i.id !== newTodo.id ? i : savedTodo));
    setBoxFocused(savedTodo.id);
  }


  if (user === null) {
    return null;
  }

  return (
    <>
    <div className="bg-[#91cbff] w-13 h-13 rounded-2xl grid place-items-center">
      <svg
        aria-label="add list"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className='w-8 h-8 rounded-sm cursor-pointer col-start-1 row-start-1 text-gray-700'
        onClick={handleAddTodo}
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    </div>
    </>
  );
}
