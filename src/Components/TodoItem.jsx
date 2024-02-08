import React, { useState } from 'react'
import { useToDo } from '../Contexts/ToDoContext';

function TodoItem({ anyTodo}) {
  //Thought Process  =>  so we need three   Functionailties for "anyTodo" item : ToggleComplete , updateTodo amd deleteTodo : So we toh need to import these three functionalities from the Todocontext , right ---------- !!
 const {updateTodo ,deleteTodo,toggleComplete} = useToDo() ;

 // Now coming to states : one will be needed to check the editablity of anytodo item , like we can edit it or not.
 const [isTodoEditable , setIsTodoEditable]= useState(false) ;
 // Second will be needed for the anytodo's message , like when we need to update it :
const[todoMessage,setTodoMessage]= useState(anyTodo.todo) ;


/* --------------- For referece -------
This is how our anyTodo object is defined in out context 
{
    id:1 ,
    todo :"Todo msg",
    completed : " false "
}
 */

//Wrinting functionality for when and how  to use these funtion for the context  :
const editTodoBtn =()=>{
     updateTodo(anyTodo.id ,{...anyTodo,todo:todoMessage})

     setIsTodoEditable(false);
}

const toggleHandler = () =>{
    toggleComplete(anyTodo.id)
}


return (
<div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black text-2xl  ${
        anyTodo.completed ? "bg-[#82E17F]" : "bg-[#EF6969]"
    }`}
>
    <input
        type="checkbox"
        className="cursor-pointer"
        checked={anyTodo.completed}
        onChange={toggleHandler}
    />
    <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${anyTodo.completed ? "line-through" : ""}`}
        value={todoMessage}
        onChange={(e) => setTodoMessage(e.target.value)}
        readOnly={!isTodoEditable}
    />
    {/* Edit, Save Button */}
    <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
            if (anyTodo.completed) return;

            if (isTodoEditable) {
                editTodoBtn();
            } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={anyTodo.completed}
    >
        {isTodoEditable ? "📁" : "✏️"}
    </button>
    {/* Delete Todo Button */}
    <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(anyTodo.id)}
    >
        ❌
    </button>
</div>
    );
}

export default TodoItem