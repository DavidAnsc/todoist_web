import sidebarIcon from './../../assets/icons/sidebarIcon.png';
import { SidebarRow } from './SidebarRow';
import { useContext, useEffect } from 'react';
import { TodoListsContext } from '../../contexts/Contexts';

export function Sidebar() {
  const {todoLists} = useContext(TodoListsContext) ?? [];

  const parentObjectList = todoLists
    .filter((l) => {
      return l.parent === null
    })

  useEffect(() => {
    
  }, []);

  return (
    <>
    <div className="ml-5 mt-5 fixed left-0 top-14.5">
      <div className="w-50 h-[calc(100vh-98px)] bg-white rounded-3xl border border-[#B0B0B0]">
        <div className='flex mt-2 items-center justify-between'>
          <h1 className="ml-4 inter-font font-extralight tracking-tight text-3xl">lists</h1>
          <img src={sidebarIcon} alt="sidebar icon" className='w-4 h-4 mr-4'></img>
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
