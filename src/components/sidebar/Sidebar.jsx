import { SidebarRow } from './SidebarRow';
import { useContext, useEffect, useState } from 'react';
import { TodoListsContext } from '../../contexts/Contexts';
import { TodoListModel } from '../../fetch/models/TodoListModel';
import { SelectionContext } from '../../contexts/Contexts';
import { ErrorBadgeContext } from '../../contexts/Contexts';
import { postNewTodoList } from '../../fetch/fetchers/APIDataFetcher';
import { TokenContext } from '../../contexts/Contexts';
import { UserContext } from '../../contexts/Contexts';

export function Sidebar() {
  const {todoLists, setTodoLists} = useContext(TodoListsContext) ?? [];
  const {setSelected} = useContext(SelectionContext);
  const {setError} = useContext(ErrorBadgeContext);
  const { user } = useContext(UserContext);
  const {jwtToken} = useContext(TokenContext);

  const [parentObjectList, setParentObjectList] = useState(todoLists
    .filter((l) => {
      return l.parent === null
  }));

  useEffect(() => {
    if (!Array.isArray(todoLists)) {
      return;
    }
    function update() {
      setParentObjectList(todoLists
        .filter((l) => {
          return l.parent === null;
        }));
    }
    update();
  }, [todoLists]);

  async function handleAddTodolist() {
    const tempId = -Date.now();
    const newTodoList = new TodoListModel(tempId, "📱", "New Todo List", null);

    setTodoLists((old = []) => [...old, newTodoList]);
    setSelected(tempId);

    const output = await postNewTodoList("/app/addTodo", newTodoList, jwtToken, setError);

    if (output === null) {
      setTodoLists((old = []) => old.filter((list) => list.id !== tempId));
      return;
    }

    const savedTodoList = new TodoListModel(output.id, newTodoList.icon, newTodoList.title, null);
    setTodoLists((old = []) => old.map((list) => list.id === tempId ? savedTodoList : list));
    setSelected(output.id);
  }

  if (user === null) {
    return null;
  }
  return (
    <>
    <div className="ml-5 mt-5 fixed left-0 top-14.5">
      <div className="w-50 h-[calc(100vh-98px)] bg-white rounded-3xl border border-[#B0B0B0]">
        <div className='flex mt-2 items-center justify-between'>
          <h1 className="ml-4 inter-font font-extralight tracking-tight text-3xl">lists</h1>
          <svg
            aria-label="add list"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className='w-4 h-4 mr-4 rounded-sm cursor-pointer'
            onClick={() => handleAddTodolist()}
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
        <div className='mt-5'>
          {/* List rows would go here */}
          {parentObjectList.map((list) => (
            <SidebarRow key={list.id} id={list.id} list={todoLists} icon={list.icon} name={list.title} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
