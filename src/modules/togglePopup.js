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
export default togglePopup;