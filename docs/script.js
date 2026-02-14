document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');

    // Анимация букв в прелоадере
    const preloaderLetters = document.querySelectorAll('.preloader__text span');

    // После завершения анимации прелоадера
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }, 2000); // 3 секунды - время анимации прелоадера

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Анимация курсора
    function animateCursor() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // События курсора
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Эффекты при наведении на интерактивные элементы
    const hoverElements = document.querySelectorAll('a, button, .collection__item, .navbar__link');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });

    // Параллакс эффект для героя
    const heroImage = document.querySelector('.hero__image-inner');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
    });

    // Burger menu
    const burger = document.querySelector('.navbar__burger');
    const navbarMenu = document.querySelector('.navbar__menu');
    const navbarLinks = document.querySelectorAll('.navbar__link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Анимации при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.collection__item, .lookbook__content, .about__content, .newsletter__container');

        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                el.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке

    // Marquee animation
    const marqueeContent = document.querySelector('.marquee__content');
    const marqueeItems = document.querySelectorAll('.marquee__content span');

    // Клонируем элементы для бесконечной анимации
    marqueeItems.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeContent.appendChild(clone);
    });

    // Быстрый просмотр в коллекции
    const quickViewButtons = document.querySelectorAll('.collection__item-button');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Здесь можно добавить модальное окно с деталями товара
            console.log('Quick view opened');
        });
    });

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Форма подписки
    const newsletterForm = document.querySelector('.newsletter__form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput.value && emailInput.value.includes('@')) {
                // Здесь можно добавить отправку формы или показать сообщение
                alert('Спасибо за подписку!');
                emailInput.value = '';
            } else {
                alert('Пожалуйста, введите корректный email');
            }
        });
    }

    // Инициализация анимаций GSAP (если подключена библиотека)
    if (typeof gsap !== 'undefined') {
        // Анимация заголовка героя
        gsap.from('.hero__title-line span', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Анимация остальных элементов героя
        gsap.from('.hero__subtitle', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.7,
            ease: 'power3.out'
        });

        gsap.from('.hero__button', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: 'power3.out'
        });

        gsap.from('.hero__image-inner', {
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            ease: 'power3.out'
        });
    }
});

// Ресайз и адаптивность
window.addEventListener('resize', function() {
    // Проверяем ширину экрана и при необходимости меняем поведение элементов
    if (window.innerWidth < 1024) {
        // Мобильные стили
    } else {
        // Десктопные стили
    }
});

// Админ-панель
const adminPanel = document.querySelector('.admin-panel');
const adminToggle = document.querySelector('.admin-toggle');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const addProductForm = document.getElementById('add-product-form');
const productsList = document.getElementById('products-list');

// Переключение админ-панели
adminToggle.addEventListener('click', (e) => {
    e.preventDefault();
    adminPanel.classList.toggle('active');
});

// Переключение табов
adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabId = tab.getAttribute('data-tab') + '-tab';
        adminTabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Добавление товара
addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addProductForm);

    try {
        // В реальном проекте здесь будет запрос к серверу
        const product = {
            id: Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            category: formData.get('category'),
            images: [] // Здесь будут URL изображений
        };

        // Сохраняем товар в localStorage (временное решение)
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        // Очищаем форму
        addProductForm.reset();

        // Обновляем список товаров
        loadProducts();

        alert('Товар успешно добавлен!');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при добавлении товара');
    }
});

// Загрузка товаров
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    productsList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.images[0] || 'assets/placeholder.jpg'}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>${product.price} ₽</p>
            <p>Категория: ${getCategoryName(product.category)}</p>
            <div class="product-card-actions">
                <button class="edit-product" data-id="${product.id}">Редактировать</button>
                <button class="delete-product" data-id="${product.id}">Удалить</button>
            </div>
        `;
        productsList.appendChild(productCard);
    });

    // Обработчики для кнопок
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteProduct(id);
        });
    });
}

function getCategoryName(category) {
    switch(category) {
        case 'collection': return 'Коллекция';
        case 'lookbook': return 'Lookbook';
        case 'sale': return 'SALE';
        default: return category;
    }
}

function deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProducts();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Добавьте в script.js
const navbarSearch = document.createElement('div');
navbarSearch.className = 'navbar__search';
navbarSearch.innerHTML = `
    <input type="text" placeholder="Поиск..." class="navbar__search-input">
    <button class="navbar__search-button"><i class="fas fa-search"></i></button>
`;

// Замените существующую иконку поиска
const searchIcon = document.querySelector('.navbar__icon .fa-search').closest('a');
searchIcon.replaceWith(navbarSearch);

// Переключение поиска
const searchButton = document.querySelector('.navbar__search-button');
searchButton.addEventListener('click', () => {
    navbarSearch.classList.toggle('active');
    if (navbarSearch.classList.contains('active')) {
        document.querySelector('.navbar__search-input').focus();
    }
});

// Поиск товаров
const searchInput = document.querySelector('.navbar__search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products')) || [];

    const results = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    // Отобразите результаты поиска
    console.log(results); // В реальном проекте создайте отдельную страницу/модальное окно для результатов
});

// Корзина (добавьте в конец файла script.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');

    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Инициализация корзины при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    // Обработчик для иконки корзины в навигации
    const cartIcon = document.querySelector('.navbar__icon .fa-shopping-bag');
    if (cartIcon) {
        cartIcon.closest('a').addEventListener('click', function(e) {
            e.preventDefault();
            // Здесь можно добавить переход на страницу корзины
            window.location.href = 'cart.html';
        });
    }
});

function changeSpeed(selector, duration) {
            const ticker = document.querySelector(selector);
            ticker.style.animationDuration = duration + 's';
        }

// Проверка поддержки JS
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
