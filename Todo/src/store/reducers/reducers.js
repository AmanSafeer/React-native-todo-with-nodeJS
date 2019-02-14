import {actionTypes} from '../constant/constant';

const initialState={
    todos:[],
    editing:false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET:{
            return{
                ...state,
                todos:action.payload,   
            }
        }
        case actionTypes.ADD:{
            return{
                ...state,
                todos:state.todos.concat(action.payload),   
            }
        }
        case actionTypes.DELETE:{
            let newTodos= [...state.todos];
            newTodos.splice(action.payload,1)
             // let newTodos= [...state.todos];
            // let todo = newTodos.find((val)=> {if(val.id === action.payload){return val}})
            // let index = newTodos.indexOf(todo)
            // newTodos.splice(index,1)
            return { 
                ...state,
                todos:newTodos,
            }
        }
        case actionTypes.DELETEALL:{
            let newTodos= [...state.todos];
            newTodos.splice(0)
            return { 
                ...state,
                todos:newTodos,
            }
        }
        case actionTypes.UPDATE:{
            let newTodos= [...state.todos];
            let todo= action.payload.todoObj;
            let ind = action.payload.ind
            newTodos.splice(ind,1,todo)
            return {
                ...state,
                todos:newTodos,
            }
        }
     
        default: return state;
    }
}