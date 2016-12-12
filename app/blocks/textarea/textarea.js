export default() => {
	const textarea = document.querySelector('.textarea');

	// удаляет лишние теги
	// теги остаются после выделение всего содержимого в div и удаления
	textarea.addEventListener('blur', () => {
		if (!textarea.textContent.replace(' ', '').length) {
			textarea.innerHTML = '';
		}
	});
};

// Решение для textarea
// import {getCSSProperty}from '../../scripts/utils';
//
// export default() => {
// 	const textarea = document.querySelector('.textarea');
// 	const MINIMUM_ROWS = textarea.rows;
//
// 	// удаляет лишние пробелы и переводы строк
// 	// https://github.com/pugjs/pug/issues/1931
// 	function trimWhitespace(text) {
// 		return text.replace(/^\s*|\s*$/gm, '')
// 			.replace(/(\r\n|\n|\r)/gm, ' ');
// 	}
//
// 	// вычисляет ширину символа
// 	function getCharWidth() {
// 		const span = document.createElement('span');
//
// 		span.style.fontFamily = getCSSProperty(textarea, 'font-family');
// 		span.style.fontSize = getCSSProperty(textarea, 'font-size');
// 		span.innerHTML = 'R';
//
// 		document.body.appendChild(span);
//
// 		const width = span.offsetWidth;
//
// 		document.body.removeChild(span);
//
// 		return width;
// 	}
//
// 	// количество символов на строку
// 	const charsPerRow = Math.ceil( textarea.offsetWidth / getCharWidth() );
//
// 	// изменяет размер
// 	function resizeTextarea() {
// 		const textareaRows = textarea.value.split('\n');
// 		const numberOfRows = textareaRows.reduce((count, row) =>
// 			count + Math.floor(row.length / charsPerRow) + 1, 0);
//
// 		textarea.rows = numberOfRows >= MINIMUM_ROWS ?
// 			numberOfRows + 1 : MINIMUM_ROWS;
// 	}
//
// 	textarea.addEventListener('keyup', resizeTextarea);
//
// 	textarea.value = trimWhitespace(textarea.value);
//
// 	resizeTextarea();
// };
