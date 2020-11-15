import { configureStore, createReducer } from "@reduxjs/toolkit";

const { createStore } = require("redux");


const ADD_TODO="ADD_TODO";
const DELETE_TODO="DELETE_TODO";

export const addToDo=(text,Key)=>{
    return{
        type:ADD_TODO,text,key:Key
    }
}

export const deleteToDo = (id) =>{
    return{
        type:DELETE_TODO,id
    }
}


const reducer = (state=[],action)=>{
    
    switch(action.type){
        case ADD_TODO:
            return [action.text,...state];
        case DELETE_TODO:
            return state.filter((item,index)=>index !== action.id);
        default:
            return state;
    }
}




const store = createStore(reducer);



export default store;