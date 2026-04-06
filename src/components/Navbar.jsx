export function Navbar() {
  return (
    <>
    <div className="flex justify-between items-center px-6 pt-2">
      <h1 className="sora-font tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">todoist</h1>
      <div className="flex gap-3 items-center lg:text-lg">
        {/* TODO: add user profile picture here */}
        <div className="w-7 h-7 rounded-xl bg-gray-600"></div>
        <h2>david an</h2>
      </div>
    </div>
    <div className="px-3">
    <hr className="mt-2.5"></hr>
    </div>
    </>
  );
}