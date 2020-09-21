/* eslint-disable arrow-parens */
const sendForm = () => {
    const errorMessage = 'Что-то пошло не так..',
        loadMessage = 'Загрузка...',
        successMesage = 'Спасибо! Мы скоро с вами свяжемся',
        statusMesage = document.createElement('div'),
        reg = /[^а-я]/gi,
        reg2 = /[^0-9+]/g;

    statusMesage.style.cssText = `font-size: 2em; color: #fff;`;

    document.body.addEventListener('submit', (event) => {
        event.preventDefault();
        const target = event.target;

        target.appendChild(statusMesage);

        const inputs = target.querySelectorAll('input');

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                body: new FormData(body)
            });
        };
        statusMesage.textContent = loadMessage;

        postData(target)
            .then((response) => {
                if (response.status === 200) {
                    statusMesage.textContent = successMesage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 3000);
                }
            })
            .catch(() => {
                statusMesage.textContent = errorMessage;
            });

        inputs.forEach((item) => {
            item.value = '';
        });
    });

    document.body.addEventListener('input', (event) => {
        const target = event.target;

        if (target.type === 'text' && target.matches('.calc-item')) {
            target.value = target.value.replace(reg2, '');
        } else if (target.matches('.mess') && target.type === 'text') {
            target.value = target.value.replace(/[^а-я 0-9.,-]/, '');
        } else if (target.type === 'text') {
            target.value = target.value.replace(reg, '');
        }
        if (target.type === 'tel') {
            target.value = target.value.replace(reg2, '');

            if (target.value.length < 5) {
                target.setCustomValidity('Введите больше 5-ти символов');
            } else if (target.value.length > 20) {
                target.setCustomValidity('Введите меньше 20-ти символов');
            } else {
                target.setCustomValidity('');
            }
        }
    });
};
export default sendForm;