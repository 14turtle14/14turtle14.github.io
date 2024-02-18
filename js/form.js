const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

const addToDo = (item) => {
    if (item.trim() === '') return;

    const todo = {
        id: Date.now(),
        name: item,
        completed: false
    };

    todos.push(todo);
    updateTodos();
    todoInput.value = '';

    showToast("New task has been added successfully");
};

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addToDo(todoInput.value);
});

function updateTodos() {
    renderTodos();
    saveToLocalStorage();
}

function renderTodos() {
    todoItemsList.innerHTML = todos.map(todo => {
        const checked = todo.completed ? 'checked' : '';
        return `
            <li class="item ${todo.completed ? 'completed' : ''}" data-key="${todo.id}">
                <input type="checkbox" class="checkbox" ${checked}>
                ${todo.name}
                <button class="delete-button">X</button>
            </li>
        `;
    }).join('');
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function toggle(id) {
    const todo = todos.find(todo => todo.id == id);
    if (todo) {
        todo.completed = !todo.completed;
        updateTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id != id);
    updateTodos();
    showToast("Task has been deleted successfully");
}

function showToast(message) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "firebrick",
        className: "toast",
    }).showToast();
}

function getFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
    if (event.target.type == 'checkbox') {
        toggle(event.target.parentElement.dataset.key);
    } else if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.dataset.key);
    }
});
