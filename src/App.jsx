import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts/ToDoContext';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';

function App() {
  // The todos we are getting from the context ,we are sstoring it here  :
   const [ todos,setTodos] = useState([]);


   // Adding new Todo -------------------------
  const addTodo =(newTodo)=>{
      // setTodos((prev)=>[newTodo,...prev]) : Add new todo to the existing list of todos : spread operator 
       setTodos((prev)=>[{id:Date.now(),...newTodo},...prev])
  }

  // updating an existing  Todo ---------------
  const updateTodo = (id,newTodo)=>{
    // first getting  to that id which needs to be updated
    // todos is an array of objects so each todo is an object , so we can apply map on it : 

    // prev is an current todos array , prevTodo is a  single  object
      setTodos((prev)=> prev.map((prevTodo)=>
        prevTodo.id===id ? newTodo : prevTodo 
      )
      )
  }
 // Here we are using the filter method to apply a filter on the exisitng array and to store the new array on to it which has every other object other than the one we need to delete  .
  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter(
      (prevTodo)=>prevTodo.id!==id ))
  }


  //toggleComplete ----------------------------
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>
      //First take the whole thing as it is , and after that just negate the value of completed in that specific prevTodo .
      prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed }: prevTodo ))
  }


//----------------------- Local Storge ----------------------
// The method which will be used whenever the app is loaded , take out all the values form the local storage and the load that into our todos state .
// No points for guessing , useEffect  will be used here :Things to note here is  , we can use the local storage directly as long as we are not using the server side rendering  and we need to use JSON.parse as the local storage gives the value in the string format .
    useEffect(()=>{
     const todos =JSON.parse(localStorage.getItem("todoList")) ;
     if(todos && todos.length>0){
      setTodos(todos) ;
     }
    },[])

 //We want to set the values of the todos to the local storage also whenever there's a change occurs in the todos , but we cannot simply put  todos in the above useEffect  as dependency array,cozz everytime the todos gets updated , the local storage.get() method will also run . 

 // So we have to use one separate useEffect to set the items to local storage whenever  the todos gets updated .
useEffect(()=>{
  localStorage.setItem("todoList",JSON.stringify(todos))
 },[todos])

// -----------Local Stoage Ends here ------------------------


  return (
    <TodoProvider 
    value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className=" mt-4 width bg-[#535490] min-h-screen py-8   rounded-3xl ">
                <div className="mt-4 w-8/12 sm:w-full max-w-2xl mx-auto shadow-lg rounded-3xl px-8 py-8  text-black bg-[#E4CB57]">
                    <h1 className="text-4xl text-black font-bold text-center p-2 mb-8 mt-2"> Your To-Do List </h1>
                    <div className="mb-4 p-1 bg-white text-xl  rounded-lg">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3 rounded-3xl">
                        {/*Loop and Add TodoItem here , we must use keys in the div while creating the children  */}

                      {
                        todos.map((todoItem)=> (
                         <div key={todoItem.id} 
                         className='w-full text-xl'>
                           <TodoItem anyTodo={todoItem}/>
                          </div>
                        ))
                      }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
