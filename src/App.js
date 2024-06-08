import React from "react";

function App() {
  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de Tareas </h4>
          {/* Aqui va la lista de tareas */}
          <ul className="list-group">
            <li className="list-group-item">
              <span>Tarea 1</span>
              <button className="btn btn-danger btn-sm float-right mx-2">
                Eliminar
              </button>
              <button className="btn btn-warning btn-sm float-right">
                Editar
              </button>
            </li>
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center"> Formularios </h4>
          {/* Aqui van los formularios */}
          <form>
            <input
              type="text" className="form-control mb-2" placeholder="Ingrese la tarea"
            />
            <button className="btn btn-primary btn-block" type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
