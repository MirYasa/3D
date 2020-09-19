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

export default calculateCost;