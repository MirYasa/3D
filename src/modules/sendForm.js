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

        if (target.matches('.form-phone')) {
            target.value = target.value.replace(reg2, '');
        }
        if (target.matches('.form-name')) {
            target.value = target.value.replace(reg, '');
        }
        if (target.matches('.mess')) {
            target.value = target.value.replace(reg, '');
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
export default sendForm;