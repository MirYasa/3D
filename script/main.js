/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable eol-last */
// eslint-disable-next-line strict
'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const countTimer = (deadLine) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaning = () => {
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
        };

        const updateClock = () => {
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
        };

        setInterval(updateClock, 1000);
    };
    countTimer('23 september 2020');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.tagName === 'A') {
                handlerMenu();
            }
        });

        btnMenu.addEventListener('click', handlerMenu);
    };
    toggleMenu();

    const togglePopup = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        popup.style.opacity = '10%';
        let i = 0;

        const animate = () => {
            i += 2.5;
            popup.style.opacity = `${i}%`;
        };

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
    };
    togglePopup();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

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

    };
    tabs();

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot;

        const getDots = () => {
            const portfolioDots = document.querySelector('.portfolio-dots');

            slide.forEach(() => {
                dot = document.createElement('li');
                dot.classList.add('dot');
                portfolioDots.append(dot);
            });

        };
        getDots();

        const dots = document.querySelectorAll('.dot');

        const stopSlide = () => {
            clearInterval(interval);
        };

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlay = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = () => {
            interval = setInterval(autoPlay, 4000);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
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
            nextSlide(dots, currentSlide, 'dot-active');

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
    };
    slider();

    const showImg = () => {
        const command = document.querySelector('.command');

        command.addEventListener(('mouseover'), (event) => {
            const target = event.target;
            let link;
            if (target.classList.contains('command__photo')) {
                link = target.src;
                target.src = target.dataset.img;
                target.dataset.img = link;
            }
        });

        command.addEventListener(('mouseout'), (event) => {
            const target = event.target;
            let link;
            if (target.classList.contains('command__photo')) {
                link = target.src;
                target.src = target.dataset.img;
                target.dataset.img = link;
            }
        });
    };
    showImg();

    const calculateCost = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.querySelector('#total');

        const countSum = () => {
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            let total = 0,
                countValue = 1,
                dayValue = 1;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;

            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;

            } else if (calcDay.value && calcDay > 10) {
                dayValue *= 1;

            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('input', (event) => {
            const target = event.target;

            if (target.classList.contains('calc-type')) {
                countSum();
            } else if (target.classList.contains('calc-item')) {
                target.value = target.value.replace(/\D/g, '');
                countSum();
            }
        });
    };
    calculateCost(100);

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так..',
            successMesage = 'Спасибо! Мы скоро с вами свяжемся',
            statusMesage = document.createElement('div'),
            reg = /\w/gi,
            reg2 = /[^0-9+]/g;

        statusMesage.style.cssText = `font-size: 2em; color: #fff;`;

        document.body.addEventListener('submit', (event) => {
            event.preventDefault();
            const target = event.target;

            target.appendChild(statusMesage);

            const inputs = target.querySelectorAll('input'),
                formData = new FormData(target),
                body = {};

            formData.forEach((item, key) => {
                body[key] = item;
            });

            postData(body)
                .then((response) => {

                    if (response !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMesage.textContent = successMesage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 3000);
                })
                .catch((error) => {
                    statusMesage.textContent = errorMessage;
                    console.log(error);
                });

            inputs.forEach((item) => {
                item.value = '';
            });
        });

        document.body.addEventListener('input', (event) => {
            const target = event.target;

            if (target.matches('#form1-phone')) {
                target.value = target.value.replace(reg2, '');
            } else if (target.matches('#form2-name')) {
                target.value = target.value.replace(reg, '');
            } else if (target.matches('#form2-message')) {
                target.value = target.value.replace(reg, '');
            } else if (target.matches('#form2-phone')) {
                target.value = target.value.replace(reg2, '');
            } else if (target.matches('#form3-phone')) {
                target.value = target.value.replace(reg2, '');
            }
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
    };
    sendForm();
});