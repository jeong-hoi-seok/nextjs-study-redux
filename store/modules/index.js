import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import reduxModal from "./reduxModal";

const reducer = (state,action) => {
    if(action.type == HYDRATE)
    {
        return {
            ...state,
            ...action.payload
        }
    }
    return combineReducers({
        reduxModal,
    })(state, action);
}

export default reducer;