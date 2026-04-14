import { createContext } from "react";
import { TodoModel, Priorities } from "../fetch/models/TodoModel";
import { TodoListModel } from "../fetch/models/TodoListModel";


export const SelectionContext = createContext(null);

export const TodoListsContext = createContext(null);

export const TodosContext = createContext(null);

export const ErrorBadgeContext = createContext(null);

export const TokenContext = createContext(null);

export const UserContext = createContext(null);