// Подключение основного файла стилей
import "../scss/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import "../scss/base/swiper.scss";
import 'swiper/css';


document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;


    //Возвращаем анимацию после загрузки DOM
    body.classList.remove('preload');


    /* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
    const isWebp = () => {
        function testWebP(callback) {
            let webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP(function (support) {
            let className = support === true ? 'webp' : 'no-webp';
            document.documentElement.classList.add(className);
        });
    }
    isWebp();


    //Swiper slides
    const initSliders = () => {
        if (document.querySelector('[data-main-slider]')) {
            new Swiper('[data-main-slider]', {
                modules: [Pagination, Autoplay],
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                loop: true,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: true,
                },
                pagination: {
                    el: ".main-section__paginate",
                    clickable: true,
                }
            });
        }

        if (document.querySelector('[data-brands-slider]')) {
            new Swiper('[data-brands-slider]', {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: '[data-brands-prev]',
                    nextEl: '[data-brands-next]',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1343: {
                        slidesPerView: 5,
                        spaceBetween: 48,
                    },
                }
            });
        }

        if (document.querySelector('[data-portfolio-slider]')) {
            new Swiper('[data-portfolio-slider]', {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: '[data-portfolio-prev]',
                    nextEl: '[data-portfolio-next]',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                }
            });
        }
    }

    initSliders();


    // Бургер Меню
    const hamburger = document.querySelector('.header__mobile');
    const hamburgeIcon = hamburger.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');

    const toggleMenu = () => {
        menu.classList.toggle('header__menu_active');
        hamburgeIcon.classList.toggle('header__burger_open');
    }

    hamburger.addEventListener('click', e => {
        e.stopPropagation();

        toggleMenu();
    });

    document.addEventListener('click', e => {
        const target = e.target;
        const its_menu = target == menu || menu.contains(target);
        const its_hamburger = target == hamburger;
        const menu_is_active = menu.classList.contains('header__menu_active');

        if (!its_menu && !its_hamburger && menu_is_active) {
            toggleMenu();
        }
    })


    // Видеоплеер
    const videoBox = document.querySelector('[data-video-box]')
    const video = document.querySelector('[data-video-player]');
    const playButton = document.querySelector('[data-video-play]');

    if (video && playButton) {

        video.addEventListener('play', () => {
            videoBox.classList.remove('video__inner_disabled')
            playButton.style.display = 'none';
            video.setAttribute('controls', true)
        });

        video.addEventListener('pause', () => {
            videoBox.classList.add('video__inner_disabled')
            playButton.style.display = 'block';
            video.removeAttribute('controls', true)
        });

        video.addEventListener('ended', () => {
            playButton.style.display = 'block';
        });

        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();

            } else {
                video.pause();
            }
        });
    }
});