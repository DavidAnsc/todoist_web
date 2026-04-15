import { EmojiPicker } from "frimousse";
import { useContext, useState } from "react";
import { SelectionContext, TodoListsContext } from "../../contexts/Contexts";
import { postUpdateList } from "../../fetch/fetchers/APIDataFetcher";
import { TokenContext } from "../../contexts/Contexts";
import { ErrorBadgeContext } from "../../contexts/Contexts";

export function EmojiChooser({emojiPickerState}) {
  const {selected} = useContext(SelectionContext);
  const { jwtToken, setToken } = useContext(TokenContext);
  const {setError} = useContext(ErrorBadgeContext);

  const [searchContent, setSearchContent] = useState("");

  const {showEmojiPicker, setShowEmojiPicker} = emojiPickerState;
  const {todoLists, setTodoLists} = useContext(TodoListsContext) ?? [];
  const selectedList = todoLists.filter((list) => {
    return list.id == selected;
  }).at(0);

  const updateIcon = async (emoji) => {

    const updatedList = {
      ...selectedList,
      icon: emoji,
    }

    setTodoLists((prevLists) =>
      prevLists.map((t) =>
        t.id === selectedList.id ? {...t, icon: emoji} : t
      )
    );
    setSearchContent("");
    setShowEmojiPicker(false);

    await postUpdateList("/app/editList", updatedList, jwtToken, setToken, setError)
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