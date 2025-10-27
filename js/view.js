// view.js
import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.tbody = this.table.querySelector('tbody'); // Importante para limpiar y añadir
        this.filterInput = document.getElementById('filter'); // Elemento del filtro
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
    
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));

        // Evento que "escucha" cada vez que escribes en el filtro
        this.filterInput.addEventListener('keyup', () => {
            const searchText = this.filterInput.value;
            const filteredTodos = this.model.filterTodos(searchText);
            this.render(filteredTodos); // Vuelve a dibujar la tabla con los resultados
        });
    }

    setModel(model) {
        this.model = model;
    }

    // Modificamos render para que acepte una lista de tareas
    render(todos = this.model.getTodos()) {
        this.clearTable(); // Limpia la tabla antes de dibujar
        todos.forEach((todo) => this.createRow(todo));
    }

    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }
    
    // Método nuevo para limpiar las filas de la tabla
    clearTable() {
        this.tbody.innerHTML = '';
    }

    createRow(todo) {
        const row = this.tbody.insertRow(); // Usamos tbody para insertar
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1'); 
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('aria-label', 'Edit Todo'); // Para accesibilidad
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1'); 
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.setAttribute('aria-label', 'Remove Todo'); // Para accesibilidad
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}
