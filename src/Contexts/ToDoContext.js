import { useContext ,createContext } from "react";

// This is the actual context 
export  const ToDoContext = createContext({
todos:[
    {
        id:1 ,
        todo :"Todo msg",
        completed : " false "
    }
],
addTodo :(todo)=>{},
updateTodo :(id,todo)=>{},
deleteTodo :(id)=>{},
toggleComplete : (id)=>{}

})
 // Here we are using this so that we don't have to import both useContext and the TodoContext in every file , we can totally skip it , but it's a goof practice 
export const useToDo = ()=>{
return useContext(ToDoContext)
}

// here we are using the toDoProvider just becoz , we don't have to do it later in the file while using it , otherwise we have to use wrap the Coponents in the <ToDoProvider.context> , This is the only purpose 
export const TodoProvider = ToDoContext.Provider  ;

