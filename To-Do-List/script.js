// Adding new tasks
document.getElementById('add-task').addEventListener('click', function () {
    let newTaskValue = document.getElementById('new-task').value.trim();

    if (newTaskValue.length === 0) {
        return;
    }

    let listItem = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            listItem.style.textDecoration = 'line-through';
        } else {
            listItem.style.textDecoration = 'none';
        }
        updateLocalStorage();
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        updateLocalStorage();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(" " + newTaskValue + " "));
    listItem.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(listItem);
    document.getElementById('new-task').value = '';

    updateLocalStorage();
});

// Update tasks in local storage
function updateLocalStorage() {
    let tasks = [];
    let items = document.querySelectorAll('#task-list li');
    items.forEach(item => {
        let taskText = item.textContent.replace('Delete', '').trim();
        let isCompleted = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
        savedTasks.forEach(function (task) {
            let listItem = document.createElement('li');

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            //if (checkbox.checked) {
            //    listItem.style.textDecoration = 'line-through';
            //}
            if (checkbox.checked) {
                listItem.style.textDecoration = 'line-through';
            }
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    listItem.style.textDecoration = 'line-through';
                } else {
                    listItem.style.textDecoration = 'none';
                }
                updateLocalStorage();
            });

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                listItem.remove();
                updateLocalStorage();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(document.createTextNode(" " + task.text + " "));
            listItem.appendChild(deleteButton);

            //if (checkbox.checked) {  // <--- This is where we ensure it's visually consistent
            //    listItem.style.textDecoration = 'line-through';
            //} else {
            //    listItem.style.textDecoration = 'none';
            //}

            document.getElementById('task-list').appendChild(listItem);
        });
    }
});
