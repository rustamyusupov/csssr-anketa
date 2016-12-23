export default() => {
	const WIDTH_SEPARATOR = 4;
	const TRANSITION_ON = 'slider__pointer_transition';

	const slider = document.querySelector('.slider__scale');
	const input = document.querySelector('.slider__input');
	const pointer = document.querySelector('.slider__pointer');

	const halfWidthPointer = pointer.offsetWidth / 2 || 0;
	const halfWidthSeparator = WIDTH_SEPARATOR / 2 || 0;

	const SLIDER_LEVEL_NO = 0 - halfWidthPointer + halfWidthSeparator;
	const SLIDER_LEVEL_WRITE = slider.offsetWidth - halfWidthPointer - halfWidthSeparator;

	// двигает указатель
	function movePointer(evt) {
		evt.preventDefault();

		// координата слайдера относительно окна
		// вместо getBoundingClientRect().left – неверное значение на Android
		const sliderWindowOffset = slider.offsetLeft - window.pageXOffset;

		// координата курсора относительно документа
		// в зависимости от типа устройства: десктоп/мобильные
		const coordX = evt.type === 'touchmove' || evt.type === 'touchstart' ?
			evt.targetTouches[0].pageX :
			evt.pageX;

		// pageXOffset – прокрутка
		// halfWidthPointer – центр указателя
		let pos = coordX - sliderWindowOffset - window.pageXOffset - halfWidthPointer;

		// если ушли за левую границу
		if (pos + halfWidthPointer < 0) {pos = SLIDER_LEVEL_NO;}
		// если ушли за правую границу
		if (pos > SLIDER_LEVEL_WRITE) {pos = SLIDER_LEVEL_WRITE;}

		pointer.style.left = pos + 'px';
		input.value = pos - SLIDER_LEVEL_NO;
	}

	pointer.addEventListener('mousedown', () => {
		pointer.classList.remove(TRANSITION_ON);

		document.onmousemove = evt => movePointer(evt);

		document.onmouseup = () => {
			document.onmousemove = document.onmouseup = null;
		};

		pointer.ondragstart = () => false;
	});

	pointer.addEventListener('touchmove', evt => {
		pointer.classList.remove(TRANSITION_ON);
		movePointer(evt);
	});

	slider.addEventListener('click', evt => {
		pointer.classList.add(TRANSITION_ON);
		movePointer(evt);
	});

	slider.addEventListener('touchstart', evt => {
		pointer.classList.add(TRANSITION_ON);
		movePointer(evt);
	});

	// начальное значение
	const level = parseInt(input.value, 10) + SLIDER_LEVEL_NO;
	const isValidLevel = level >= SLIDER_LEVEL_NO && level <= SLIDER_LEVEL_WRITE;

	if (isValidLevel) {pointer.style.left = level + 'px';}
};
