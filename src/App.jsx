import { useState, useRef, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todolist, setTodolist] = useState([]);
  const inputRefs = useRef([]);

  // Add a new task to the list
  const addTask = () => {
    setTodolist([...todolist, { value: task, disabled: true }]);
    setTask("");
  };

  // Delete a task from the list
  const deleteTask = (index) => {
    setTodolist([...todolist.slice(0, index), ...todolist.slice(index + 1)]);
  };

  // Toggle the disabled state of a task
  const toggleEdit = (index) => {
    setTodolist(
      todolist.map((item, i) =>
        i === index ? { ...item, disabled: !item.disabled } : item
      )
    );
  };

  // Use useEffect to focus the input field after it is enabled (the component has re-rendered)
  useEffect(() => {
    // Find the index of the task that is in edit mode (item.disabled === false)
    const enabledInputIndex = todolist.findIndex((item) => !item.disabled);
    // If an enabled input field is found and its ref exists, focus it
    if (enabledInputIndex !== -1 && inputRefs.current[enabledInputIndex]) {
      inputRefs.current[enabledInputIndex].focus();
    }
  }, [todolist]); // Run this effect whenever todolist changes

  console.log(todolist);

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
            {todolist.map((item, index) => (
              <>
                <li key={index}>
                  <input
                    type="text"
                    value={item.value}
                    disabled={item.disabled}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => {
                      // Update the task value when editing
                      setTodolist(
                        todolist.map((task, i) =>
                          i === index
                            ? { ...task, value: e.target.value }
                            : task
                        )
                      );
                    }}
                  ></input>
                  <div className="buttons">
                    <button
                      className="editBtn"
                      onClick={() => toggleEdit(index)}
                    >
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
