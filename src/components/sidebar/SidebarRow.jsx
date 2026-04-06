// import {row} from '../../fetch/RowModel';
// import { useState } from 'react';
import { Row } from './Row';

export function SidebarRow({list, id, icon, name}) {

  const childrenObjects = list.filter((l) => l.parent === id);

  return (
    <>
    <Row id={id} icon={icon} name={name} children={childrenObjects} />

    {childrenObjects.length !== 0 ? childrenObjects.map((child) => (
      <Row key={child.id} id={child.id} icon={child.icon} name={child.title} indent={1} />
    )) : null}
    </>
  );
}