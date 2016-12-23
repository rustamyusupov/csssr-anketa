export default() => {
	const input = document.querySelector('.profile__input');
	const textarea = document.querySelector('.textarea');

	textarea.addEventListener('keyup', () => {
		input.setAttribute('value', textarea.textContent);
	});

	textarea.addEventListener('blur', () => {
		// очищает поле, остаются дивы после выделение и удаления текста
		if (!textarea.textContent.replace(' ', '').length) {
			textarea.innerHTML = '';
		}
	});
};
