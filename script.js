// Улучшенный JavaScript для сайта "Овощи и Фрукты"

document.addEventListener('DOMContentLoaded', function() {
    
    // Плавная прокрутка
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.category-card, .product-card, .feature, .delivery-feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };

    // Добавьте этот код в начало файла script.js, после DOMContentLoaded

// Сохранение позиции прокрутки перед уходом со страницы
function saveScrollPosition() {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition);
    sessionStorage.setItem('lastVisitedPage', window.location.pathname.split('/').pop() || 'index.html');
}

// Восстановление позиции прокрутки при загрузке страницы
function restoreScrollPosition() {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    const lastPage = sessionStorage.getItem('lastVisitedPage');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Если мы вернулись на ту же страницу, откуда ушли, и есть сохраненная позиция
    if (lastPage === currentPage && savedPosition) {
        setTimeout(() => {
            window.scrollTo({
                top: parseInt(savedPosition),
                behavior: 'smooth'
            });
            // Очищаем сохраненную позицию после восстановления
            sessionStorage.removeItem('scrollPosition');
        }, 300); // Небольшая задержка для полной загрузки DOM
    }
}

// Переопределяем все ссылки для сохранения позиции
function initScrollPositionSaving() {
    // Для всех ссылок, которые ведут на другие страницы сайта
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Исключаем якорные ссылки (#) и внешние ссылки
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('https')) {
            link.addEventListener('click', function(e) {
                saveScrollPosition();
            });
        }
    });
    
    // Для кнопок с onclick, которые ведут на другие страницы
    document.querySelectorAll('[onclick*="window.location.href"]').forEach(element => {
        const originalOnClick = element.onclick;
        element.onclick = function(e) {
            saveScrollPosition();
            if (originalOnClick) {
                originalOnClick.call(this, e);
            }
        };
    });
    
    // Для форм с отправкой
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            saveScrollPosition();
        });
    });
}

// Переопределяем функцию addToCart для кнопок "В корзину" на главной
window.addToCart = function(id, name, price) {
    // Сохраняем позицию перед действием
    saveScrollPosition();
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id, 
            name, 
            price, 
            quantity: 1,
            image: getProductImageById(id)
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик корзины
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
    
    // Меняем кнопку на "Перейти в корзину"
    const button = event.currentTarget;
    button.innerHTML = '<i class="fas fa-shopping-basket"></i> Перейти';
    button.classList.add('in-cart');
    button.onclick = function() {
        saveScrollPosition();
        window.location.href = 'cart.html';
    };
    
    showNotification(`✓ ${name} добавлен в корзину`);
}

// Вспомогательная функция для получения изображения товара
function getProductImageById(id) {
    const images = {
        1: 'img/prod_strawberry.png',
        2: 'img/prod_carr.png',
        3: 'img/prod_grape.png',
        4: 'img/prod_kukuruz.png',
        5: 'img/prod_nut.png',
        6: 'img/prod_banana.png',
        7: 'img/prod_cucumber.png',
        8: 'img/prod_avak.png'
    };
    return images[id] || '';
}

// Обновляем функцию showNotification, чтобы она была доступна глобально
window.showNotification = function(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Восстанавливаем позицию прокрутки
    restoreScrollPosition();
    
    // Инициализируем сохранение позиции для всех ссылок
    initScrollPositionSaving();
    
    // Обновляем состояние кнопок на главной странице
    updateMainPageButtons();
    
    // ... остальной существующий код ...
});

