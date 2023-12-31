import { todoTask } from "./modules/todoTask"
import { todoProject } from "./modules/todoProject";
import { taskProjectList } from "./modules/taskProjectList";


const renderPage = (() => {
    
    renderProjectNavbar();
    addUserProject();
    addUserTask();
    taskModalProjectSelect();

})();


function addProject(projectName) {
    storageProject(projectName);
    renderProjectNavbar();
    projectFormBtnDelete();
    taskModalProjectSelect();
    removeDOM();
}

function addTask( name, description, dueDate, status, projectName){
    let task = new todoTask(name, description, dueDate, status, projectName);
    storageTask(task);
}

function renderProjectNavbar(){
    removeProjectNavDOM();
    const projectContainer = document.querySelector(".project-container");
    let divProject = document.createElement("div");
    divProject.classList.add("project-navbar");
    projectContainer.appendChild(divProject);
    
    const storageItem = JSON.parse(localStorage.getItem("projects"));
    if(storageItem === null){
        return 0;
    }
    
    for(let project of storageItem){
        let projectSingleDiv = document.createElement("div");
        projectSingleDiv.classList.add("single-project-div");
        divProject.appendChild(projectSingleDiv);
        const projectPara = document.createElement("p");
        projectPara.setAttribute("data-project", `${project}`);
        projectPara.innerText = `${project}`;
        projectPara.addEventListener("click", (e) => {
            if (e.currentTarget !== e.target) {
                return;
            }
            removeDOM();
            renderProject(project);
        }, false);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", (e) =>{
            if (e.currentTarget !== e.target) {
                return;
            }
            deleteProject(project);
            renderProjectNavbar();
            removeDOM();
        });
        

        projectSingleDiv.appendChild(projectPara);
        projectSingleDiv.appendChild(deleteBtn);
    }
}


function renderProject(projectName){
    const projectContainer = document.querySelector(".project-container");
    
    let divProject = document.createElement("div");
    divProject.classList.add("project-div");
    divProject.setAttribute("data-name", `${projectName}`);
    divProject.innerText = `${projectName}`;
    
    projectContainer.appendChild(divProject);
    renderTask(projectName);
}

function renderTask(projectName) {
   
   let tasks = JSON.parse(localStorage.getItem("tasks"));
   
    for(let task of tasks){
        if(task.project == projectName){
            const divForTask = document.querySelector(`[data-name = ${task.project}]`);
            // const taskDivContainer = document.createElement("div");
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("check");

            const taskName = document.createElement("p");
            taskName.innerText = `${task.name}`;
            
            const taskDescription = document.createElement("p");
            taskDescription.innerText = `${task.description}`;
            
            const taskDueDate = document.createElement("p");
            taskDueDate.innerText = `${task.dueDate}`;
            
            const taskStatus = document.createElement("input");
            taskStatus.setAttribute("type", "checkbox");
            // taskStatus.innerText = `${task.status}`;
            taskStatus.addEventListener("click", (e) =>{
                if (e.currentTarget !== e.target) {
                    return;
                }
                // taskDiv.classList.toggle("checked");
                if(task.status === "no"){
                    checked(taskDiv);
                }else{
                }
            })
            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.addEventListener("click", (e) =>{
                if (e.currentTarget !== e.target) {
                    return;
                }
                deleteTask(task.name, task.project);
                removeTaskDOM();
                renderTask(projectName);
            });
            
            divForTask.appendChild(taskDiv);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDescription);
            taskDiv.appendChild(taskDueDate);
            taskDiv.appendChild(taskStatus);
            taskDiv.appendChild(deleteBtn);
            
        }
    }
}

function removeTaskDOM() {
    const divRemove = document.querySelectorAll(`.project-div`);
    for(let projectDiv of divRemove){
        const taskRemove = projectDiv.querySelectorAll("div");
        taskRemove.forEach((div) => div.remove());
    }
}

function removeProjectNavDOM() {
    const projectContainer = document.querySelectorAll("#project-container");
    for(let div of projectContainer){
        const divProject = div.querySelectorAll(".project-navbar");
        for(let divProj of divProject){
            // const projectPara = div.querySelectorAll("p");
            // for (let para of projectPara){
            //     para.remove();
            // }
            divProj.remove();
        }
    }
    // for(let div of divProject){
    // }
}

function removeDOM(){
    const divRemove = document.querySelectorAll(".project-div").forEach(el => el.remove());
}

function deleteTask(taskName, taskProject){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log(tasks);
    tasks = tasks.filter((el) =>  el.name !== taskName ||  el.project !== taskProject);
    storageAllTasks(tasks);
}

