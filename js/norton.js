const createNortonProblem = () => {
	wipeExistingQuestion();
	const componentValues = generateNortonComponents();
	listComponentValues(componentValues);
	const I3 = solveNorton(componentValues);
	finalAnswer.innerHTML = "I<sub>R3</sub> = " + I3 + "A"
}

const generateNortonComponents = () => {
	return {
		V1: generateRandomInt(5, 25),
		R1: generateRandomInt(1, 50),
		R2: generateRandomInt(1, 50),
		R3: generateRandomInt(1, 50)
	}
}


const solveNorton = (componentValues) => {
	
	// Find IN
	const findIN = document.createElement("p");
	findIN.style.fontWeight = "bold";
	findIN.innerHTML = "To find I<sub>N</sub>, replace R3 with a short circuit (0&#8486;)";

	const IN = (componentValues["V1"] / componentValues["R1"]).toFixed(roundingPrecision); // I = V / R (R2 is shorted out, so isn't considered)
	
	const calculateIN = document.createElement("p");
	calculateIN.innerHTML = "Since R2 is shorted out, I<sub>N</sub> = V1 / R1<br />I<sub>N</sub> = " + componentValues["V1"] + " / " + componentValues["R1"] + " = " + IN + "A";
	
	// Find RN
	const findRN = document.createElement("p");
	findRN.style.fontWeight = "bold";
	findRN.innerHTML = "To find R<sub>N</sub>, replace R3 with an open circuit and V1 with a short circuit (0&#8486;)";

	const RN = (calculateParallelResistance(componentValues["R1"], componentValues["R2"])).toFixed(roundingPrecision)
	
	const calculateRN = document.createElement("p");
	calculateRN.innerHTML = "R<sub>N</sub> = R1 / R2 = " + RN + "&#8486;";

	// Norton equivalent
	const nortonEquivalent = document.createElement("img");
	nortonEquivalent.classList = "centre-image";
	nortonEquivalent.src = "circuit-diagrams/norton-equivalent.png";

	const I3 = (IN * (RN / (+RN + +componentValues["R3"]))).toFixed(roundingPrecision);

	const calculateI3 = document.createElement("p");
	calculateI3.innerHTML = "I<sub>R3</sub> = I<sub>N</sub> * (R<sub>N</sub> / (R<sub>N</sub> + R3)) = " + I3 + "A";

	// Append worked solution
	workedSolution.appendChild(findIN);
	workedSolution.appendChild(calculateIN);
	
	workedSolution.appendChild(findRN);
	workedSolution.appendChild(calculateRN);
	
	workedSolution.appendChild(nortonEquivalent);
	workedSolution.appendChild(calculateI3);

	return I3;
}
