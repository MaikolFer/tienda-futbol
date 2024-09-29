const productos = [
  { id: 1, nombre: "Camiseta Real Madrid", precio: 190.000, imagen: "img/real_madrid.webp" },
  { id: 2, nombre: "Camiseta Barcelona", precio: 130.000, imagen: "img/barcelona.jpg" },
  { id: 3, nombre: "Camiseta Man. United", precio: 180.000, imagen: "img/man_united.webp" },
  { id: 4, nombre: "Camiseta Arsenal", precio: 150.000, imagen: "img/arsenal.webp" },
  { id: 5, nombre: "Camiseta Liverpool", precio: 130.000, imagen: "img/liverpool.png" },
  { id: 6, nombre: "Camiseta Inter Miami", precio: 120.000, imagen: "img/inter_miami.webp" },
  { id: 7, nombre: "Camiseta Man. City", precio: 120.000, imagen: "img/man_city.webp" },
  { id: 8, nombre: "Camiseta Al-Nassr", precio: 200.000, imagen: "img/al_nassr.png" },
  { id: 9, nombre: "Camiseta Bayern", precio: 180.000, imagen: "img/bayern.jpg" },
  { id: 10, nombre: "Camiseta Chelsea", precio: 150.000, imagen: "img/chelsea.webp" }
];

let carrito = [];

function agregarAlCarrito(idProducto) {
  const cantidadInput = document.getElementById(`cantidad${idProducto}`);
  const cantidad = parseInt(cantidadInput.value);

  const producto = productos.find(prod => prod.id === idProducto);
  if (producto) {
      const productoEnCarrito = carrito.find(item => item.id === idProducto);
      if (productoEnCarrito) {
          productoEnCarrito.cantidad += cantidad;
      } else {

          carrito.push({ ...producto, cantidad });
      }
      console.log("Producto agregado al carrito:", producto);
      console.log("Carrito actual:", carrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
  } else {
      console.error("Producto no encontrado");
  }
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  const totalDiv = document.getElementById('total');
  carritoDiv.innerHTML = '';
  totalDiv.innerHTML = '';

  carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
      carritoDiv.innerHTML = '<p>El carrito está vacío</p>';
      document.getElementById('boton-comprar').style.display = 'none';
      return;
  } else {
      document.getElementById('boton-comprar').style.display = 'block';
  }

  carrito.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto-en-carrito');
      productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <label for="cantidadEliminar${producto.id}">Eliminar Cantidad:</label>
          <input type="number" id="cantidadEliminar${producto.id}" value="1" min="1" max="${producto.cantidad}">
          <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
      `;
      carritoDiv.appendChild(productoDiv);
  });

  const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function eliminarDelCarrito(idProducto) {
  const cantidadInput = document.getElementById(`cantidadEliminar${idProducto}`);
  const cantidadEliminar = parseInt(cantidadInput.value);

  const productoEnCarrito = carrito.find(producto => producto.id === idProducto);
  
  if (productoEnCarrito) {
      if (productoEnCarrito.cantidad > cantidadEliminar) {

          productoEnCarrito.cantidad -= cantidadEliminar;
      } else {
    
          carrito = carrito.filter(producto => producto.id !== idProducto);
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
  }
}

function realizarCompra() {
  if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos para comprar.");
      return;
  }

  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();

  const mensajeDiv = document.getElementById('mensaje-exito');
  mensajeDiv.style.display = 'block';
  mensajeDiv.innerHTML = '<h3>¡¡Tu compra se realizó exitosamente!!</h3>';
}

function mostrarProductos() {
  const productosDiv = document.getElementById('productos');
  
  productos.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <label for="cantidad${producto.id}">Cantidad:</label>
          <input type="number" id="cantidad${producto.id}" value="1" min="1">
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      productosDiv.appendChild(productoDiv);
  });
}

if (window.location.pathname === "/index.html") {
  mostrarProductos();
}

if (window.location.pathname.includes('carrito.html')) {
  mostrarCarrito();
}
