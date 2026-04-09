import { useState } from "react";
import { SelectionContext, TodosContext, TodoListsContext } from "./Contexts";
import { TodoModel, Priorities } from "../fetch/TodoModel";
import { TodoListModel } from "../fetch/TodoListModel";

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState(0);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function TodosProvider({children}) {
  const [todos, setTodos] = useState([
    new TodoModel(1, "read book", "Read a book as cool as American Prometheus", Priorities.LOW, false, {id: 1, icon: "🤨", title: "list1", parent: null}),
    new TodoModel(2, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(3, "build a React web app", "", Priorities.MED, false, {id: 2, icon: "😅", title: "list2", parent: 1})
  ]);

  return (
    <TodosContext.Provider value={{todos, setTodos}}>
      {children}
    </TodosContext.Provider>
  );
}

export function TodoListsProvider({children}) {
  const [todoLists, setTodoLists] = useState([
      new TodoListModel(1, '🤨', 'list1', null),
      new TodoListModel(2, '😅', 'list2', 1),
      new TodoListModel(3, '🐼', 'list3', null),
  ]);

  return (
    <TodoListsContext.Provider value={{todoLists, setTodoLists}}>
      {children}
    </TodoListsContext.Provider>
  );
}