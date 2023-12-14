const listaCarrito = document.getElementById('listaCarrito');
const listaProductos = document.getElementById('listaProductos');
const totalPagar= document.getElementById('total');
const productos = [
    { id: 1, nombre: 'agua', precio: 1000 },
    { id: 2, nombre: 'gaseosa', precio: 2000 },
    { id: 3, nombre: 'papas', precio: 3000 },
    ];
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="agregar" data-id="${producto.id}">agregar</button>
        `;
        listaProductos.appendChild(li);
    });
    listaProductos.addEventListener('click', e => {
        if (e.target.classList.contains('agregar')) {
            const productoId = parseInt(e.target.dataset.id);
            agregarCarrito(productoId);
        }
    });
    listaCarrito.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar')) {
            const productoId = parseInt(e.target.dataset.id);
            eliminarCarrito(productoId);
        } else if (e.target.classList.contains('cantidad')) {
            const productoId = parseInt(e.target.dataset.id);
            const nuevaCantidad = prompt('cantidad nueva :');
            modificarCantidad(productoId, nuevaCantidad);
}});
function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
      if (!producto) return;

    const carritoProducto = document.createElement('li');
    carritoProducto.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <input class="cantidad" type="number" value="1" data-id="${producto.id}">
        <button class="eliminar" data-id="${producto.id}">eliminar</button>
    `;
    listaCarrito.appendChild(carritoProducto);

    calcularTotal();
    }
function eliminarCarrito(id) {
    const productoEliminar = Array.from(listaCarrito.children).find(producto => parseInt(producto.querySelector('.eliminar').dataset.id) === id);
      if (productoEliminar) {
        listaCarrito.removeChild(productoEliminar);
        calcularTotal();
    }
    }
    function modificarCantidad(id, cantidad) {
        const totalCantidad = Array.from(listaCarrito.children).find(item => parseInt(item.querySelector('.cantidad').dataset.id) === id)?.querySelector('.cantidad');
        if (totalCantidad) {
            totalCantidad.value = cantidad;
            calcularTotal();
        }
    }

    function calcularTotal() {
        let total = 0;
        Array.from(listaCarrito.children).forEach(item => {
            const precio = parseInt(item.textContent.match(/\$(\d+)/)[1]);
            const cantidad = parseInt(item.querySelector('.cantidad').value);
            total += precio * cantidad;
        });
        totalPagar.textContent = total;
    }

;