const openProjectModal = (() => {
    const modalBtn = document.querySelector("#addProject");
    const modalProject = document.querySelector("#projectmodal");
    const span = document.getElementsByClassName("close")[0];

    modalBtn.onclick = function() {
        modalProject.style.display = "block";
    }

    span.onclick = function() {
        modalProject.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == modalProject) {
            modalProject.style.display = "none";
        }
    });
})();

function closeProjectModal(){
    const modal = document.querySelector("#projectmodal");
    modal.style.display = "none";
}

function addUserProject() {
   let form = document.querySelector("#projectdata");

   form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let projectName = document.querySelector("#project-add");
    addProject(projectName.value);
    projectName.value = "";
    closeProjectModal();
   });
}

const openTaskModal = (() => {
    const modalBtn = document.querySelector("#addTask");
    const modal = document.querySelector("#taskmodal");
    const span = document.getElementsByClassName("close")[1];

    modalBtn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
})();

function closeTaskModal() {
    const modal = document.querySelector("#taskmodal");
    modal.style.display = "none";
}

function taskModalProjectSelect(){
    const modalBtn = document.querySelector("#addTask");
    const modal = document.querySelector("#taskmodal");
    const modalContent = document.querySelector("#modaltask");
    const span = document.getElementsByClassName("close")[0];
    const formProject = document.createElement("select");
    formProject.classList.add("project-btn");
    formProject.setAttribute("id","selectproject");

    const storageItemProject = JSON.parse(localStorage.getItem("projects"));
    if(storageItemProject === null){
        return 0;
    }


    for(let project of storageItemProject){
        let option = document.createElement("option");
        option.value = project;
        let optionText = document.createTextNode(`${project}`);
        option.appendChild(optionText);
        formProject.appendChild(option);
    }
    modalContent.appendChild(formProject);
}

function projectFormBtnDelete(){
    const modalContent = document.querySelectorAll(".project-btn");
    for(let modalBtn of modalContent){
        modalBtn.remove();
    }
}

function addUserTask(){
    let form = document.querySelector("#taskdata");

    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        let taskName = document.querySelector("#taskName-add");
        let taskDescription = document.querySelector("#taskDescription-add");
        let taskDate = document.querySelector("#taskDate-add");
        let taskDone = document.querySelector("#taskDone-add");
        let projectName = document.querySelector("#selectproject");
        
        addTask( taskName.value, taskDescription.value, taskDate.value, taskDone.value, projectName.value);
        removeDOM();
        renderProject(projectName.value); 
        closeTaskModal();

        taskName.value = "";
        taskDescription.value = "";
        taskDate.value = "";
        taskDone.value = "";
    });
}

function checked(taskDiv) {
    taskDiv.classList.toggle("checked");
}

function storageProject(projectName) {
    let dataList;
    if(localStorage.getItem('projects') === null){
        dataList = [];
    }else{
        dataList = JSON.parse(localStorage.getItem("projects"));
    }

    // for(let item of projectName){
        dataList.push(projectName);
    // }
    localStorage.setItem("projects", JSON.stringify(dataList));

}

function storageTask(taskList){
    let dataList;
    if(localStorage.getItem('tasks') === null){
        dataList = [];
    }else{
        dataList = JSON.parse(localStorage.getItem("tasks"));
    }

    dataList.push(taskList);

    localStorage.setItem("tasks", JSON.stringify(dataList));
}

function storageAllTasks(allTasks){
    let dataList;
    if(localStorage.getItem('tasks') === null){
        dataList = [];
    }else{
        dataList = [];
    }

    for(let item of allTasks){
        dataList.push(item);
        // console.log(item);
    }
    // console.log("dataList:", dataList);
    localStorage.setItem("tasks", JSON.stringify(dataList));
}

function deleteProject(projectName) {
    let allProjects = JSON.parse(localStorage.getItem("projects"));
    allProjects = allProjects.filter((el) =>  el !== projectName);
    
    let taskList;
    if(localStorage.getItem('tasks') === null){
        taskList = [];
    }else{
        taskList = JSON.parse(localStorage.getItem("tasks"));
    }
    taskList = taskList.filter((el) => el.project !== projectName)
    localStorage.removeItem("tasks");
    
    storageAllTasks(taskList)
    storageAllProjects(allProjects);
}

function storageAllProjects(allProjects) {
    let dataList;

    if(localStorage.getItem('projects') === null){
        dataList = [];
    }else{
        dataList = [];
    }
    for(let item of allProjects){
        dataList.push(item);
        // console.log(item);
    }
    // console.log("dataList:", dataList);
    localStorage.setItem("projects", JSON.stringify(dataList));
}