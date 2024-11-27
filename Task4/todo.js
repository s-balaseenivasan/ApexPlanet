const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

document.addEventListener('DOMContentLoaded', loadTasks); 


function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
      removeTask(taskItem);
    });

    taskItem.appendChild(removeButton);
    taskItem.addEventListener('click', toggleCompletion);
    taskList.appendChild(taskItem);

    saveTasks(); 
    newTaskInput.value = ''; 
  }
}


function toggleCompletion(e) {
  e.target.classList.toggle('completed');
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll('li');
  taskItems.forEach(item => tasks.push({
    text: item.textContent.replace('Remove', '').trim(),
    completed: item.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
      removeTask(taskItem);
    });

    taskItem.appendChild(removeButton);
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.addEventListener('click', toggleCompletion);
    taskList.appendChild(taskItem);
  });
}

function removeTask(taskItem) {
  taskItem.remove();
  saveTasks();  
}
