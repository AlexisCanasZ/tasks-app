document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    e.preventDefault();

    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    const task = {
        title,
        description,
    }

    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    document.getElementById('formTask').reset()
    getTasks();
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title
        let description = tasks[i].description

        tasksView.innerHTML += `<div class="card mb-2">
            <div class="card-body">
                <h4>${title}</h4>
                <hr>
                <p class="card p-3"><code class="text-justify">${description}</code></p>
                <a class="btn btn-danger btn-block text-white" onClick="deleteTask('${title}')">Delete</a>
            </div>
        </div>`;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if (tasks[i].title == title) {
            tasks.splice(i, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();