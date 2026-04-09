import { createContext } from "react";
import { TodoModel, Priorities } from "../fetch/TodoModel";
import { TodoListModel } from "../fetch/TodoListModel";


export const SelectionContext = createContext(null);

export const TodoListsContext = createContext(null);

export const TodosContext = createContext(null);