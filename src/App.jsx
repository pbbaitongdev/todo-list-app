import { useState, useRef } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todolist, setTodolist] = useState([]);

  const inputRef = useRef(null);

  const addTask = () => {
    setTodolist([...todolist, { value: task, disabled: true }]);
    setTask("");
  };
  const deleteTask = (val) => {
    // console.log(val);
    setTodolist([...todolist.slice(0, val), ...todolist.slice(val + 1)]);
  };

  const editTask = (val) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((item) =>
        item === val ? { ...item, disabled: !item.disabled } : item
      )
    );
    if (!val.disabled) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className="wrapper">
        <header>
          Simple <span>To-Do</span> List App
        </header>

        <div className="search_container">
          <input
            type="text"
            placeholder="What To-Do?"
            // className="inputTodo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <button className="addBtn" onClick={addTask}>
            Add Todo
          </button>
        </div>

        <section className="todos">
          <h3>Your Todos</h3>

          <ul className="todo_container">
            {/* {JSON.stringify(todolist)} */}
            {todolist.map((item, index) => (
              <>
                <li key={index}>
                  <input
                    type="text"
                    value={item.value}
                    disabled={item.disabled}
                    // autoFocus
                    ref={inputRef}
                  ></input>
                  <div className="buttons">
                    <button className="editBtn" onClick={() => editTask(item)}>
                      {item.disabled ? "Edit" : "Save"}
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default App;
