import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("Todos")
  return savedTodos ? JSON.parse(savedTodos) : []
})
  const [showfinished, setshowfinised] = useState(false)




  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }, [Todos])

  const togglefinished = (e) => {
    setshowfinised(!showfinished)


  }



  const handleEdit = (e, id) => {

    let Todo = Todos.filter(i => i.id === id)
    setTodo(Todo[0].Todo)
    let newtodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)


  }

  const handledelete = (e, id) => {

    let confirmdelete = confirm("Are you sure you want to delete this Todo")

    if(confirmdelete){

    let newtodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)

    alert("Todo deleted successfully!")

  }
}


  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, iscompleted: false }])
    setTodo("")
    console.log(Todos)


  }
  const handlechange = (e) => {
    setTodo(e.target.value)

  }
  const handlecheckbox = (e) => {
    let id = e.target.name

    let index = Todos.findIndex(item => { return item.id === id })

    let newtodos = [...Todos]
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    setTodos(newtodos)


  }

  return (
    <>
      <Navbar />
      <div className="mx-7 mr-8 py-3 bg-violet-300  rounded-xl mt-5 min-h-[86vh] ">

        <h1 className='font-bold text-center text-2xl my-6'>iTask - Manage your daily Todos</h1>

        <div className="addtodo">
          <h2 className='text-lg font-bold mx-3 my-10 '>Add a Todo</h2>
          <input onChange={handlechange} value={Todo} type="text" className='bg-white mx-2 w-1/2' />
          <button onClick={handleAdd} disabled={Todo.length <= 2} className='text-white bg-violet-800 hover:bg-violet-900  p-3 py-1 rounded-lg mx-6 text-sm font-bold cursor-pointer disabled:bg-violet-500'>Save</button>
        </div>

        <input onChange={togglefinished} className='mx-2 my-5' id='show' type="checkbox" checked={showfinished} />
        <label className='mx-2 my-5' htmlFor='show'>show finished</label>

        <div className='h-0.5 bg-black opacity-70'></div>

        <h2 className='text-2xl font-bold mx-3 my-4'>Your Todos</h2>

        <div className="todos">
          {Todos.length === 0 && <div className='text-2xl font-bold mx-3 my-5'> No Todo to Display !</div>}

          {Todos.map(item => {
            return (!showfinished || item.iscompleted) && <div key={item.id} className="todo flex mx-3  my-3 w-1/2 justify-between">

              <div className='flex gap-3'>

                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id="" />
                <div className={`my-1 mx-3 ${item.iscompleted ? "line-through" : ""}`}>{item.Todo}
                </div>
              </div>
              <div className="buttons gap-3 flex h-full">

                <button onClick={(e) => { handleEdit(e, item.id) }} className='text-white bg-violet-800 hover:bg-violet-900  p-3 py-1 rounded-lg mx-2 cursor-pointer'><FaEdit />
                </button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='text-white bg-violet-800 hover:bg-violet-900  p-3 py-1 rounded-lg mx-2  cursor-pointer'><AiFillDelete /></button>

              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
