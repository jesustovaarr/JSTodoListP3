document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const btn = document.getElementById('add');
    let id = 1; // Se inicializa un contador para los IDs únicos de las filas

    /**
     * Función para eliminar una tarea de la tabla.
     * @param {string} id - El ID de la fila (tr) que se va a eliminar.
     */
    function removeTodo(id) {
        // Busca el elemento por su ID y lo elimina del DOM
        document.getElementById(id).remove();
    }

    // Función para añadir una nueva tarea
    function addTodo() {
        // Valida que los campos no estén vacíos
        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = 'Title and description are required';
            return; // Detiene la ejecución si hay un error
        }

        // Si los campos son válidos, oculta la alerta
        alert.classList.add('d-none');
        
        // Inserta una nueva fila en la tabla
        const row = table.insertRow();
        // Asigna un ID único a la fila y luego incrementa el contador
        row.setAttribute('id', id++);
        
        // Añade el contenido HTML a la nueva fila (sin el botón de eliminar todavía)
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        // Crea el botón de eliminar de forma dinámica
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1'); // Se añade margen a la izquierda
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';

        // Asigna el evento onclick al botón de eliminar
        removeBtn.onclick = function(e) {
            removeTodo(row.getAttribute('id'));
        }
        // Añade el botón a la última celda (la de acciones)
        row.children[3].appendChild(removeBtn);
    }
    // Asigna la función addTodo al evento click del botón principal
    btn.onclick = addTodo;
});