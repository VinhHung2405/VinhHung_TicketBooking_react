import { combineReducers } from "redux";
import { ticketReducer } from "./ticketReducer";

export let rootReducer = combineReducers({ticketReducer});