// taskFunctions.js

import { updateDocument, addDocument, deletedDocument } from './actions';
import { isEmpty } from 'lodash';

export const validForm = (task, setError) => {
  let isValid = true;
  setError(null);
  if (isEmpty(task)) {
    setError("Debes Ingresar una tarea");
    isValid = false;
  }
  return isValid;
};

export const addTask = async (e, task, tasks, setTasks, setTask, setError) => {
  e.preventDefault();
  if (!validForm(task, setError)) {
    return;
  }
  const result = await addDocument("tasks", { name: task });
  if (!result.statusResponse) {
    setError(result.error);
    return;
  }
  setTasks([...tasks, { id: result.data.id, name: task }]);
  setTask("");
};

export const deleteTask = async (id, tasks, setTasks, setError) => {
  const confirm = window.confirm("¿Estas seguro que quieres eliminar esta tarea?");
  if (!confirm) {
    return;
  }
  const result = await deletedDocument("tasks", id);
  if (!result.statusResponse) {
    setError(result.error);
    return;
  }
  const newTasks = tasks.filter((task) => task.id !== id);
  setTasks(newTasks);
};

export const saveTask = async (e, task, tasks, setTasks, setTask, setEditing, setId, id, setError) => {
  e.preventDefault();
  if (!validForm(task, setError)) {
    return;
  }
  const result = await updateDocument("tasks", id, { name: task });
  if (!result.statusResponse) {
    setError(result.error);
    return;
  }
  const editedTask = tasks.map(item => item.id === id ? { id, name: task } : item);
  setTasks(editedTask);
  setEditing(false);
  setTask("");
  setId("");
};

export const editTask = (theTask, setTask, setEditing, setId) => {
  setTask(theTask.name);
  setEditing(true);
  setId(theTask.id);
};
