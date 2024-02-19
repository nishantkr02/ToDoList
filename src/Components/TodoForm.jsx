import React, { useState } from 'react'
import { useToDo } from '../Contexts/ToDoContext';

function TodoForm() {
    const [todo,setTodo]= useState() ;

    //Importing the functionality from the context .
    const {addTodo}= useToDo();

// creating a newTodo and passing it in the addTodo method 
const addNewTodo =(e)=>{
 e.preventDefault();
 if(!todo) return  ;

 // we are passing the values like this , coz while defining the function ,we were using the spread .
 addTodo({id:Date.now(),todo:todo,completed:false})

 //To clear up the form input feild 
 setTodo("") ;

}

    return (
        <form onSubmit={addNewTodo} className="flex">
            <input
                type="text"
                placeholder="Add a Task ..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} 
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white text-sm md:text-xl shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm