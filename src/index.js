import './styles.css';
import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( todo => {
    crearTodoHtml(todo);
});

//console.log(todoList.todos);

/*
const tarea = new Todo("Aprender JavaScript");

todoList.nuevoTodo(tarea);
console.log(todoList);

crearTodoHtml(tarea);*/

//localStorage.setItem("mi_llave","ADC123");

/*
setTimeout(() => {
    localStorage.removeItem("mi_llave");
}, 1500);*/
