//обьявляеться функция filterByType c 2-мя параметрами
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	// обьявляеться функция hideAllResponseBlocks
	hideAllResponseBlocks = () => {
		// обьявляется переменная responseBlocksArray
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//  переменная responseBlocksArray перебирается и скрывает каждый элемент 
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
//обьявляеться функция showResponseBlock c 3-мя параметрами
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// вызывается функция  hideAllResponseBlocks
		hideAllResponseBlocks();
		//показывает элемент переданный из параметров
		document.querySelector(blockSelector).style.display = 'block';
		// если spanSelector = true
		if (spanSelector) {
			//элемент из параметра spanSelector получает текст из параметра msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//обьявляеться функция showError c 1 параметром, которая вызывает функцию showResponseBlock
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//обьявляеться функция showResults c 1 параметром, которая вызывает функцию showResponseBlock
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//обьявляеться функция showNoResults, которая вызывает функцию showResponseBlock
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	//обьявляеться функция tryFilterByType c 2-мя параметрами
	tryFilterByType = (type, values) => {
		//начинается конструкция try
		try {
			//обьявляется переменная valuesArray
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//обьявляется переменная alertMsg
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
				//вызывается функция showResults
			showResults(alertMsg);
			// если в блоке try произошла ошибка тогда
		} catch (e) {
			//вызывается функия showError
			showError(`Ошибка: ${e}`);
		}
	};
// обьявляется перменная filterButton
const filterButton = document.querySelector('#filter-btn');

// на переменную filterButton навешивается событие
filterButton.addEventListener('click', e => {
// обьявляется перменная typeInput
	const typeInput = document.querySelector('#type');
// обьявляется перменная dataInput
	const dataInput = document.querySelector('#data');

// условие если значение dataInput = пустой строке выполнить следующий код
if (dataInput.value === '') {
	//  выводится сообщение Поле не должно быть пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызывается  функция showNoResults
		showNoResults();
		//иначе 
	} else {
		// не  выводится сообщение
		dataInput.setCustomValidity('');
		// снимается действие  по умолчанию
		e.preventDefault();
		//вызывается функция tryFilterByType с 2-мя параметрами
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

