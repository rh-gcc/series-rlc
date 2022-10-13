const createMPTProblem = () => {
	wipeExistingQuestion();
	const componentValues = generateMPTComponents();
	listComponentValues(componentValues);
	const solution = solveMPT(componentValues);
	finalAnswer.innerHTML = "R<sub>L</sub> = " + solution["RL"] + "&#8486;";
	finalAnswer.innerHTML += "<br/>P<sub>L</sub> = " + solution["PL"] + "W";
}

const generateMPTComponents = () => {
	return {
		VS: generateRandomInt(5, 30),
		RS: generateRandomInt(1, 50)
	}
}


const solveMPT = (componentValues) => {
	
	const solution = { RL: componentValues["RS"], PL: (Math.pow(componentValues["VS"] / 2, 2) / componentValues["RS"]).toFixed(roundingPrecision) };
	
	// RL = RS
	const rlValue = document.createElement("p");
	rlValue.innerHTML = "Maximum power transfer occurs when R<sub>S</sub> = R<sub>L</sub><br/>R<sub>L</sub> = " + componentValues["RS"] + "&#8486;";

	// PL = VL^2 / RL
	const plValue = document.createElement("p");
	plValue.innerHTML = "P<sub>L</sub> = I<sub>L</sub> * V<sub>L</sub><br />P<sub>L</sub> = V<sub>L</sub><sup>2</sup> / R<sub>L</sub> = " + componentValues["VS"] / 2 + "<sup>2</sup> / " + componentValues["RS"] + " = " + solution.PL + "W";

	// Append worked solution
	workedSolution.appendChild(rlValue);
	workedSolution.appendChild(plValue);

	return solution;
}
