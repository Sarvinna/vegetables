// catalog.js - Полнофункциональный JavaScript для каталога

class CatalogManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 15;
        this.sortBy = 'default';
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.showAllCategory = false;
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.initEventListeners();
        this.renderProducts();
        this.renderWeeklyProducts();
        this.updateCartCount();
        this.updateWishlistCount();
        this.initAnimations();
    }

    async loadProducts() {
        document.getElementById('loadingSpinner').style.display = 'block';
        await new Promise(resolve => setTimeout(resolve, 800));

        this.products = [
            // ===== ОВОЩИ =====
            {
                id: 1,
                name: 'Помидоры черри',
                category: 'vegetables',
                subcategory: 'tomatoes',
                price: 250,
                oldPrice: 320,
                image: 'img/cat_tomato.png',
                rating: 4.8,
                reviews: 124,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Россия'
            },
            {
                id: 2,
                name: 'Огурцы свежие',
                category: 'vegetables',
                subcategory: 'cucumbers',
                price: 180,
                oldPrice: null,
                image: 'img/cat_onion.png',
                rating: 4.7,
                reviews: 89,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 3,
                name: 'Морковь молодая',
                category: 'vegetables',
                subcategory: 'root',
                price: 120,
                oldPrice: 150,
                image: 'img/cat_carrot.png',
                rating: 4.9,
                reviews: 156,
                badge: 'Хит продаж',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 4,
                name: 'Перец болгарский',
                category: 'vegetables',
                subcategory: 'peppers',
                price: 350,
                oldPrice: 400,
                image: 'img/cat_pepper.png',
                rating: 4.8,
                reviews: 92,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '500г',
                country: 'Азербайджан'
            },
            {
                id: 5,
                name: 'Картофель молодой',
                category: 'vegetables',
                subcategory: 'root',
                price: 90,
                oldPrice: null,
                image: 'img/cat_potato.webp',
                rating: 4.6,
                reviews: 203,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '2кг',
                country: 'Россия'
            },
            {
                id: 6,
                name: 'Кабачки цукини',
                category: 'vegetables',
                subcategory: 'squash',
                price: 160,
                oldPrice: 200,
                image: 'img/cat_kabachok.jpg',
                rating: 4.7,
                reviews: 67,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 7,
                name: 'Баклажаны',
                category: 'vegetables',
                subcategory: 'squash',
                price: 190,
                oldPrice: null,
                image: 'img/cat_baklajan.png',
                rating: 4.5,
                reviews: 45,
                badge: null,
                inStock: true,
                isOrganic: false,
                weight: '1кг',
                country: 'Турция'
            },
            {
                id: 8,
                name: 'Тыква мускатная',
                category: 'vegetables',
                subcategory: 'squash',
                price: 280,
                oldPrice: 350,
                image: 'img/cat_pumpkin.webp',
                rating: 4.8,
                reviews: 34,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '1.5кг',
                country: 'Россия'
            },
            {
                id: 45,
                name: 'Редис',
                category: 'vegetables',
                subcategory: 'root',
                price: 110,
                oldPrice: null,
                image: 'img/cat_redis.webp',
                rating: 4.7,
                reviews: 56,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Россия'
            },
            {
                id: 46,
                name: 'Свекла',
                category: 'vegetables',
                subcategory: 'root',
                price: 80,
                oldPrice: null,
                image: 'img/cat_sekla.webp',
                rating: 4.6,
                reviews: 78,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 47,
                name: 'Лук репчатый',
                category: 'vegetables',
                subcategory: 'onions',
                price: 70,
                oldPrice: null,
                image: 'img/cat_onion.png',
                rating: 4.5,
                reviews: 112,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 48,
                name: 'Чеснок',
                category: 'vegetables',
                subcategory: 'onions',
                price: 250,
                oldPrice: 300,
                image: 'img/cat_garlic.png',
                rating: 4.9,
                reviews: 95,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Россия'
            },
            {
                id: 49,
                name: 'Капуста белокочанная',
                category: 'vegetables',
                subcategory: 'cabbage',
                price: 60,
                oldPrice: null,
                image: 'img/cat_cabbage.png',
                rating: 4.4,
                reviews: 67,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '2кг',
                country: 'Россия'
            },
            {
                id: 50,
                name: 'Брокколи',
                category: 'vegetables',
                subcategory: 'cabbage',
                price: 320,
                oldPrice: 380,
                image: 'img/cat_broccoli.png',
                rating: 4.8,
                reviews: 43,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Россия'
            },

            // ===== ФРУКТЫ =====
            {
                id: 9,
                name: 'Яблоки Голден',
                category: 'fruits',
                subcategory: 'apples',
                price: 220,
                oldPrice: 280,
                image: 'img/cat_golden_apple.jpg',
                rating: 4.9,
                reviews: 312,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 10,
                name: 'Бананы Эквадор',
                category: 'fruits',
                subcategory: 'bananas',
                price: 150,
                oldPrice: null,
                image: 'img/cat_banana.jpg',
                rating: 4.8,
                reviews: 445,
                badge: null,
                inStock: true,
                isOrganic: false,
                weight: '1кг',
                country: 'Эквадор'
            },
            {
                id: 11,
                name: 'Апельсины',
                category: 'fruits',
                subcategory: 'citrus',
                price: 280,
                oldPrice: 320,
                image: 'img/cat_orange.png',
                rating: 4.7,
                reviews: 178,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '1кг',
                country: 'Египет'
            },
            {
                id: 12,
                name: 'Груши Конференция',
                category: 'fruits',
                subcategory: 'pears',
                price: 320,
                oldPrice: 380,
                image: 'img/cat_konference_pear.jpg',
                rating: 4.9,
                reviews: 156,
                badge: 'Хит продаж',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Россия'
            },
            {
                id: 13,
                name: 'Киви',
                category: 'fruits',
                subcategory: 'exotic',
                price: 290,
                oldPrice: 350,
                image: 'img/cat_kiwi.png',
                rating: 4.8,
                reviews: 98,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '500г',
                country: 'Новая Зеландия'
            },
            {
                id: 14,
                name: 'Манго',
                category: 'fruits',
                subcategory: 'exotic',
                price: 450,
                oldPrice: 550,
                image: 'img/cat_mango.png',
                rating: 4.9,
                reviews: 67,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '1шт',
                country: 'Таиланд'
            },
            {
                id: 15,
                name: 'Ананас',
                category: 'fruits',
                subcategory: 'exotic',
                price: 380,
                oldPrice: 450,
                image: 'img/cat_pineapple.webp',
                rating: 4.8,
                reviews: 43,
                badge: null,
                inStock: true,
                isOrganic: false,
                weight: '1шт',
                country: 'Коста-Рика'
            },
            {
                id: 16,
                name: 'Гранат',
                category: 'fruits',
                subcategory: 'exotic',
                price: 260,
                oldPrice: 300,
                image: 'img/cat_granat.webp',
                rating: 4.7,
                reviews: 89,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Азербайджан'
            },
            {
                id: 51,
                name: 'Лимоны',
                category: 'fruits',
                subcategory: 'citrus',
                price: 190,
                oldPrice: null,
                image: 'img/cat_lemon.webp',
                rating: 4.7,
                reviews: 134,
                badge: null,
                inStock: true,
                isOrganic: false,
                weight: '500г',
                country: 'Турция'
            },
            {
                id: 52,
                name: 'Грейпфрут',
                category: 'fruits',
                subcategory: 'citrus',
                price: 230,
                oldPrice: 280,
                image: 'img/cat_grapefruit.webp',
                rating: 4.6,
                reviews: 67,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '1шт',
                country: 'Израиль'
            },
            {
                id: 53,
                name: 'Персики',
                category: 'fruits',
                subcategory: 'stone',
                price: 350,
                oldPrice: 400,
                image: 'img/cat_peach.jpeg',
                rating: 4.9,
                reviews: 89,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Узбекистан'
            },
            {
                id: 54,
                name: 'Нектарины',
                category: 'fruits',
                subcategory: 'stone',
                price: 360,
                oldPrice: null,
                image: 'img/cat_nektarine.png',
                rating: 4.8,
                reviews: 56,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '1кг',
                country: 'Узбекистан'
            },

            // ===== СУХОФРУКТЫ =====
            {
                id: 17,
                name: 'Курага',
                category: 'dried',
                subcategory: 'apricots',
                price: 550,
                oldPrice: 650,
                image: 'img/cat_kuraga.webp',
                rating: 4.9,
                reviews: 87,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Узбекистан'
            },
            {
                id: 18,
                name: 'Изюм черный',
                category: 'dried',
                subcategory: 'raisins',
                price: 380,
                oldPrice: null,
                image: 'img/cat_izyum.webp',
                rating: 4.8,
                reviews: 65,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Узбекистан'
            },
            {
                id: 19,
                name: 'Чернослив',
                category: 'dried',
                subcategory: 'prunes',
                price: 420,
                oldPrice: 500,
                image: 'img/cat_chernosliv.png',
                rating: 4.9,
                reviews: 92,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Молдова'
            },
            {
                id: 20,
                name: 'Финики',
                category: 'dried',
                subcategory: 'dates',
                price: 480,
                oldPrice: 550,
                image: 'img/cat_finiki.png',
                rating: 4.8,
                reviews: 134,
                badge: 'Хит продаж',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Иран'
            },
            {
                id: 21,
                name: 'Инжир сушеный',
                category: 'dried',
                subcategory: 'figs',
                price: 620,
                oldPrice: 700,
                image: 'img/cat_injir.avif',
                rating: 4.9,
                reviews: 56,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '400г',
                country: 'Турция'
            },
            {
                id: 22,
                name: 'Сушеные яблоки',
                category: 'dried',
                subcategory: 'apples',
                price: 320,
                oldPrice: 380,
                image: 'img/cat_dried_apple.jpg',
                rating: 4.7,
                reviews: 43,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Россия'
            },
            {
                id: 56,
                name: 'Сушеный манго',
                category: 'dried',
                subcategory: 'mango',
                price: 680,
                oldPrice: 800,
                image: 'img/cat_dried_mango.jpg',
                rating: 4.9,
                reviews: 67,
                badge: 'Хит продаж',
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Таиланд'
            },
            {
                id: 57,
                name: 'Клюква сушеная',
                category: 'dried',
                subcategory: 'berries',
                price: 580,
                oldPrice: 650,
                image: 'img/cat_klyukva.webp',
                rating: 4.8,
                reviews: 45,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Россия'
            },

            // ===== ОРЕХИ =====
            {
                id: 23,
                name: 'Грецкий орех',
                category: 'nuts',
                subcategory: 'walnuts',
                price: 780,
                oldPrice: 900,
                image: 'img/cat_nut.jpg',
                rating: 4.9,
                reviews: 178,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Чили'
            },
            {
                id: 24,
                name: 'Миндаль',
                category: 'nuts',
                subcategory: 'almonds',
                price: 850,
                oldPrice: 1000,
                image: 'img/cat_almond.webp',
                rating: 4.9,
                reviews: 145,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'США'
            },
            {
                id: 25,
                name: 'Кешью',
                category: 'nuts',
                subcategory: 'cashews',
                price: 920,
                oldPrice: 1100,
                image: 'img/cat_keshyu.jpg',
                rating: 4.8,
                reviews: 123,
                badge: 'Хит продаж',
                inStock: true,
                isOrganic: false,
                weight: '500г',
                country: 'Вьетнам'
            },
            {
                id: 26,
                name: 'Фундук',
                category: 'nuts',
                subcategory: 'hazelnuts',
                price: 890,
                oldPrice: null,
                image: 'img/cat_funduk.avif',
                rating: 4.8,
                reviews: 98,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Турция'
            },
            {
                id: 27,
                name: 'Фисташки',
                category: 'nuts',
                subcategory: 'pistachios',
                price: 1200,
                oldPrice: 1500,
                image: 'img/cat_fistashki.png',
                rating: 4.9,
                reviews: 167,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: false,
                weight: '400г',
                country: 'Иран'
            },
            {
                id: 28,
                name: 'Арахис',
                category: 'nuts',
                subcategory: 'peanuts',
                price: 350,
                oldPrice: 400,
                image: 'img/cat_arahis.jpg',
                rating: 4.7,
                reviews: 234,
                badge: null,
                inStock: true,
                isOrganic: true,
                weight: '500г',
                country: 'Китай'
            },
            {
                id: 58,
                name: 'Кедровые орехи',
                category: 'nuts',
                subcategory: 'pine',
                price: 1500,
                oldPrice: 1800,
                image: 'img/cat_kedr_oreh.webp',
                rating: 4.9,
                reviews: 87,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '200г',
                country: 'Россия'
            },
            {
                id: 59,
                name: 'Бразильский орех',
                category: 'nuts',
                subcategory: 'brazil',
                price: 1350,
                oldPrice: 1600,
                image: 'img/cat_brazil_oreh.jpg',
                rating: 4.8,
                reviews: 56,
                badge: 'Акция недели',
                inStock: true,
                isOrganic: true,
                weight: '300г',
                country: 'Бразилия'
            }
        ];

        this.filteredProducts = [...this.products];
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    // Метод для отображения товаров недели
    renderWeeklyProducts() {
        // Товары для первого ряда (из макета)
        const weeklyFirstRow = [
            {
                id: 3,
                name: 'Морковь',
                price: 120,
                image: 'img/prod_carr.png',
                rating: 5
            },
            {
                id: 2,
                name: 'Свежая Клубника',
                price: 500,
                image: 'img/prod_strawberry.png',
                rating: 4
            },
            {
                id: 4,
                name: 'Сладкая кукуруза',
                price: 350,
                image: 'img/prod_kukuruz.png',
                rating: 5
            }
        ];

        // Товары для второго ряда (из макета)
        const weeklySecondRow = [
            {
                id: 1,
                name: 'Свежий виноград',
                price: 250,
                image: 'img/prod_grape.png',
                rating: 4
            },
            {
                id: 6,
                name: 'Грецкий орех',
                price: 160,
                image: 'img/cat_nut.jpg',
                rating: 5
            },
            {
                id: 7,
                name: 'Зеленое авокадо',
                price: 190,
                image: 'img/prod_avak.png',
                rating: 4
            }
        ];

        const firstRowContainer = document.getElementById('weeklyProductsFirstRow');
        const secondRowContainer = document.getElementById('weeklyProductsSecondRow');

        firstRowContainer.innerHTML = weeklyFirstRow.map(product => this.createWeeklyCard(product)).join('');
        secondRowContainer.innerHTML = weeklySecondRow.map(product => this.createWeeklyCard(product)).join('');
    }

    createWeeklyCard(product) {
        const stars = this.getRatingStars(product.rating);
        const isInCart = this.cart.some(item => item.id === product.id);
        
        return `
            <div class="weekly-item">
                <div class="weekly-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <div class="weekly-price">${product.price}₽</div>
                <div class="weekly-rating">${stars}</div>
                <button class="btn-weekly add-to-cart ${isInCart ? 'in-cart' : ''}" data-id="${product.id}">
                    <i class="fas ${isInCart ? 'fa-shopping-basket' : 'fa-shopping-cart'}"></i>
                    ${isInCart ? 'Перейти' : 'В корзину'}
                </button>
            </div>
        `;
    }

    initEventListeners() {
        // Категории (табы)
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const category = tab.dataset.category;
                
                // Обновляем радио-кнопку в сайдбаре
                const radioBtn = document.querySelector(`input[name="category"][value="${category}"]`);
                if (radioBtn) radioBtn.checked = true;
                
                this.switchCategory(category);
            });
        });

        // Радио-кнопки категорий в сайдбаре
        document.querySelectorAll('input[name="category"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.switchCategory(e.target.value);
            });
        });

        // Сортировка
        document.getElementById('sortProducts')?.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.currentPage = 1;
            this.renderProducts();
        });

        // Фильтры - применяем по кнопке
        document.getElementById('applyFilters')?.addEventListener('click', () => {
            this.currentPage = 1;
            this.renderProducts();
        });

        // Поиск с задержкой
        let searchTimeout;
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentPage = 1;
                this.renderProducts();
            }, 300);
        });

        // Ценовой диапазон - отображение значения
        document.getElementById('priceRange')?.addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = `${e.target.value}₽`;
        });

        // Корзина и избранное (делегирование событий)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                const btn = e.target.closest('.add-to-cart');
                const productId = parseInt(btn.dataset.id);
                
                // Проверяем, есть ли товар в корзине
                const isInCart = this.cart.some(item => item.id === productId);
                
                if (isInCart) {
                    // Если товар уже в корзине, переходим на страницу корзины
                    window.location.href = 'cart.html';
                } else {
                    // Если товара нет в корзине, добавляем его
                    this.addToCart(productId);
                }
            }
            
            if (e.target.closest('.wishlist-btn')) {
                const btn = e.target.closest('.wishlist-btn');
                const productId = parseInt(btn.dataset.id);
                this.toggleWishlist(productId);
            }

            if (e.target.closest('.view-all-category')) {
                const btn = e.target.closest('.view-all-category');
                const category = btn.dataset.category;
                this.showAllCategoryItems(category);
            }
        });

        // Пагинация
        document.addEventListener('click', (e) => {
            if (e.target.closest('.page-link')) {
                e.preventDefault();
                const link = e.target.closest('.page-link');
                if (link.dataset.page) {
                    this.currentPage = parseInt(link.dataset.page);
                    this.renderProducts();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });

        // Сброс фильтров
        document.getElementById('resetFilters')?.addEventListener('click', () => {
            this.resetFilters();
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.showAllCategory = false;
        
        // Обновляем активный таб
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        // Обновляем заголовок
        this.updateCategoryTitle(category);
        
        // Рендерим товары
        this.renderProducts();
        
        // Показываем акционные товары для выбранной категории
        this.renderPromoProducts(category);
    }

    showAllCategoryItems(category) {
        this.currentCategory = category;
        this.showAllCategory = true;
        this.currentPage = 1;
        
        // Обновляем активный таб
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        // Обновляем радио-кнопку
        const radioBtn = document.querySelector(`input[name="category"][value="${category}"]`);
        if (radioBtn) radioBtn.checked = true;

        // Обновляем заголовок
        this.updateCategoryTitle(category);
        
        // Рендерим все товары категории
        this.renderProducts();
        
        // Показываем акционные товары для выбранной категории
        this.renderPromoProducts(category);
    }

    updateCategoryTitle(category) {
        const titles = {
            'all': 'Все товары',
            'vegetables': 'Овощи',
            'fruits': 'Фрукты',
            'dried': 'Сухофрукты',
            'nuts': 'Орехи'
        };
        
        const titleElement = document.getElementById('categoryTitle');
        if (titleElement) {
            titleElement.textContent = titles[category] || 'Каталог';
        }
    }

    filterProducts() {
        // Начинаем с товаров выбранной категории или всех
        let filtered;
        if (this.currentCategory === 'all') {
            filtered = [...this.products];
        } else {
            filtered = this.products.filter(p => p.category === this.currentCategory);
        }

        // Фильтр по наличию
        if (document.getElementById('inStockFilter')?.checked) {
            filtered = filtered.filter(p => p.inStock);
        }

        // Фильтр по органическим
        if (document.getElementById('organicFilter')?.checked) {
            filtered = filtered.filter(p => p.isOrganic);
        }

        // Фильтр по цене
        const maxPrice = parseInt(document.getElementById('priceRange')?.value) || 2000;
        filtered = filtered.filter(p => p.price <= maxPrice);

        // Поиск
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.country.toLowerCase().includes(searchTerm)
            );
        }

        // Сортировка
        switch(this.sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const filtered = this.filterProducts();
        const totalItems = filtered.length;
        
        // Определяем, показывать ли все товары или только 15
        const showLimited = !this.showAllCategory && this.currentCategory !== 'all' && totalItems > this.itemsPerPage;
        const itemsToShow = showLimited ? filtered.slice(0, this.itemsPerPage) : filtered;

        if (itemsToShow.length === 0) {
            grid.innerHTML = this.getEmptyStateHTML();
        } else {
            grid.innerHTML = itemsToShow.map(product => this.createProductCard(product)).join('');
            
            // Добавляем кнопку "Показать все" если нужно
            if (showLimited) {
                grid.innerHTML += this.getViewAllButtonHTML(this.currentCategory, totalItems);
            }
        }

        // Для категории "Все" используем пагинацию
        if (this.currentCategory === 'all') {
            const totalPages = Math.ceil(filtered.length / this.itemsPerPage);
            this.renderPagination(totalPages);
        } else {
            // Скрываем пагинацию для отдельных категорий
            document.querySelector('.pagination').innerHTML = '';
        }
        
        this.updateResultsCount(filtered.length);
        this.initAnimations();
    }

    getViewAllButtonHTML(category, totalItems) {
        const categoryNames = {
            'vegetables': 'овощи',
            'fruits': 'фрукты',
            'dried': 'сухофрукты',
            'nuts': 'орехи'
        };
        
        return `
            <div class="view-all-container" style="grid-column: 1 / -1; text-align: center; margin: 30px 0;">
                <button class="btn-filter view-all-category" data-category="${category}" style="padding: 15px 40px; font-size: 1.1rem;">
                    <i class="fas fa-eye"></i> Показать все ${categoryNames[category]} (${totalItems})
                </button>
            </div>
        `;
    }

    createProductCard(product) {
        const isInWishlist = this.wishlist.includes(product.id);
        const isInCart = this.cart.some(item => item.id === product.id);
        const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        
        return `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge ${product.badge.includes('Хит') ? 'hit' : ''}">${product.badge}</div>` : ''}
                ${discount > 0 ? `<div class="product-discount">-${discount}%</div>` : ''}
                
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions">
                        <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" title="${isInWishlist ? 'В избранном' : 'В избранное'}">
                            <i class="fa${isInWishlist ? 's' : 'r'} fa-heart"></i>
                        </button>
                    </div>
                </div>
                
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    
                    <div class="product-rating">
                        <div class="stars">
                            ${this.getRatingStars(product.rating)}
                        </div>
                        <span class="reviews-count">(${product.reviews})</span>
                    </div>
                    
                    <div class="product-meta">
                        <span><i class="fas fa-weight"></i> ${product.weight}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${product.country}</span>
                    </div>
                    
                    <div class="product-price-block">
                        <div class="product-prices">
                            <span class="current-price">${product.price}₽</span>
                            ${product.oldPrice ? `<span class="old-price">${product.oldPrice}₽</span>` : ''}
                        </div>
                        
                        <button class="btn-product add-to-cart ${isInCart ? 'in-cart' : ''}" data-id="${product.id}">
                            <i class="fas ${isInCart ? 'fa-shopping-basket' : 'fa-shopping-cart'}"></i>
                            ${isInCart ? 'Перейти' : 'В корзину'}
                        </button>
                    </div>
                    
                    ${!product.inStock ? '<div class="out-of-stock">Нет в наличии</div>' : ''}
                </div>
            </div>
        `;
    }

    renderPromoProducts(category = 'all') {
        const promoGrid = document.getElementById('promoProductsGrid');
        if (!promoGrid) return;

        let promoProducts = [];
        
        if (category === 'all') {
            // Для категории "Все" показываем по 4 товара из каждой категории
            const categories = ['vegetables', 'fruits', 'dried', 'nuts'];
            categories.forEach(cat => {
                const catPromo = this.products
                    .filter(p => p.category === cat && p.badge === 'Акция недели')
                    .slice(0, 4);
                promoProducts = [...promoProducts, ...catPromo];
            });
            
            // Если в какой-то категории меньше 4 товаров, добираем из других
            if (promoProducts.length < 16) {
                const additional = this.products
                    .filter(p => p.badge === 'Акция недели' && !promoProducts.includes(p))
                    .slice(0, 16 - promoProducts.length);
                promoProducts = [...promoProducts, ...additional];
            }
        } else {
            // Для конкретной категории показываем только её акционные товары
            promoProducts = this.products
                .filter(p => p.category === category && p.badge === 'Акция недели')
                .slice(0, 4);
        }

        if (promoProducts.length > 0) {
            promoGrid.innerHTML = promoProducts.map(product => this.createCompactProductCard(product)).join('');
        } else {
            promoGrid.innerHTML = '<div class="no-promo" style="grid-column: 1/-1; text-align: center; padding: 40px;">Нет акционных товаров в этой категории</div>';
        }
    }

    createCompactProductCard(product) {
        const isInCart = this.cart.some(item => item.id === product.id);
        
        return `
            <div class="promo-card">
                <div class="promo-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="promo-info">
                    <h4>${product.name}</h4>
                    <div class="promo-price">
                        <span class="current">${product.price}₽</span>
                        ${product.oldPrice ? `<span class="old">${product.oldPrice}₽</span>` : ''}
                    </div>
                    <button class="btn-product btn-small add-to-cart ${isInCart ? 'in-cart' : ''}" data-id="${product.id}">
                        <i class="fas ${isInCart ? 'fa-shopping-basket' : 'fa-shopping-cart'}"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';
        
        // Кнопка "Предыдущая"
        if (this.currentPage > 1) {
            html += `<span class="page-link" data-page="${this.currentPage - 1}"><i class="fas fa-chevron-left"></i></span>`;
        }

        // Номера страниц
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= this.currentPage - 2 && i <= this.currentPage + 2)
            ) {
                html += `<span class="page-link ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += `<span class="page-dots">...</span>`;
            }
        }

        // Кнопка "Следующая"
        if (this.currentPage < totalPages) {
            html += `<span class="page-link" data-page="${this.currentPage + 1}"><i class="fas fa-chevron-right"></i></span>`;
        }

        pagination.innerHTML = html;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        
        // Обновляем отображение кнопок
        this.renderProducts();
        this.renderWeeklyProducts();
        this.renderPromoProducts(this.currentCategory);
        
        this.showNotification(`✓ ${product.name} добавлен в корзину`);
    }

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            this.showNotification('✓ Добавлено в избранное');
        } else {
            this.wishlist.splice(index, 1);
            this.showNotification('✓ Удалено из избранного');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCount();
        this.renderProducts(); // Обновляем отображение кнопок
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    updateWishlistCount() {
        document.querySelector('.wishlist-count').textContent = this.wishlist.length;
    }

    resetFilters() {
        document.getElementById('inStockFilter').checked = false;
        document.getElementById('organicFilter').checked = false;
        document.getElementById('searchInput').value = '';
        document.getElementById('priceRange').value = 2000;
        document.getElementById('priceValue').textContent = '2000₽';
        document.querySelector('input[name="category"][value="all"]').checked = true;
        
        this.currentCategory = 'all';
        this.sortBy = 'default';
        this.currentPage = 1;
        this.showAllCategory = false;
        
        // Обновляем табы
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === 'all');
        });
        
        // Обновляем заголовок
        this.updateCategoryTitle('all');
        
        this.renderProducts();
        this.renderPromoProducts('all');
    }

    updateResultsCount(count) {
        document.getElementById('resultsCount').textContent = `Найдено товаров: ${count}`;
    }

    getCategoryName(category) {
        const names = {
            'vegetables': 'Овощи',
            'fruits': 'Фрукты',
            'dried': 'Сухофрукты',
            'nuts': 'Орехи'
        };
        return names[category] || category;
    }

    getRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalf) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    getEmptyStateHTML() {
        return `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры поиска</p>
                <button class="btn-filter" id="resetFiltersEmpty">Сбросить фильтры</button>
            </div>
        `;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new CatalogManager();
});