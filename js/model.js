export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos) {
            this.todos = [
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch 35 tutorials',
                    completed: false,
                }
            ];
        }
        this.currentId = 1;
    }

    setView(view) {
        this.view = view;
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos)); 
    }

    getTodos() {
        return this.todos;
    }

    findTodo(id){
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        const index = this.todos.findIndex(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
    }

    addTodo(todo){
        const todo ={
            id: this.currentId++,
            title,
            description: description,
            completed: false
        };
        
        this.todos.push(todo);
        console.log(this.todos);

        return {...todo};
    }

    removeTodo(id) {
        const index = this.todos.findTodo(id);
    }
}