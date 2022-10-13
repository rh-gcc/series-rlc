let questionTitle, questionText, circuitDiagram, workedSolution, finalAnswer, componentValuesList;
let workedSolutionWrapper, finalAnswerWrapper, solutions;
let toggleFinalAnswer, toggleWorkedSolution;

const roundingPrecision = 2; // decimal places

const generateRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomArrayItem = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}

const radiansToDegrees = (radians) => {
	return radians * (180 / Math.PI);
}

const openQuestion = (questionId) => {
	questionTitle.textContent = questions[questionId].title;
	questionText.innerHTML = randomArrayItem(questions[questionId].text);
	circuitDiagram.src = "circuit-diagrams/" + questionId + ".png";
	questions[questionId].createProblem();
}

const questions = {
	superposition: {
		questionId: "superposition",
		title: "Superposition",
		text: ["Determine the current flowing through R2 in the circuit shown using the principle of superposition", "Using superposition theorem, find the current flowing through R2 in the circuit shown" ],
		createProblem: () => { createSuperpositionProblem() }
	},
	thevenin: {
		questionId: "thevenin",
		title: "Thévenin's Theorem",
		text: ["Ascertain the current flowing through R in the circuit shown using Thévenin’s theorem and complex notation"],
		createProblem: () => { createTheveninProblem() }
	},
	norton: {
		questionId: "norton",
		title: "Norton's Theorem",
		text: ["Determine the current flowing through R3 using Norton's theorem"],
		createProblem: () => { createNortonProblem() }
	},
	mpt: {
		questionId: "mpt",
		title: "Maximum Power Transfer",
		text: ["Determine the value of R<sub>L</sub> in the circuit shown so that the power transferred to the load is maximised. <br/>How much power is dissipated by the load at this value of R<sub>L</sub>?"],
		createProblem: () => { createMPTProblem() }
	}
}

const listComponentValues = (componentValues) => {
	for(let i = 0; i < Object.keys(componentValues).length; i++) {
		const componentValue = document.createElement("li");
		componentValue.innerHTML = Object.keys(componentValues)[i] + " = " + Object.values(componentValues)[i];
		
		// Append units
		const firstCharacter = componentValue.innerHTML.substr(0, 1);
		const firstTwoCharacters = componentValue.innerHTML.substr(0, 2);
		if(firstCharacter == "R") {
			componentValue.innerHTML += "&#8486;";
		} else if (firstCharacter == "V") {
			componentValue.innerHTML += "V";
		} else if (firstTwoCharacters == "XC" || firstTwoCharacters == "XL") {
			componentValue.innerHTML += "j&#8486;";
		}

		componentValuesList.appendChild(componentValue);
	}
}

const calculateParallelResistance = (R1, R2) => {
	return (1 / ((1 / R1) + (1 / R2)));
}

const wipeExistingQuestion = () => {
	workedSolution.innerHTML = "";
	finalAnswer.innerHTML = "";
	componentValuesList.innerHTML = "";
	finalAnswerWrapper.style.display = "none";
	workedSolutionWrapper.style.display = "none";
	solutions.style.display = "block";
}


window.onload = () => {
	questionTitle = document.getElementById("questionTitle");
	questionText = document.getElementById("questionText");
	circuitDiagram = document.getElementById("circuitDiagram");
	componentValuesList = document.getElementById("componentValues");
	
	solutions = document.getElementById("solutions");
	finalAnswerWrapper = document.getElementById("finalAnswerWrapper");
	finalAnswer = document.getElementById("finalAnswer");
	workedSolutionWrapper = document.getElementById("workedSolutionWrapper");
	workedSolution = document.getElementById("workedSolution");
	
	toggleFinalAnswer = document.getElementById("toggleFinalAnswer");
	toggleWorkedSolution = document.getElementById("toggleWorkedSolution");
	
	toggleFinalAnswer.addEventListener("click", () => {
		if(finalAnswerWrapper.style.display == "none") {
			finalAnswerWrapper.style.display = "block";
		} else {
			finalAnswerWrapper.style.display = "none";
		}
	})

	toggleWorkedSolution.addEventListener("click", () => {
		if(workedSolutionWrapper.style.display == "none") {
			workedSolutionWrapper.style.display = "block";
		} else {
			workedSolutionWrapper.style.display = "none";
		}
	})
	
	for(let i = 0; i < Object.keys(questions).length; i++) {
		const questionId = Object.keys(questions)[i];
		const button = document.createElement("button");
		button.innerHTML = questions[questionId].title;
		button.classList = "u-full-width button-primary";
		button.onclick = () => { openQuestion(questionId); }; 
		document.getElementById("problemSelector").appendChild(button);
	}
}

