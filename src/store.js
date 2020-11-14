const { createStore } = require("redux");


const ADD_TODO="ADD_TODO";
const DELETE_TODO="DELETE_TODO";
let key; 
let local= localStorage.getItem(key) ? localStorage.getItem(key).split(",") : [] ; // 여기 로컬저장소의 값이 들어가야 된다. 

export const getKey =(hint)=>{
    key=hint;
}

export const addToDo=(text)=>{
    return{
        type:ADD_TODO,text
    }
}

const deleteToDo = (id) =>{
    return{
        type:DELETE_TODO,id
    }
}


const reducer = (state=local,action)=>{
    switch(action.type){
        case ADD_TODO:
            localStorage.setItem(key,[action.text,...state]);
            return [action.text,...state];
        case DELETE_TODO:
            console.log("삭제");
            return state;
        default:
            return state;
    }
}

const store = createStore(reducer);

const dispatchAddToDo=(text)=>{
    store.dispatch(addToDo(text));
}

// const dispatchDeleteToDo=(e)=>{
//     store.dispatch(deleteToDo(text));
// }

export default store;