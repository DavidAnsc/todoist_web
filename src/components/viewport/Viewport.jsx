import { SelectionContext, TodoListsContext, TodosContext } from "../../contexts/Contexts";
import { useContext, useEffect, useState } from "react";
import { Priorities } from "../../fetch/TodoModel";
import { TodoRow } from "./TodoRow";

import { EmojiPicker } from "frimousse";

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





export function EmojiChooser({emojiPickerState}) {
  const {selected} = useContext(SelectionContext);

  const [searchContent, setSearchContent] = useState("");

  const {showEmojiPicker, setShowEmojiPicker} = emojiPickerState;
  const {todoLists, setTodoLists} = useContext(TodoListsContext) ?? [];
  const selectedList = todoLists.filter((list) => {
    return list.id == selected;
  }).at(0);

  const updateIcon = (emoji) => {
    setTodoLists((prevLists) =>
      prevLists.map((t) =>
        t.id === selectedList.id ? {...t, icon: emoji} : t
      )
    );
    setSearchContent("");
    setShowEmojiPicker(false);
  };

  return (
    <EmojiPicker.Root emojiid="0" onEmojiSelect={(e) => updateIcon(e.emoji)} style={{display: showEmojiPicker ? "" : "none"}} className="absolute isolate flex h-92 w-fit flex-col bg-white dark:bg-neutral-900 rounded-xl">
      <EmojiPicker.Search value={searchContent} onChange={(e) => setSearchContent(e.target.value)} className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800" />
      <EmojiPicker.Viewport className="relative flex-1 outline-hidden">
        <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
          No emoji found.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className="select-none pb-1.5"
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className="bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs dark:bg-neutral-900 dark:text-neutral-400"
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div className="scroll-my-1.5 px-1.5" {...props}>
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className="flex size-8 items-center justify-center rounded-md text-lg data-active:bg-neutral-100 dark:data-active:bg-neutral-800"
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}