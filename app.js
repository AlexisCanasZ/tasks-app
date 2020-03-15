document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    e.preventDefault();

    var date = new Date();
    let id = date.getTime();
    let priority = document.getElementById('priority').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    if (title != "" && description != "") {
        const task = {
			id,
			priority,
			title,
			description
		};

		if (localStorage.getItem('tasks') === null) {
			let tasks = [];
			tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
		} else {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        document.getElementById('formTask').reset();
        getTasks();
    } else {
        alert("The Form contain empty inputs")
    }
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let priority = tasks[i].priority;
        
        switch (priority) {
			case 'LOW':
                priority = `<small class="text-success float-right px-3 bg-light shadow-sm">PRIORITY: <b>${priority}</b></small>`;
				break;
			case 'MID':
                priority = `<small class="text-warning float-right px-3 bg-light shadow-sm">PRIORITY: <b>${priority}</b></small>`;
				break;
			case 'HIGH':
                priority = `<small class="text-danger float-right px-3 bg-light shadow-sm">PRIORITY: <b>${priority}</b></small>`;
				break;
			default:
				break;
		}
        
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card mb-2">
            <div class="card-body">
                <h4 class="mb-3">${title}</h4>
                <p class="card p-3"><code class="text-justify">${description}</code></p>
                <a class="btn btn-danger text-white" onClick="deleteTask('${id}')"><i class="fas fa-times fa-fw"></i> Delete</a>
                ${priority}
            </div>
        </div>`;
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if (tasks[i].id == id) {
            tasks.splice(i, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();