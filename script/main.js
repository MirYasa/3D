/* eslint-disable arrow-parens */
/* eslint-disable eol-last */
// eslint-disable-next-line strict
'use strict';
window.addEventListener('DOMContentLoaded', () => {

    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaning() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            const timer = getTimeRemaning();

            if (timer.hours >= 0 && timer.hours <= 9) {
                timerHours.textContent = `0${timer.hours}`;
            } else if (timer.hours < 0) {
                timerHours.textContent = '00';
            } else {
                timerHours.textContent = timer.hours;
            }
            if (timer.minutes >= 0 && timer.minutes <= 9) {
                timerMinutes.textContent = `0${timer.minutes}`;
            } else if (timer.minutes < 0) {
                timerMinutes.textContent = '00';
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            if (timer.seconds >= 0 && timer.seconds <= 9) {
                timerSeconds.textContent = `0${timer.seconds}`;
            } else if (timer.seconds < 0) {
                timerSeconds.textContent = '00';
            } else {
                timerSeconds.textContent = timer.seconds;
            }
        }

        setInterval(updateClock, 1000);
    }
    countTimer('23 september 2020');

    function toggleMenu() {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        function handlerMenu() {
            menu.classList.toggle('active-menu');
        }

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.tagName === 'A') {
                handlerMenu();
            }
        });

        btnMenu.addEventListener('click', handlerMenu);
    }
    toggleMenu();

    function togglePopup() {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        popup.style.opacity = '10%';
        let i = 0;

        function animate() {
            i += 2.5;
            popup.style.opacity = `${i}%`;
        }

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
                if (document.documentElement.clientWidth > 768) {
                    const interval = setInterval(animate, 12.5);
                    setTimeout(() => {
                        if (i > 100) {
                            clearInterval(interval);
                            i = 0;
                        }
                    }, 900);
                } else {
                    popup.style.opacity = '100%';
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                popup.style.opacity = '10%';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                    popup.style.opacity = '10%';
                }
            }
        });
    }

    togglePopup();

    function tabs() {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        function toggleTabContent(index) {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    }
    tabs();

    function slider() {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot;

        function getDots() {
            const portfolioDots = document.querySelector('.portfolio-dots');

            for (let i = 0; i < slide.length; i++) {
                dot = document.createElement('li');
                dot.classList.add('dot');
                portfolioDots.append(dot);
                console.log(dot);
            }
        }
        getDots();

        function autoPlay() {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        }

        function startSlide() {
            interval = setInterval(autoPlay, 4000);
        }

        function stopSlide() {
            clearInterval(interval);
        }

        function prevSlide(elem, index, strClass) {
            elem[index].classList.remove(strClass);
        }

        function nextSlide(elem, index, strClass) {
            elem[index].classList.add(strClass);
        }

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });



        startSlide();
    }
    slider();
});