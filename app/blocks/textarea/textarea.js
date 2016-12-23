export default() => {
	const input = document.querySelector('.profile__input');
	const textarea = document.querySelector('.textarea');

	textarea.addEventListener('keyup', () => {
		input.value = textarea.outerText;
	});

	textarea.addEventListener('blur', () => {
		// очищает поле, остаются дивы после выделение и удаления текста
		if (!textarea.textContent.replace(' ', '').length) {
			textarea.innerHTML = '';
		}
	});
};