// Функция для обновления кнопок на главной странице при загрузке
function updateMainPageButtons() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    document.querySelectorAll('.btn-product').forEach(button => {
        // Получаем ID товара из onclick атрибута
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/addToCart\((\d+)/);
            if (match) {
                const productId = parseInt(match[1]);
                const isInCart = cart.some(item => item.id === productId);
                
                if (isInCart) {
                    const productName = button.closest('.product-card')?.querySelector('.product-name')?.textContent || 'Товар';
                    button.innerHTML = '<i class="fas fa-shopping-basket"></i> Перейти';
                    button.classList.add('in-cart');
                    button.onclick = function() {
                        saveScrollPosition();
                        window.location.href = 'cart.html';
                    };
                }
            }
        }
    });
}
    
    // Добавляем класс для анимации
    document.querySelectorAll('.category-card, .product-card, .feature, .delivery-feature').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Запускаем анимацию
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Первый запуск
    
    // Добавление товара в корзину
    const addToCartButtons = document.querySelectorAll('.btn-product');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Анимация кнопки
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
            this.style.backgroundColor = '#4CAF50';
            this.style.color = 'white';
            this.style.borderColor = '#4CAF50';
            
            // Восстановление через 2 секунды
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
            
            // Уведомление
            showNotification(`${productName} добавлен в корзину!`);
        });
    });
    
    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Удаление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Стили для анимации уведомления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Manrope', sans-serif;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    
    // Форма подписки
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if(email && validateEmail(email)) {
                showNotification('Спасибо за подписку!');
                emailInput.value = '';
            } else {
                showNotification('Пожалуйста, введите корректный email');
            }
        });
    }
    
    // Контактная форма
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if(!name || !email || !message) {
                showNotification('Пожалуйста, заполните все поля');
                return;
            }
            
            if(!validateEmail(email)) {
                showNotification('Пожалуйста, введите корректный email');
                return;
            }
            
            showNotification('Спасибо! Ваше сообщение отправлено');
            this.reset();
        });
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Активное меню при прокрутке
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightMenu() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenu);
    
    // Обновление года в футере
    const yearElement = document.querySelector('.footer-bottom p');
    if(yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2024', new Date().getFullYear());
    }

    // Анимация для главного экрана
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '0';
    heroSection.style.transition = 'opacity 1s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 300);
    });
}

// Параллакс эффект для главного экрана
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Плавное появление элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.category-card, .product-card, .feature, .delivery-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


});
// JavaScript для слайдера с изменением картинки
document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        {
            title: 'ЛЕТНИЕ ЯГОДЫ',
            subtitle: 'Собранные утром, у вас на столе вечером.',
            btnText: 'НАСЛАДИТЬСЯ ВКУСОМ',
            image: 'img/yafody.png'
        },
        {
            title: 'СПЕЛАЯ МАЛИНА',
            subtitle: 'Сладкая и ароматная, прямо с куста.',
            btnText: 'В КАТАЛОГ',
            image: 'img/malina.webp'
        },
        {
            title: 'ЛЕСНАЯ ЧЕРНИКА',
            subtitle: 'Полезные ягоды для вашего здоровья.',
            btnText: 'ЗАКАЗАТЬ',
            image: 'img/blue.jpg'
        }
    ];
    
    let currentSlide = 0;
    const titleEl = document.querySelector('.slider-title');
    const subtitleEl = document.querySelector('.slider-subtitle');
    const btnEl = document.querySelector('.slider-btn');
    const imageEl = document.querySelector('.slider-image img');
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    const dots = document.querySelectorAll('.dot');
    
    function updateSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        const slide = slides[index];
        
        // Плавное исчезновение
        titleEl.style.opacity = '0';
        subtitleEl.style.opacity = '0';
        btnEl.style.opacity = '0';
        imageEl.style.opacity = '0';
        
        setTimeout(() => {
            // Обновляем контент
            titleEl.textContent = slide.title;
            subtitleEl.textContent = slide.subtitle;
            btnEl.textContent = slide.btnText;
            imageEl.src = slide.image;
            
            // Плавное появление
            titleEl.style.opacity = '1';
            subtitleEl.style.opacity = '1';
            btnEl.style.opacity = '1';
            imageEl.style.opacity = '1';
        }, 300);
        
        // Обновляем точки
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlide = index;
    }
    
    // Добавляем стили для плавности
    titleEl.style.transition = 'opacity 0.3s ease';
    subtitleEl.style.transition = 'opacity 0.3s ease';
    btnEl.style.transition = 'opacity 0.3s ease';
    imageEl.style.transition = 'opacity 0.3s ease';
    
    // Обработчики кнопок
    leftArrow.addEventListener('click', function(e) {
        e.preventDefault();
        updateSlide(currentSlide - 1);
    });
    
    rightArrow.addEventListener('click', function(e) {
        e.preventDefault();
        updateSlide(currentSlide + 1);
    });
    
    // Обработчики точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateSlide(index);
        });
    });
    
    // Показываем первый слайд
    updateSlide(0);
});