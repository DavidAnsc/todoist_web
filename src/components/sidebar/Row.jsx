import downArrow from './../../assets/icons/downArrow.png';

export function Row({id, icon, name, children, indent, selected, setSelected}) {

  return (
    <>
    <div 
      onClick={() => setSelected(id)} 
      style={{
        marginLeft: `${indent*26 || 8}px`,
        backgroundColor: selected === id ? "#B2C5FF" : "#F6F6F6"
      }} 
      className='flex justify-between items-center rounded-xl py-1.5 my-2 mx-2 cursor-pointer'>
      <div className='flex gap-2.5 items-center'>
        <h1 className='ml-2 text-xs'>{icon}</h1>
        <h1 className='text-sm font-extralight'>{name}</h1>
      </div>

      { children == undefined || children.length < 1 ? null : <img src={downArrow} alt="down arrow" className='w-2.5 mr-2' /> }
    </div>
    </>
  );
}