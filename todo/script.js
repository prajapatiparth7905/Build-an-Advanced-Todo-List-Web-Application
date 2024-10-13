const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDescription = document.getElementById('todo-description');
const todoDueDate = document.getElementById('todo-due-date');
const todoPriority = document.getElementById('todo-priority');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Load todos on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTodos(todos);
});

// Add a new todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    const descriptionText = todoDescription.value.trim();
    const dueDate = todoDueDate.value;
    const priority = todoPriority.value;

    if (todoText) {
        const todo = {
            text: todoText,
            description: descriptionText,
            dueDate: dueDate,
            priority: priority,
            completed: false,
        };

        todos.push(todo);
        updateLocalStorage();
        renderTodos(todos);
        form.reset();
    }
});

// Render todos
function renderTodos(todosToRender) {
    todoList.innerHTML = '';

    todosToRender.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        
        if (todo.completed) {
            li.classList.add('completed');
        }

        const priorityBadge = document.createElement('span');
        priorityBadge.className = `priority ${todo.priority}`;
        priorityBadge.textContent = todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1);
        li.appendChild(priorityBadge);

        // Show description and due date
        const descriptionText = document.createElement('span');
        descriptionText.textContent = todo.description ? `(${todo.description})` : '';
        li.appendChild(descriptionText);

        const dueDateText = document.createElement('span');
        dueDateText.textContent = todo.dueDate ? `Due: ${new Date(todo.dueDate).toLocaleDateString()}` : '';
        li.appendChild(dueDateText);

        // Toggle completion
        li.addEventListener('click', () => {
            todo.completed = !todo.completed;
            updateLocalStorage();
            renderTodos(todos);
        });

        // Delete todo
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            updateLocalStorage();
            renderTodos(todos);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}