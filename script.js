function loadTodos() {
   // Ensure todos is always an object with a todoList array
   const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
   console.log(todos);
   return todos;
}

function addTodoToLocalStorage(todoText) {
   // Ensure todos is always an object with a todoList array
   const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
   const capitalizedTodoText = capitalizeFirstLetter(todoText); // Capitalize the first letter

   // Check for duplicate entries
   if (todos.todoList.includes(capitalizedTodoText)) {
       alert('This todo item already exists.');
       return false; // Return false if it is a duplicate
   }

   todos.todoList.push(capitalizedTodoText); // Add the new todo to the todoList array
   localStorage.setItem('todos', JSON.stringify(todos)); // Save back to localStorage
   return true; // Return true if added successfully
}

function appendTodoInHtml(todoText) {
   const todoList = document.getElementById("todoList");
   const todo = document.createElement("li");
   todo.textContent = todoText;
   todoList.appendChild(todo);
}

function clearTodos() {
   localStorage.removeItem('todos'); // Clear the local storage
   const todoList = document.getElementById("todoList");
   while (todoList.firstChild) {
       todoList.removeChild(todoList.firstChild); // Clear the displayed list
   }
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
   const todoInput = document.getElementById("todoInput");
   const submitButton = document.getElementById("addTodo");
   const clearButton = document.getElementById("clearTodos");

   submitButton.addEventListener('click', () => {
       const todoText = todoInput.value.trim(); // Trim the input text
       if (todoText === '') { // Check for empty string
           alert('Please enter something in it');
       } else {
           const isAdded = addTodoToLocalStorage(todoText); // Pass the todoText to the function
           if (isAdded) {
               appendTodoInHtml(capitalizeFirstLetter(todoText)); // Ensure it is capitalized when added to the DOM
               todoInput.value = ''; // Clear the input field after adding
           }
       }
   });

   clearButton.addEventListener('click', clearTodos); // Add event listener for the clear button

   const todos = loadTodos();
   todos.todoList.forEach(todo => {
       appendTodoInHtml(todo);
   });
});
