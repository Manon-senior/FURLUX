// Навигация
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const header = document.getElementById('header');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Скролл эффекты для заголовка
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                // Проверяем, что href не просто "#" и является валидным селектором
                if (href && href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Анимация появления элементов при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Модальное окно для товаров
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalContent');
        const closeModal = document.querySelector('.close');

        const productData = {
            lights: {
                title: 'Фонари габаритные LED',
                image: 'https://cdn1.ozone.ru/s3/multimedia-f/6090480759.jpg',
                description: 'Высококачественные светодиодные фонари габаритные для улучшения видимости и безопасности вашего автомобиля.',
                features: [
                    'Яркость: 1200 люмен',
                    'Энергопотребление: 12W',
                    'Цветовая температура: 6000K',
                    'Защита: IP67',
                    'Гарантия: 2 года'
                ],
                price: '1 990 ₽',
                wildberriesLink: 'https://www.wildberries.ru/'
            },
            tweeters: {
                title: 'Автомобильные твитеры Premium',
                image: 'https://avatars.mds.yandex.net/i?id=526901dcefe55ab8eadc28bd9b0e21dd-5229226-images-thumbs&n=13',
                description: 'Профессиональные автомобильные динамики-твитеры для кристально чистого звука высоких частот.',
                features: [
                    'Мощность: 100W RMS',
                    'Частотный диапазон: 2-20 кГц',
                    'Сопротивление: 4 Ом',
                    'Магнитная система: неодим',
                    'Диаметр: 25мм'
                ],
                price: '2 490 ₽',
                wildberriesLink: 'https://www.wildberries.ru/'
            },
            'led-strips': {
                title: 'Светодиодные ленты RGB',
                image: 'https://avatars.mds.yandex.net/i?id=d3f71aed61747f84f2cb3a94f9fcd0fa242bbd1e-4575626-images-thumbs&n=13',
                description: 'Декоративные и функциональные RGB светодиодные ленты для тюнинга и подсветки автомобиля.',
                features: [
                    'Длина: 5 метров',
                    'Количество светодиодов: 300',
                    'Управление: пульт + приложение',
                    'Цветов: 16 миллионов',
                    'Защита: IP65'
                ],
                price: '1 590 ₽',
                wildberriesLink: 'https://www.wildberries.ru/'
            }
        };

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productType = card.dataset.product;
                const product = productData[productType];
                
                if (product) {
                    modalContent.innerHTML = `
                        <h2>${product.title}</h2>
                        <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 10px; margin: 1rem 0;">
                        <p>${product.description}</p>
                        <h3>Характеристики:</h3>
                        <ul style="margin: 1rem 0;">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
                            <div class="product-price" style="font-size: 1.5rem;">${product.price}</div>
                            <a href="${product.wildberriesLink}" class="btn" target="_blank">Купить на Wildberries</a>
                        </div>
                    `;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Кнопка "Все товары"
        document.getElementById('allProductsBtn').addEventListener('click', (e) => {
            e.preventDefault();
            
            // Создаем страницу каталога
            const catalogContent = `
                <h2 style="text-align: center; margin-bottom: 2rem; color: #ff6b35;">Каталог товаров FURLUX</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=087ab7a8323dcd55095ba9ce775e1f4ba0e6f2ce-5886220-images-thumbs&n=13" alt="LED фары" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>LED фары головного света</h3>
                        <p>Яркие и энергоэффективные LED лампы H4, H7</p>
                        <div class="product-price">от 3 490 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Автозарядки" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автомобильные зарядки</h3>
                        <p>Быстрые зарядные устройства USB-C, Lightning</p>
                        <div class="product-price">от 890 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=59593026ff90c3cd1f9229a04db521f5e215752e-5294137-images-thumbs&n=13" alt="Видеорегистратор" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Видеорегистраторы</h3>
                        <p>HD камеры для записи поездок 1080p/4K</p>
                        <div class="product-price">от 4 990 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Датчики парковки" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Датчики парковки</h3>
                        <p>Системы помощи при парковке с дисплеем</p>
                        <div class="product-price">от 2 790 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Держатели телефонов" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Держатели для телефонов</h3>
                        <p>Надежные крепления на воздуховод и стекло</p>
                        <div class="product-price">от 590 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=b377feebc3402cdb9d28193e8772df900d1cf320-5394584-images-thumbs&n=13" alt="Автохимия" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автохимия премиум</h3>
                        <p>Средства для мойки и защиты автомобиля</p>
                        <div class="product-price">от 390 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Коврики" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автомобильные коврики</h3>
                        <p>Резиновые и текстильные коврики EVA</p>
                        <div class="product-price">от 1 290 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=7a860a114669aeefc873e0bb8f399e02e07c0c41-5858181-images-thumbs&n=13" alt="Чехлы" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Чехлы на сиденья</h3>
                        <p>Универсальные и модельные авточехлы</p>
                        <div class="product-price">от 2 990 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Автоэлектроника" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автоэлектроника</h3>
                        <p>GPS навигаторы, радар-детекторы</p>
                        <div class="product-price">от 3 990 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Инструменты" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автоинструменты</h3>
                        <p>Наборы инструментов для авто</p>
                        <div class="product-price">от 1 590 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=bb54fc21630cece128f15804c3c4d7a2f230ce77-5233487-images-thumbs&n=13" alt="Масла" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Автомасла и жидкости</h3>
                        <p>Моторные масла, антифриз, тормозная жидкость</p>
                        <div class="product-price">от 890 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                    <div class="product-card" style="margin: 0; transform: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="https://avatars.mds.yandex.net/i?id=35e9e1512cd7a324353fdba04985153c3bc76f03-5682746-images-thumbs&n=13" alt="Подсветка" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <h3>Декоративная подсветка</h3>
                        <p>Неоновая подсветка днища и салона</p>
                        <div class="product-price">от 1 990 ₽</div>
                        <a href="https://www.wildberries.ru/" class="btn" target="_blank" style="font-size: 0.9rem; padding: 10px 20px;">Купить на WB</a>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee;">
                    <p style="color: #666; margin-bottom: 1rem;">Более 500 товаров доступно на нашей странице Wildberries</p>
                    <a href="https://www.wildberries.ru/" class="btn" style="margin-top: 1rem;" target="_blank">Перейти в магазин FURLUX на WB</a>
                </div>
            `;
            
            modalContent.innerHTML = catalogContent;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Анимация счетчиков
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = counter.textContent;
                        clearInterval(timer);
                    } else {
                        const suffix = counter.textContent.replace(/[0-9]/g, '');
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
            });
        }

        // Запуск анимации счетчиков при скролле к секции
        const aboutSection = document.querySelector('.about');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        aboutObserver.observe(aboutSection);

        // Отправка формы
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Имитация отправки
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправляем...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    e.target.reset();
                }, 2000);
            }, 2000);
        });

        // Параллакс эффект для героя
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero::before');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Добавление частиц (звездочек) на фон
        function createParticles() {
            const particleContainer = document.createElement('div');
            particleContainer.style.position = 'fixed';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            document.body.appendChild(particleContainer);

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.background = '#ff6b35';
                particle.style.borderRadius = '50%';
                particle.style.opacity = Math.random() * 0.5;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                particleContainer.appendChild(particle);
            }
        }

        // Создаем частицы
        createParticles();

        // Добавляем эффект печатающейся машинки для заголовка
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Запускаем эффект печатающейся машинки
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            typeWriter(heroTitle, 'FURLUX', 200);
        }

        console.log('🚗 FURLUX Website загружен успешно!');
        console.log('🎨 Все анимации активированы');
        console.log('📱 Адаптивный дизайн включен');