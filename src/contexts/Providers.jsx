import { useState } from "react";
import { SelectionContext, TodosContext, TodoListsContext, ErrorBadgeContext } from "./Contexts";
import { TodoModel, Priorities } from "../fetch/models/TodoModel";
import { TodoListModel } from "../fetch/models/TodoListModel";
import { ErrorBadge } from "../fetch/models/ErrorBadgeModel";

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState(0);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectionContext.Provider>
  );
}


export function ErrorBadgeProvider({children}) {
  const [err, setError] = useState(null);
  
  return (
    <>
    <ErrorBadgeContext.Provider value={{err, setError}}>
      {children}
    </ErrorBadgeContext.Provider>
    </>
  );
}



export function TodosProvider({children}) {
  const [todos, setTodos] = useState([
    new TodoModel(1, "read book", "Read a book as cool as American Prometheus", Priorities.LOW, false, {id: 1, icon: "🤨", title: "list1", parent: null}),
    new TodoModel(2, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(3, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(4, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(5, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(6, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(7, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(8, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(9, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(10, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(11, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(12, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(13, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(14, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(15, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(16, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(17, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(18, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(19, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(20, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(21, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(22, "build a SwiftUI app", "", Priorities.HIGH, true, {id: 2, icon: "😅", title: "list2", parent: 1}),
    new TodoModel(23, "build a React web app", "", Priorities.MED, false, {id: 2, icon: "😅", title: "list2", parent: 1})
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