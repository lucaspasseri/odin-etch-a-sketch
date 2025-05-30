let gridSideSize = 16;
const gridWidth = 800;

const container = document.querySelector(".container");

const navBar = document.createElement("nav");
navBar.textContent = "Etch a Sketch";
navBar.className = "navbar";

container.appendChild(navBar);

const resetGridBtn = document.createElement("button");
resetGridBtn.textContent = "Reset Grid";
resetGridBtn.addEventListener("click", resetGrid);
resetGridBtn.className = "reset-grid-btn";

container.appendChild(resetGridBtn);

const grid = createGrid(gridSideSize);

container.appendChild(grid);

function decreaseBackgroundColor(event) {
	const backgroundColor = event.target.style.backgroundColor;

	const currValue = backgroundColor || "rgb(255, 255, 255)";

	const rgbArray = currValue.slice(4, -1).split(", ");

	const randomNumber = Math.floor(Math.random() * rgbArray.length);

	const rgbParameter = rgbArray[randomNumber];

	if (rgbParameter === "0") {
		for (let i = 0; i < rgbArray.length; i++) {
			if (i === randomNumber) continue;

			const currRgbParameter = rgbArray[i];

			if (currRgbParameter === "0") {
				continue;
			}

			rgbArray[i] = currRgbParameter - 85;
			break;
		}
	} else {
		rgbArray[randomNumber] -= 85;
	}

	const newRgbValue = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;

	event.target.style.backgroundColor = newRgbValue;
}

function createGrid(gridSideSize) {
	const grid = document.createElement("div");
	grid.className = "grid";

	for (let i = 0; i < gridSideSize ** 2; i++) {
		const currDiv = document.createElement("div");
		currDiv.id = `div-${i}`;
		currDiv.style = `width: ${gridWidth / gridSideSize}px; height: ${
			gridWidth / gridSideSize
		}px; background-color: #fff`;
		currDiv.addEventListener("mouseover", decreaseBackgroundColor);

		grid.appendChild(currDiv);
	}

	return grid;
}

function resetGrid() {
	gridSideSize = prompt("Insert the side size of the grid:", 16);

	while (gridSideSize > 100) {
		gridSideSize = prompt(
			`(It must to be less than or equal to 100)
Insert the side size of the grid:`,
			16
		);
	}

	const prevGrid = document.querySelector(".grid");
	const container = document.querySelector(".container");

	if (prevGrid) container.removeChild(prevGrid);

	const newGrid = createGrid(gridSideSize);
	container.appendChild(newGrid);
}
