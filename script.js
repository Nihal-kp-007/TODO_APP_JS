const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value;
  if (todoText.length > 0) {
    const todoObject = {
        text: todoText,
        completed: false
    }
    allTodos.push(todoObject);
    updateTodoList();
    saveTodo();
    todoInput.value = "";
  }
}
function updateTodoList() {
  todoList.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItems(todo, todoIndex);
    todoList.append(todoItem);
  });
}
function createTodoItems(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text
  todoLI.className = "todo";
  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text"> 
          ${todoText}
          </label>
          <button id="delete-button">
            <svg fill="var(--secondary-color)"xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `
  const deleteButton = todoLI.querySelector("#delete-button");
  deleteButton.addEventListener("click", function () {
    deleteTodoItem(todoIndex)
})
const checkbox = todoLI.querySelector("input");
checkbox.addEventListener("change", function () {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodo();
})
    checkbox.checked = todo.completed;
  return todoLI;
}
function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}
function saveTodo() {
    const todoaJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoaJson);
}
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}