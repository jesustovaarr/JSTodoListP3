// model.js
export default class Model {
    constructor() {
        this.view = null;
        this.apiUrl = 'http://localhost:3000/api/todos'; // Cambia por tu ruta real
    }

    setView(view) {
        this.view = view;
    }

    async getTodos() {
        const response = await fetch(this.apiUrl);
        const todos = await response.json();
        return todos;
    }

    async addTodo(title, description) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed: false })
        });
        const newTodo = await response.json();
        return newTodo;
    }

    async removeTodo(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
    }

    async editTodo(id, values) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        const updatedTodo = await response.json();
        return updatedTodo;
    }

    async toggleCompleted(id) {
        const todos = await this.getTodos();
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        todo.completed = !todo.completed;
        await this.editTodo(id, todo);
    }

    async filterTodos(searchText) {
        const todos = await this.getTodos();
        return todos.filter(todo =>
            todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}
