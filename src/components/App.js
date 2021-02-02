import React from "react";
import { useState , useEffect} from "react";
import  './style.css'

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodo] = useState(JSON.parse(localStorage.getItem('state')) || []);

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
      const id = setInterval(() => setDateTime(new Date()), 1000);
      return clearInterval(id);
      
  }, []);
   
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(todos))
 })

  const inputHandle = (e) => {
    setInput(e.target.value);
  };

  const RemoveItem = (todokey) => {
    setTodo(todos.filter((todo, key) => key !== todokey));
  };
  
  const addHandle = () => {
    
    if (input === "") {
      alert("Please include what to do");
    } else if (todos.find((todo) => todo.name === input)) {
      alert("Already on the list");
    } else {
      const newTodo = {
        name: input,
        done: false,
        time: dateTime
      };
      setTodo([...todos, newTodo]);
    
      setInput("");
    }
  };

  const finishTodo = (todokey) => {
    setTodo(
      todos.map((todo, key) => {
        if (key === todokey) {
          todo.done = !todo.done;
        }
        return todo;
      })
    );
  };



  return (
    <div className="todoSection">
        <div className="toDo">
          <div className="time"> {`${dateTime.toLocaleTimeString()}`}</div>
          <div className="toDoTable">
          <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={input}
            className="addInput"
            onChange={inputHandle}
            placeholder="What will you do today ?"
          />
          <button 
              onClick={addHandle} 
              className="addBtn">
              Add
          </button>
        </form>
          </div>

          <div className="dropList">
            <div className="dropListUl">         
                {todos.map((todo, key) => (
                  <div  key={key} className="dropListContainer">
                    <label>
                  
                      <input type="checkbox" 
                              className="checkInput"
                              onClick={() => finishTodo(key)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div
                      className={todo.done ? "done" : ""}
                      >
                      {todo.name}                     
                    </div>
                    <h4>{`${dateTime.toLocaleDateString()}`}</h4>
                    <button onClick={() => RemoveItem(key)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}      
            </div>
          </div>
      </div>
      <div className="area" >
          <ul className="circles">
          {todos.map((todo, key) => (
            <li key={key}>{todo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


