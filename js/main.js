let todoListItems = [];

const todoForm = document.getElementById("todo-form");

todoForm.addEventListener("submit", (event) => {
  {
    event.preventDefault();

    const errorMessageElement = document.getElementById("error-msg");
    const inputElement = document.getElementById("todo-input");

    if (inputElement.value) {
      inputElement.value.trim();

      addTodoItem(inputElement.value);

      inputElement.value = "";
      errorMessageElement.style.display = "none";
    } else {
      errorMessageElement.innerHTML = "Submission can't be empty!";
      errorMessageElement.style.display = "block";
    }
  }
});

const todoList = document.getElementById("todo-list");

todoList.addEventListener("click", (event) => {
  const todoItemToDelete = event.target.parentElement.parentElement.dataset.key;

  deleteTodoItem(todoItemToDelete);
});

const addTodoItem = (userInput) => {
    const todoItem = {
      id: Date.now(),
      value: userInput,
    };
  
    todoListItems.push(todoItem);
    displayTodoItem(todoItem);
  };

  const deleteTodoItem = (itemId) => {
    const todoItemIndexValue = todoListItems.findIndex(
      (todoItem) => todoItem.id === Number(itemId)
    );
  
    const todoItemWithDeleteField = {
      deleted: true,
      ...todoListItems[todoItemIndexValue],
    };
  
    todoListItems = todoListItems.filter(
      (todoItem) => todoItem.id !== Number(itemId)
    );
  
    displayTodoItem(todoItemWithDeleteField);
  };

  const displayTodoItem = (newTodoItem) => {
    const todoList = document.getElementById("todo-list");
    const currentItem = document.querySelector(`[data-key='${newTodoItem.id}']`);
  
    if (newTodoItem.deleted) {
      currentItem.remove();
      return;
    }
  
    const listItemElement = document.createElement("li");
  
    listItemElement.setAttribute("data-key", newTodoItem.id);
  
    listItemElement.innerHTML = `    
        <div class="todo_item">
          <span>${newTodoItem.value}</span>
          <button id="delete-todo">Delete</button>
        </div>
      `;
  
    todoList.append(listItemElement);
    todoList.style.display = "block";
  };

  