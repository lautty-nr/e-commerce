document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  
  // activar el menu desplegable
  const menuBtn = document.getElementById('menuBtn');
  const menuDropdown = document.getElementById('menuDropdown');
  
  menuBtn.addEventListener('click', function() {
    menuDropdown.classList.toggle('show');
  });
  
  // Cerrar el menu al hacer click fuera de el
  document.addEventListener('click', function(event) {
    if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
      menuDropdown.classList.remove('show');
    }
  });
  
  // Activar o desactivar el menu de horarios
  const hoursBtn = document.getElementById('hoursBtn');
  const hoursDropdown = document.getElementById('hoursDropdown');
  
  hoursBtn.addEventListener('click', function() {
    hoursDropdown.classList.toggle('show');
  });
  
  // Activar o desactivar
  const searchBtn = document.getElementById('searchBtn');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const closeSearch = document.getElementById('closeSearch');
  
  searchBtn.addEventListener('click', function() {
    searchContainer.classList.toggle('show');
    if (searchContainer.classList.contains('show')) {
      searchInput.focus();
    }
  });
  
  closeSearch.addEventListener('click', function() {
    searchContainer.classList.remove('show');
  });
  
  document.addEventListener('click', function(event) {
    if (!searchBtn.contains(event.target) && !searchContainer.contains(event.target)) {
      searchContainer.classList.remove('show');
    }
  });
  
  // Funcionalidad de busqueda
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length < 2) {
      document.getElementById('searchResults').innerHTML = '';
      return;
    }
    
    // Combinar todos los productos para la busqueda
    const allProducts = [...pizzas, ...empanadas, ...beverages];
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      (product.ingredients && product.ingredients.toLowerCase().includes(query))
    );
    
    renderSearchResults(results);
  });
  
  // Navegacion entre paginas
  const pages = document.querySelectorAll('.page-content');
  const navLinks = document.querySelectorAll('[data-page]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      
      pages.forEach(page => {
        page.classList.remove('active');
      });
      
      document.getElementById(targetPage).classList.add('active');
      
      // Cerrar el menu desplegable despues de la navegacion
      menuDropdown.classList.remove('show');
      
      // Desplazarse al principio para cambiar de pagina
      window.scrollTo(0, 0);
    });
  });
  
  // Boton de regreso a la pagina de inicio en el carrito
  document.getElementById('backToHome').addEventListener('click', function() {
    pages.forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById('home').classList.add('active');
    window.scrollTo(0, 0);
  });
  
  // Funcionalidad de regreso a la pagina de inicio
  const backButtons = document.querySelectorAll('.back-to-home');
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      pages.forEach(page => {
        page.classList.remove('active');
      });
      document.getElementById('home').classList.add('active');
      window.scrollTo(0, 0);
    });
  });
  
  // Alternar metodo de pago
  const creditCardRadio = document.getElementById('creditCard');
  const mercadoPagoRadio = document.getElementById('mercadoPago');
  const cardDetails = document.getElementById('cardDetails');
  
  creditCardRadio.addEventListener('change', function() {
    if (this.checked) {
      cardDetails.style.display = 'block';
    }
  });
  
  mercadoPagoRadio.addEventListener('change', function() {
    if (this.checked) {
      cardDetails.style.display = 'none';
    }
  });
  
  // Envio de formulario de pago
  document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar el estado de carga
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner"></div>';
    submitBtn.disabled = true;
    
    // Simular el proceso de pago
    setTimeout(() => {
      alert('El pago se esta procesando');
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1500);
  });
  
  // Datos de los productos
 const pizzas = [
    {
      id: 1,
      name: 'Pizza Muzza',
      price: 15000,
      ingredients: 'Salsa de tomate, mozzarella',
      image: 'img/muzza.jpeg'
    },
    {
      id: 2,
      name: 'Pizza Muzza + dos faina',
      price: 16000,
      ingredients: 'Salsa de tomate, mozzarella, dos faina',
      image: 'img/muzza-faina.jpeg'
    },
    {
      id: 3,
      name: 'Pizza Jamon',
      price: 17000,
      ingredients: 'Salsa de tomate, mozzarella, jamón',
      image: 'img/jamon.jpeg'
    },
    {
      id: 4,
      name: 'Pizza Jamon y morrones',
      price: 19000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, morrones',
      image: 'img/jamon-morron.jpeg'
    },
    {
      id: 5,
      name: 'Pizza Ananá',
      price: 19000,
      ingredients: 'Mozzarella, jamón, ananá. azucar negra',
      image: 'img/anana.jpeg'
    },
    {
      id: 6,
      name: 'Pizza Napolitana',
      price: 17000,
      ingredients: 'Salsa de tomate, mozzarella, tomates en rodajas, ajo picado, aceite de oliva ',
      image: 'img/napolitana.jpeg'
    },
    {
      id: 7,
      name: 'Pizza Napolitana con jamón',
      price: 18000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, tomates en rodajas, ajo picado, aceite de oliva',
      image: 'img/napolitana-jamon.jpeg'
    },
    {
      id: 8,
      name: 'Pizza Napolitana especial',
      price: 19000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, huevo picado tmates en rodajas, ajo picado, aceite de oliva',
      image: 'img/napolitana-especial.jpeg'
    },
    {
      id: 9,
      name: 'Pizza Palmitos',
      price: 19000,
      ingredients: 'Salsa de tomate, mozzarella, palmitos, salsa golf',
      image: 'img/palmitos.jpeg'
    },
    {
      id: 10,
      name: 'Pizza Fugazza',
      price: 8000,
      ingredients: 'Masa con cebolla, condimentos',
      image: 'img/fugazza.jpeg'
    },
    {
      id: 11,
      name: 'Pizza Fugazzetta',
      price: 22000,
      ingredients: 'Masa rellena con muzzarella, jamón, superficie de cebolla',
      image: 'img/fugazzeta.jpeg'
    },
    {
      id: 12,
      name: 'Pizza Fugazzettta super',
      price: 23000,
      ingredients: 'Masa rellena con muzzarella, jamón, tomates en rodajas, superficie de cebolla, provolone rallado',
      image: 'img/fugazzeta.jpeg'
    },
    {
      id: 13,
      name: 'Pizza de Palmitos con jamón',
      price: 21000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, palmitos, salsa golf',
      image: 'img/palmitos-jamon.jpeg'
    },
    {
      id: 14,
      name: 'Pizza Primavera',
      price: 18000,
      ingredients: 'Dos porciones de muzzarella, dos porciones de napolitan, dos porciones de jamón y morrones, dos porciones de americana',
      image: 'img/cuatro-estaciones.jpeg'
    },
    {
      id: 15,
      name: 'Pizza Americana',
      price: 15000,
      ingredients: 'Salsa de tomate, mozzarella, cebolla',
      image: 'img/americana.jpeg'
    },
    {
      id: 16,
      name: 'Pizza Calabresa',
      price: 19000,
      ingredients: 'Salsa de tomate, mozzarella, longaniza en rodajas',
      image: 'img/calabresa.jpeg'
    },
    {
      id: 17,
      name: 'Pizza Roquefort',
      price: 19000,
      ingredients: 'Salsa de tomate, mozzarella, roquefort',
      image: 'img/roquefort.jpeg'
    },
    {
      id: 18,
      name: 'Pizza Provolone',
      price: 20000,
      ingredients: 'Salsa de tomate, mozzarella, provolone en rodajas',
      image: 'img/provolone.jpeg'
    },
    {
      id: 19,
      name: 'Pizza Cuatro quesos',
      price: 22000,
      ingredients: 'Salsa de tomate, mozzarella, roquefort, provolone',
      image: 'img/cuatro-quesos.jpeg'
    },
    {
      id: 20,
      name: 'Pizza Cancha',
      price: 8000,
      ingredients: 'Salsa de tomate, ajo picado, aceite de oliva',
      image: 'img/cancha.jpeg'
    },
    {
      id: 21,
      name: 'Pizza Especial "Bonita"',
      price: 23000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, huevo duro, morrón, palmitos',
      image: 'img/bonita.jpeg'
    },
    {
      id: 22,
      name: 'Pizza Especial "JU JU"',
      price: 20000,
      ingredients: 'Salsa de tomate, mozzarella, jamón, huevo duro, morrón',
      image: 'img/juju.jpeg'
    },
    {
      id: 23,
      name: 'Super Calzon',
      price: 25000,
      ingredients: 'Mozzarella, tomates en rodajas, jamón, palmitos, huevo duro, morrón',
      image: 'img/calzon.jpeg'
    },
    {
      id: 24,
      name: 'Pizza Cuatro estaciones',
      price: 24000,
      ingredients: 'Dos porciones de napolitana especial, dos porciones de jamón y morrón, dos porciones de roquefort, dos porciones de palmitos',
      image: 'img/cuatro-estaciones.jpeg'
    },
  ];
  
  const empanadas = [
    {
      id: 101,
      name: 'Empanada de Carne cortada a cuchillo',
      price: 2000,
      image: 'img/empanada-carne.jpeg'
    },
    {
      id: 102,
      name: 'Empanada de Jamón y Queso',
      price: 2000,
      image: 'img/empanada-jyq.jpeg'
    },
    {
      id: 103,
      name: 'Empanada de Pollo',
      price: 2000,
      image: 'img/empanada-pollo.jpeg'
    },
    {
      id: 104,
      name: 'Empanada de Tomate, muzzarella y albahaca',
      price: 2000,
      image: 'img/empanada-tomate.jpeg'
    },
  ];
  
  const beverages = [
    {
      id: 201,
      name: 'Coca-Cola 1,5L',
      price: 4500,
      image: 'img/coca-cola1,5l.jpeg'
    },
    {
      id: 202,
      name: 'Levite pomelo 1,5L',
      price: 3500,
      image: 'img/levite_pomelo1,5l.jpg'
    },
    {
      id: 203,
      name: 'Coca-Cola 500ml',
      price: 2600,
      image: 'img/Coca-cola500ml.jpg'
    },
    {
      id: 204,
      name: 'Sprite 500ml',
      price: 2300,
      image: 'img/sprite500ml.jpeg'
    },
    {
      id: 205,
      name: 'Coca-Cola 380ml',
      price: 1200,
      image: 'img/coca-cola380ml.jpg'
    },
    {
      id: 206,
      name: 'Sprite 380ml',
      price: 1150,
      image: 'img/sprite380ml.jpg'
    },
    {
      id: 207,
      name: 'Agua mineral 500ml',
      price: 2000,
      image: 'img/agua_mineral500ml.jpg'
    },
    {
      id: 208,
      name: 'Aquarius manzana 500ml',
      price: 2500,
      image: 'img/aquarius_manzana500ml.jpg'
    },
    {
      id: 209,
      name: 'Aquarius pomelo 500ml',
      price: 2500,
      image: 'img/aquarius_pomelo500ml.jpg'
    },
    {
      id: 210,
      name: 'Amstel 710ml',
      price: 3600,
      image: 'img/amstel710ml.jpg'
    },
    {
      id: 211,
      name: 'Schneider 710ml',
      price: 3700,
      image: 'img/heineken710ml.jpg'
    },
    {
      id: 212,
      name: 'Heineken 380ml',
      price: 2500,
      image: 'img/heineken380ml.jpg'
    },
    {
      id: 213,
      name: 'Imperial negra 500ml',
      price: 2800,
      image: 'img/imperial500ml.jpg'
    },
    {
      id: 214,
      name: 'Heineken sin alcohol 500ml',
      price: 2500,
      image: 'img/heineken_sin_alcohol500ml.jpg'
    },
  ];
  
  // Renderizar productos
  function renderPizzas() {
    const container = document.getElementById('pizzaContainer');
    container.innerHTML = '';
    
    pizzas.forEach(pizza => {
      const pizzaCard = createProductCard(pizza);
      container.appendChild(pizzaCard);
    });
  }
  
  function renderEmpanadas() {
    const container = document.getElementById('empanadasContainer');
    container.innerHTML = '';
    
    empanadas.forEach(empanada => {
      const empanadaCard = createProductCard(empanada);
      container.appendChild(empanadaCard);
    });
  }
  
  function renderBeverages() {
    const container = document.getElementById('beveragesContainer');
    container.innerHTML = '';
    
    beverages.forEach(beverage => {
      const beverageCard = createProductCard(beverage);
      container.appendChild(beverageCard);
    });
  }
  
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
    
    const isPizza = product.id < 100;
    
    let cardContent = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold text-sand-800">${product.name}</h3>
        <p class="text-sand-600 font-medium mt-1">$${product.price.toFixed(2)}</p>
    `;
    
    if (isPizza && product.ingredients) {
      cardContent += `<p class="text-sand-500 text-sm mt-2">${product.ingredients}</p>`;
    }
    
    cardContent += `
        <button class="add-to-cart-btn mt-3 w-full bg-sand-500 text-white py-2 rounded hover:bg-sand-600 transition" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
          <i class="fas fa-cart-plus mr-2"></i>Añadir al Carrito
        </button>
      </div>
    `;
    
    card.innerHTML = cardContent;
    
    // Añadir detector de eventos al boton (funcionalidad especial)
    card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
      addToCart({
        id: this.getAttribute('data-id'),
        name: this.getAttribute('data-name'),
        price: parseFloat(this.getAttribute('data-price')),
        image: this.getAttribute('data-image'),
        quantity: 1
      });
    });
    
    return card;
  }
  
  function renderSearchResults(results) {
    const container = document.getElementById('searchResults');
    container.innerHTML = '';
    
    if (results.length === 0) {
      container.innerHTML = '<p class="text-sand-500 text-center py-3">No se encontraron productos</p>';
      return;
    }
    
    results.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.className = 'flex items-center p-2 border-b border-sand-100 hover:bg-sand-50';
      
      resultItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
        <div class="ml-3 flex-grow">
          <p class="text-sand-800 font-medium">${product.name}</p>
          <p class="text-sand-600 text-sm">$${product.price.toFixed(2)}</p>
        </div>
        <button class="add-to-cart-btn text-sand-500 hover:text-sand-700" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
          <i class="fas fa-plus-circle"></i>
        </button>
      `;
      
      resultItem.querySelector('.add-to-cart-btn').addEventListener('click', function() {
        addToCart({
          id: this.getAttribute('data-id'),
          name: this.getAttribute('data-name'),
          price: parseFloat(this.getAttribute('data-price')),
          image: this.getAttribute('data-image'),
          quantity: 1
        });
      });
      
      container.appendChild(resultItem);
    });
  }
  
  // Funciones del carrito
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar la interfaz de usuario
    updateCartCount();
    renderCartItems();
    
    // Mostrar confirmacion
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'fixed bottom-4 right-4 bg-sand-800 text-white px-4 py-2 rounded shadow-lg z-50';
    confirmationDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${product.name} agregado al carrito`;
    document.body.appendChild(confirmationDiv);
    
    setTimeout(() => {
      confirmationDiv.remove();
    }, 2000);
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
  }
  
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center text-sand-500 py-8">Tu carrito está vacío</p>';
      subtotalElement.textContent = '$0.00';
      shippingElement.textContent = '$0.00';
      totalElement.textContent = '$0.00';
      return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'flex items-center border-b border-sand-100 py-4';
      
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="ml-4 flex-grow">
          <h4 class="text-sand-800 font-medium">${item.name}</h4>
          <p class="text-sand-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="text-right">
          <p class="font-medium text-sand-800">$${itemTotal.toFixed(2)}</p>
          <div class="flex items-center mt-1">
            <button class="decrease-qty text-sand-500 hover:text-sand-700" data-id="${item.id}">
              <i class="fas fa-minus-circle"></i>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="increase-qty text-sand-500 hover:text-sand-700" data-id="${item.id}">
              <i class="fas fa-plus-circle"></i>
            </button>
            <button class="remove-item ml-3 text-sand-500 hover:text-sand-700" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItem);
      
      // Añadir detectores de eventos a los botones
      cartItem.querySelector('.decrease-qty').addEventListener('click', function() {
        decreaseQuantity(this.getAttribute('data-id'));
      });
      
      cartItem.querySelector('.increase-qty').addEventListener('click', function() {
        increaseQuantity(this.getAttribute('data-id'));
      });
      
      cartItem.querySelector('.remove-item').addEventListener('click', function() {
        removeItem(this.getAttribute('data-id'));
      });
    });
    
    // Calcular envio y costo de envio
    const shipping = subtotal > 0 ? 3500 : 0;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeItem(id);
      return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }
  
  function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    item.quantity += 1;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }
  
  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }
  
  // Inicializar la pagina
  renderPizzas();
  renderEmpanadas();
  renderBeverages();
  renderCartItems();
  
  // Añadir detectores de eventos para los botones de menu del dia y promociones para añadir al carrito
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      if (this.hasAttribute('data-id') && this.hasAttribute('data-name') && 
          this.hasAttribute('data-price') && this.hasAttribute('data-image')) {
        addToCart({
          id: this.getAttribute('data-id'),
          name: this.getAttribute('data-name'),
          price: parseFloat(this.getAttribute('data-price')),
          image: this.getAttribute('data-image'),
          quantity: 1
        });
      }
    });
  });
  
  // Simulacion del envio de formulario de reserva
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Obtener valores del formulario
      const name = document.getElementById('reservation-name').value;
      const email = document.getElementById('reservation-email').value;
      const date = document.getElementById('reservation-date').value;
      const time = document.getElementById('reservation-time').value;
      const guests = document.getElementById('reservation-guests').value;
      const notes = document.getElementById('reservation-notes').value;
      
      // Construir la estructura del correo electronico
      const emailSubject = encodeURIComponent(`Nueva Reserva: ${name}`);
      const emailBody = encodeURIComponent(
        `Detalles de la Reserva:\n\n` +
        `Nombre: ${name}\n` +
        `Email: ${email}\n` +
        `Fecha: ${date}\n` +
        `Hora: ${time}\n` +
        `Personas: ${guests}\n` +
        `Notas adicionales: ${notes || 'Ninguna'}\n\n` +
        `Reserva realizada a través del sitio web de Bahia Bonita.`
      );
      
      // Mostrar mensaje de confirmacion de reserva
      const confirmDiv = document.createElement('div');
      confirmDiv.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-md';
      confirmDiv.innerHTML = `
        <p class="font-medium">¡Reserva recibida!</p>
        <p>Gracias ${name}, hemos recibido tu solicitud de reserva para el ${date} a las ${time}.</p>
        <p class="mt-2">Te enviaremos un email de confirmación en breve.</p>
        <p class="mt-2 text-sm">En un entorno de producción, esta información sera caga en nuestro sistema.</p>
      `;
      
      // Remplazar el formulario por la confirmacion
      this.innerHTML = '';
      this.appendChild(confirmDiv);
      
      // Mediante un script del lado del servidor (no tenemos)
      // Para demostracion, mostramos una confirmacion y un enlace mailto
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:lopezmica499@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      mailtoLink.className = 'inline-block mt-4 text-sand-600 hover:text-sand-800';
      mailtoLink.innerHTML = '<i class="fas fa-envelope mr-2"></i>Simular envío de email';
      
      confirmDiv.appendChild(mailtoLink);
    });
  }
});