import sidebarIcon from './../../assets/icons/sidebarIcon.png';
import { TodoListModel } from '../../fetch/TodoListModel';
import { SidebarRow } from './SidebarRow';
import { useState } from 'react';

export function Sidebar() {

  const lists = [
    new TodoListModel(1, '🤨', 'list1', null),
    new TodoListModel(2, '😅', 'list2', 1),
    new TodoListModel(3, '🐼', 'list3', null),
  ];

  const [selected, setSelected] = useState(1);

  const parentObjectList = lists
    .filter((l) => {
      return l.parent === null
    })

  return (
    <>
    <div className="ml-5 mt-5">
      <div className="w-50 h-[calc(100vh-98px)] bg-white rounded-3xl border border-[#B0B0B0]">
        <div className='flex mt-2 items-center justify-between'>
          <h1 className="ml-4 inter-font font-extralight tracking-tight text-3xl">lists</h1>
          <img src={sidebarIcon} alt="sidebar icon" className='w-4 h-4 mr-4'></img>
        </div>
        <div className='mt-5'>
          {/* List rows would go here */}
          {parentObjectList.map((list) => (
            <SidebarRow key={list.id} id={list.id} list={lists} icon={list.icon} name={list.title} selected={selected} setSelected={setSelected} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}