const container = document.querySelector('#container');
const div = document.querySelector('div');
const createBtn = document.getElementById('create-grid');
const defaultColorBtn = document.getElementById('default-color');
const randColorBtn = document.getElementById('random-color');
const colorShadeBtn = document.getElementById('color-shade');
const clearBtn = document.getElementById('clear-grid');
let isRandColor = false;
let isColorShade = false;
let isDefaultColor = true;

function createGrid(x, y) {
	let divW = 100 / x;
	let divH = 100 / y;
	for (let i = 0; i < x; i++) {
		for (let j = 0; j < y; j++) {
			const div = document.createElement('div');
			div.style.width = `${divW}%`;
			div.style.height = `${divH}%`;
			div.style.display = 'inline-block';
			div.style.float = 'left';
			container.appendChild(div);
		}
	}
}

createGrid(16, 16);

div.setAttribute('data-passes', 0);
div.addEventListener('mouseover', (e) => {
	if (isDefaultColor && e.target.id !== 'container') {
		e.target.style.background = 'white';
	} else if (isRandColor && e.target.id !== 'container') {
		e.target.style.background = randRGB();
	} else if (isColorShade && e.target.id !== 'container') {
		increaseBlackLevel(e.target);
	}
});

let gridSize = 16;
createBtn.onclick = () => {
	do {
		gridSize = window.prompt(`Enter Grid Size (MAX SIZE: 120): `, '16');
	} while (gridSize < 0 || gridSize > 120);
	if (gridSize > 0 && gridSize < 121) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		createGrid(gridSize, gridSize);
	} else if (gridSize === null) {
		gridSize = 16;
	}
};

randColorBtn.onclick = () => {
	isRandColor = true;
	isDefaultColor = false;
	isColorShade = false;
};

defaultColorBtn.onclick = () => {
	isDefaultColor = true;
	isRandColor = false;
	isColorShade = false;
};

colorShadeBtn.onclick = () => {
	isColorShade = true;
	isRandColor = false;
	isDefaultColor = false;
};

clearBtn.onclick = () => {
	if (gridSize > 0 && gridSize < 121) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		createGrid(gridSize, gridSize);
	}
};

function randRGB() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

function increaseBlackLevel(trgt) {
	const passes = Number(trgt.getAttribute('data-passes'));
	const c = 250 - 25 * passes;
	trgt.style.background = `rgb(${c},${c},${c})`;
	trgt.setAttribute('data-passes', passes + 1);
}
