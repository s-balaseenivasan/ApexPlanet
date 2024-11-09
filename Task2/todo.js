document.getElementById("add-todo").addEventListener("click", function() {
    const todoInput = document.getElementById("todo-input").value;
    if (todoInput.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    const li = document.createElement("li");
    li.textContent = todoInput;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      li.remove();
    });
    li.appendChild(deleteButton);
    document.getElementById("todo-list").appendChild(li);
    document.getElementById("todo-input").value = "";
  });
  