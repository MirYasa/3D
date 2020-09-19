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
export default slider;