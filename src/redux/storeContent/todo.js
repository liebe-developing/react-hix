import { createAction,createReducer, createSlice } from "@reduxjs/toolkit";
import userSlice from "../user/userSlice";

export const addTodo = createAction("ADD_TODO")
export const removeTodo = createAction("REMOVE_TODO")


export default todoReducer([],{
    [addTodo.type]: (state,action)=>{
        state.push(action.payload);
    },
    [removeTodo.type]: (state,action)=>{
        // 
    }
})


// FINSHING COURSE REDUXE TOOLIKET





// export default function reducer(state = [],action) {
//     switch (action.type) {
//         case addTodo.type:
//             return [...status,action.payload]
//             break;
//         case removeTodo.type:
//             return status.filter((todo) => todo.id === action.payload.id)
//         default: {
//             return status
//         }
            
//     }
// }

