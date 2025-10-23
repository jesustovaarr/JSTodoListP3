export default class Model {
    constructor() {
        this.view = null;
        this.todos = [];
    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(todo){
        const todo ={
            id: 0,
            title: title,
            description: description,
            completed: false
        };
        
        this.todos.push(todo);
    }
}