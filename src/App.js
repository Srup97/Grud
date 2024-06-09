import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import shortid from "shortid";
import  "./css/style.tasks.css"
import { getCollection } from "./actions";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debes Ingresar una tarea")
      isValid = false;
    }
    return isValid;
  }


  const addTask = (e) => {
    e.preventDefault();
  
      if(!validForm()) {
        return
      }

    const newTask = {
      id: shortid.generate(),
      name: task
    }

    setTasks([...tasks, newTask]);

    setTask("");
  }

const saveTask = (e) => {
    e.preventDefault();

    if(!validForm()) {
      return
    }

    
    const editedTask = tasks.map(item => item.id === id ? { id, name: task} : item)
    setTasks(editedTask);
    setEditing(false);
    setTask("");
    setId("");
  }
  
  const deletetasks = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }


  const editTask = (theTask) => {
    setTask(theTask.name);
    setEditing(true);
    setId(theTask.id);
  }

  return (
    <div className="container mt-5">
      <h1 className="custom-title mb-20">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de Tareas </h4>
          {tasks.length === 0 ? (
            <li className="list-group-item">No hay Tareas</li>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li key={task.id} className="list-group-item">
                  <span className="lead">{task.name}</span>
                  <button
                    className={editing ? "disabled btn btn-danger btn-sm float-right mx-2" : "btn btn-danger btn-sm float-right mx-2"}
                    onClick={() => deletetasks(task.id)}
                    disabled={editing}
                  >
                    Eliminar
                  </button>
                  <button
                  className={editing ? "disabled btn btn-warning btn-sm float-right" : "btn btn-warning btn-sm float-right"}
                  onClick={() => editTask(task)}
                    disabled={editing}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-4">
          <h4 className="text-center">
             {editing ? "Editar Tarea" : "Agregar Tarea"} </h4>
          <form onSubmit={editing ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />

             { error && (
              <span className="text-danger mb-5 mt-5">{error}</span>
            )
              }

            <button className="btn btn-primary btn-block" type="submit">
             {editing ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
