import { todoList } from "..";
import { Todo, TodoList } from "../classes";

//Referencias en HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
    const htmlTodo =
    `<li class="${(todo.completado) ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup',(event) => {
    let valor = txtInput.value;
    if (event.keyCode === 13 && valor.length > 0) {
        const nuevoTodo = new Todo(valor);
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";
    }
});

divTodoList.addEventListener('click',(event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoID = todoElemento.getAttribute('data-id');
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoID);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoID);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click',() => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains("completed")) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click',(event) => {
    const filtro = event.target.text;
    if (!filtro)
    {
        return;        
    };

    anchorFiltros.forEach(element => {
        element.classList.remove("selected");
    });

    event.target.classList.add("selected");

    for (const elemento of divTodoList.children) {
        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add("hidden");
                }
            break;
            
            case 'Completados':
                if (!completado) {
                    elemento.classList.add("hidden");
                }
            break;

            default:
                break;
        }
    }

});
