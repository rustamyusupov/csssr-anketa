// получает значение css свойства
function getCSSProperty(elem, prop) {
	return window.getComputedStyle(elem, null).getPropertyValue(prop);
}

export {getCSSProperty};
