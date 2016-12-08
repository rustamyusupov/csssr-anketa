export default() => {
	const WIDTH_SEPARATOR = 4;
	const SECOND_SLIDER_LEVEL = 125;
	const THIRD_SLIDER_LEVEL = 350;
	const TRANSITION_ON = 'slider__pointer_transition';

	const slider = document.querySelector('.slider__scale');
	const pointer = document.querySelector('.slider__pointer');

	const halfWidthPointer = pointer.offsetWidth / 2 || 0;
	const halfWidthSeparator = WIDTH_SEPARATOR / 2 || 0;

	// уровни слайдера
	const sliderLevels = {
		1: 0 - halfWidthPointer + halfWidthSeparator,
		2: SECOND_SLIDER_LEVEL,
		3: THIRD_SLIDER_LEVEL,
		4: slider.offsetWidth - halfWidthPointer - halfWidthSeparator
	};

	// уровень пользователя
	const level = parseInt(pointer.dataset.value, 10);

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
		if (pos < 0) {pos = sliderLevels[1];}
		// если ушли за правую границу
		if (pos > sliderLevels[4]) {pos = sliderLevels[4];}

		pointer.style.left = pos + 'px';
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
	if (level) {pointer.style.left = sliderLevels[level] + 'px';}
};
