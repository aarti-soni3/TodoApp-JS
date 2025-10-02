const tasks = [];//

/* #region Main Functionality */

const addTask = (taskName) => {
    const task = {
        id: Date.now(),
        taskName: taskName,
        isCompleted: false
    };
    tasks.push(task);//
}

const clearTaskData = () => {

    tasks.length = 0;
    SaveDataToLocalStorage();
    printTasks();
}

const SaveDataToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const UpdateDataByIndexToLocalStorage = (id, newData) => {
    console.log(id, newData);
    let index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...newData };
    }
    SaveDataToLocalStorage();
}

const RemoveDataByIndexToLocalStorage = (id) => {
    newTasks = [];
    tasks.map((task) => {
        if (task.id !== id)
            newTasks.push(task);
    })
    tasks.length=0;
    tasks.push(...newTasks);
    SaveDataToLocalStorage();
    printTasks();
}

const LoadFromLocalStorage = () => {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON) {
        const tasksArray = JSON.parse(tasksJSON);
        tasks.length = 0;
        tasks.push(...tasksArray);
    }
}

/* #endregion */

/* #region UI Callbacks */

const clearTaskInput = () => {
    document.getElementById('taskInput').value = '';
}

const printTasks = () => {
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    const taskHTML = tasks.map((task) => {
        return `<input type="checkbox" id="cb${task.id}" ${task.isCompleted ? "checked" : " "} />
        <label for="cb${task.id}" id="label${task.id}"  style = "${task.isCompleted ? 'text-decoration: line-through' : 'none'}"> 
         ${task.taskName}</label>
         <button type="button" id="button${task.id}" aria-label="close" style="background: none; border:none; cursor:pointer;font-size:1em;"> &times; </button>`; //
    }).join('<br/>'); //
    taskContainer.innerHTML = taskHTML;

    tasks.forEach((task) => {

        let checkbox = document.getElementById(`cb${task.id}`);
        let label = document.getElementById(`label${task.id}`);

        checkbox.addEventListener('change', () => {
            console.log(`before : ${task}, isCompleted : ${task.isCompleted}`);
            if (checkbox.checked) {
                // label.style.textDecoration = "line-through";
                label.setAttribute("style", "text-decoration: line-through");

            } else {
                label.setAttribute("style", "text-decoration: none");
            }
            task.isCompleted = checkbox.checked;
            console.log(task);
            console.log(`task is completed : ${task.isCompleted}`);
            UpdateDataByIndexToLocalStorage(task.id, { isCompleted: task.isCompleted });
        });
    });

    tasks.forEach((task) => {
        let closeButton = document.getElementById(`button${task.id}`);
        closeButton.addEventListener('click', () => {
            RemoveDataByIndexToLocalStorage(task.id);
        })
    });
}

const onAddTaskBtnClick = () => {
    let taskInput = document.getElementById("taskInput");
    let taskName = taskInput.value;

    if (taskName.trim() === '')
        return;

    addTask(taskName);
    SaveDataToLocalStorage();
    clearTaskInput();
    printTasks();
}

/* #endregion */

/* #region Event Handlers / Listeners */

document.getElementById('addTaskBtn').addEventListener('click', onAddTaskBtnClick);

document.getElementById('clearAllBtn').addEventListener('click', clearTaskData);

window.addEventListener('load', () => {
    LoadFromLocalStorage();
    printTasks();
});

//#endregion


