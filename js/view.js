// view.js
export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.tbody = this.table.querySelector('tbody');
        this.filterInput = document.getElementById('filter');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();

        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));

        this.filterInput.addEventListener('keyup', async () => {
            const searchText = this.filterInput.value;
            const filteredTodos = await this.model.filterTodos(searchText);
            this.render(filteredTodos);
        });
    }

    setModel(model) {
        this.model = model;
    }

    async render(todos = null) {
        this.clearTable();
        const data = todos || await this.model.getTodos();
        data.forEach(todo => this.createRow(todo));
    }

    async addTodo(title, description) {
        const todo = await this.model.addTodo(title, description);
        this.createRow(todo);
    }

    async editTodo(id, values) {
        const updatedTodo = await this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = updatedTodo.title;
        row.children[1].innerText = updatedTodo.description;
        row.children[2].children[0].checked = updatedTodo.completed;
    }

    async toggleCompleted(id) {
        await this.model.toggleCompleted(id);
    }

    async removeTodo(id) {
        await this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    clearTable() {
        this.tbody.innerHTML = '';
    }

    createRow(todo) {
        const row = this.tbody.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}
