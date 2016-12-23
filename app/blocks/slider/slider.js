export default() => {
	/**
	 * @const
	 * @type {number}
	 */
	const SEPARATOR_HALF_WIDTH = 2;

	/**
	 * @const
	 * @type {string}
	 */
	const TRANSITION_ON = 'slider__pointer_transition';

	const slider = document.querySelector('.slider__scale');
	const input = document.querySelector('.slider__input');
	const pointer = document.querySelector('.slider__pointer');

	const pointerHalfWidth = pointer.offsetWidth / 2 || 0;

	const sliderLeftEdge = SEPARATOR_HALF_WIDTH - pointerHalfWidth;
	const sliderRightEdge = slider.offsetWidth - SEPARATOR_HALF_WIDTH - pointerHalfWidth;

	const initLevel = parseInt(input.value, 10) + sliderLeftEdge;
	const isLevelValid = initLevel >= sliderLeftEdge &&
						initLevel <= sliderRightEdge;

	/**
	 * двигает указатель
	 * @param {object} evt
	 */
	function movePointer(evt) {
		evt.preventDefault();

		// координата слайдера относительно окна
		const sliderWindowOffset = slider.offsetLeft - window.pageXOffset;

		// координата курсора относительно документа
		const coordX = evt.type === 'touchmove' || evt.type === 'touchstart' ?
			evt.targetTouches[0].pageX :
			evt.pageX;

		// pageXOffset – прокрутка
		let pos = coordX - sliderWindowOffset - window.pageXOffset - pointerHalfWidth;

		// если ушли за левую границу
		if (pos + pointerHalfWidth <= 0) {
			pos = sliderLeftEdge;
		}
		// если ушли за правую границу
		if (pos > sliderRightEdge) {
			pos = sliderRightEdge;
		}

		pointer.style.left = pos + 'px';
		input.setAttribute('value', pos - sliderLeftEdge);
	}

	if (isLevelValid) {
		pointer.style.left = initLevel + 'px';
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
};
