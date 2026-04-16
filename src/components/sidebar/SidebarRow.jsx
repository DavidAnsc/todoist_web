// import {row} from '../../fetch/RowModel';
// import { useState } from 'react';
import { useState } from 'react';
import { Row } from './Row';

export function SidebarRow({list, id, icon, name}) {
  // console.log(list)
  const childrenObjects = list.filter((l) => l.parent === id);
  const [showChild, setShowChild] = useState(true);

  return (
    <>
    <Row id={id} icon={icon} name={name} children={childrenObjects} childState={{showChild, setShowChild}} />

    {childrenObjects.length !== 0 ? childrenObjects.map((child) => (
      <Row key={child.id} 
        id={child.id} 
        icon={child.icon} 
        name={child.title}
        indent={1} 
        childState={{showChild, setShowChild}} 
      />
    )) : null}
    </>
  );
}