class taskProjectList {
    constructor(){
        this.list = [];
    }

    add(project){
        this.list.push(project);
    }

    deleteOneTask(taskName, taskProject){
        this.list = this.list.filter((el) =>  el.name !== taskName ||  el.project !== taskProject);
        console.log("Project name:", taskProject);
        console.log("Task name: ", taskName); 
    }

    getProject(project){
        return this.list[project];
    }
}
export {taskProjectList};