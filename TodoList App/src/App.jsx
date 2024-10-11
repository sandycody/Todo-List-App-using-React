import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState(""); //todo is an input text
  const [todos, setTodos] = useState([]); //todos is an array which holds all our todos
  const [addOrUpdate, setAddOrUpdate] = useState("Add");
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("Todos"));
    if (todos) {
      setTodos(todos);
    } 
  }, []);

  const saveToLS = () => {
    localStorage.setItem("Todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }
  
  

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setAddOrUpdate("Add");
    saveToLS();
  }

  const handleEdit = (id) => {
    let t = todos.filter(item => item.id === id);
    setTodo(t[0].todo);
    t ? setAddOrUpdate("Update") : setAddOrUpdate("Add");
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (id) => {
    let text = "Are you sure, you want to delete this todo?";
    if (confirm(text) === true) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    } else {
      alert("Todo is not deleted");
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }
  

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-2xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='text-center font-semibold font-serif text-3xl mb-8'>TodoMaster</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full px-5 py-1 rounded-lg' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-500 hover:bg-violet-800 disabled:bg-orange-400 rounded-md px-2 py-1 text-sm font-bold text-white mx-2'>{addOrUpdate}</button>
          </div>
        </div>

        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label htmlFor="show" className='font-mono font-bold mx-2'>Show Finished</label>
        <div className="my-2 h-[1px] bg-black">

        </div>
        <h2 className='font-bold text-2xl my-6'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-bold text-red-400 my-5'>No Todos added yet</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex my-4 justify-between">
                <div className="flex gap-5">
                  <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="button flex h-full">
                  <button onClick={() => handleEdit(item.id)} className='bg-violet-500 hover:bg-violet-800 rounded-md p-2 py-1 text-white mx-1'><FaEdit /></button>
                  <button onClick={() => handleDelete(item.id)} className='bg-violet-500 hover:bg-violet-800 rounded-md p-2 py-1 text-white mx-1'><MdDelete /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default App;


