const createSuperpositionProblem = () => {
	wipeExistingQuestion();
	const componentValues = generateSuperpositionComponents();
	listComponentValues(componentValues);
	const I2 = solveSuperposition(componentValues);
	finalAnswer.innerHTML = "I<sub>R2</sub> = " + I2 + "A"
}

const generateSuperpositionComponents = () => {
	return {
		V1: 10,
		V2: 5,
		R1: 5,
		R2: 9,
		R3: 21
	}

	/*return {
		V1: generateRandomInt(5, 25),
		V2: generateRandomInt(5, 25),
		R1: generateRandomInt(1, 50),
		R2: generateRandomInt(1, 50),
		R3: generateRandomInt(1, 50)

	}*/
}


const solveSuperposition = (componentValues) => {
	
	// Circuit A - V1 replaced with short circuit
	const circuitA = document.createElement("p");
	circuitA.style.fontWeight = "bold";
	circuitA.innerHTML = "Circuit A - V1 replaced with a short circuit (0&#8486;)";

	const totalResistanceA = (componentValues["R3"] + calculateParallelResistance(componentValues["R1"], componentValues["R2"])).toFixed(roundingPrecision); // R3 + (R1 // R2)
	const totalResistanceADesc = document.createElement("p");
	totalResistanceADesc.innerHTML = "R<sub>T</sub>A = R3 + (R1 // R2) = " + totalResistanceA + "&#8486;";

	const totalCurrentA = (componentValues["V2"] / totalResistanceA).toFixed(roundingPrecision); // I = V / R
	const totalCurrentADesc = document.createElement("p");
	totalCurrentADesc.innerHTML = "I<sub>T</sub>A = I<sub>R3</sub>A = V2 / R<sub>T</sub>A = " + componentValues["V2"] + " / " + totalResistanceA + " = " + totalCurrentA + "A";

	const I1A = (totalCurrentA * (componentValues["R2"] / (componentValues["R1"] + componentValues["R2"]))).toFixed(roundingPrecision); // Current divider
	const I1ADesc = document.createElement("p");
	I1ADesc.innerHTML = "I<sub>R1</sub>A = I<sub>R3</sub>A * (R2 / (R1 + R2)) = " + I1A + "A";
	
	const I2A = (totalCurrentA * (componentValues["R1"] / (componentValues["R1"] + componentValues["R2"]))).toFixed(roundingPrecision); // Current divider
	const I2ADesc = document.createElement("p");
	I2ADesc.innerHTML = "I<sub>R2</sub>A = I<sub>R3</sub>A * (R1 / (R1 + R2)) = " + I2A + "A";
	
	const I3A = totalCurrentA;
	
	// Circuit B - V2 replaced with short circuit
	const circuitB = document.createElement("p");
	circuitB.style.fontWeight = "bold";
	circuitB.innerHTML = "Circuit B - V2 replaced with a short circuit (0&#8486;)";
	
	const totalResistanceB = (componentValues["R1"] + calculateParallelResistance(componentValues["R2"], componentValues["R3"])).toFixed(roundingPrecision); // R1 + (R2 // R3)
	const totalResistanceBDesc = document.createElement("p");
	totalResistanceBDesc.innerHTML = "R<sub>T</sub>B = R1 + (R2 // R3) = " + totalResistanceB + "&#8486;";
	
	const totalCurrentB = (componentValues["V1"] / totalResistanceB).toFixed(roundingPrecision); // I = V / R
	

	const I1B = totalCurrentB;
	const totalCurrentBDesc = document.createElement("p");
	totalCurrentBDesc.innerHTML = "I<sub>T</sub>B = I<sub>R1</sub>B = V1 / R<sub>T</sub>B = " + componentValues["V1"] + " / " + totalResistanceB + " = " + totalCurrentB + "A";
	

	const I2B = (totalCurrentB * (componentValues["R3"] / (componentValues["R2"] + componentValues["R3"]))).toFixed(roundingPrecision); // Current divider
	const I2BDesc = document.createElement("p");
	I2BDesc.innerHTML = "I<sub>R2</sub>B = I<sub>R1</sub>B * (R3 / (R2 + R3)) = " + I2B + "A";
	

	const I3B = (totalCurrentB * (componentValues["R2"] / (componentValues["R2"] + componentValues["R3"]))).toFixed(roundingPrecision); // Current divider
	const I3BDesc = document.createElement("p");
	I3BDesc.innerHTML = "I<sub>R3</sub>B = I<sub>R1</sub>B * (R2 / (R2 + R3)) = " + I3B + "A";

	// Superposition
	const superposition = document.createElement("p");
	superposition.style.fontWeight = "bold";
	superposition.innerHTML = "Superposition";
	
	const I1 = (I1A - I1B).toFixed(roundingPrecision);
	const I1Desc = document.createElement("p");
	I1Desc.innerHTML = "I1 = I1A - I1B = " + I1A + " - " + I1B + " = " + I1 + "A";

	const I2 = (Number(I2A) + Number(I2B)).toFixed(2);
	const I2Desc = document.createElement("p");
	I2Desc.innerHTML = "I2 = I2A + I2B = " + I2A + " + " + I2B + " = " + I2 + "A";
	
	const I3 = (I3A - I3B).toFixed(roundingPrecision);
	const I3Desc = document.createElement("p");
	I3Desc.innerHTML = "I3 = I3A - I3B = " + I3A + " - " + I3B + " = " + I3 + "A";

	// Append worked solution
	workedSolution.appendChild(circuitA);
	workedSolution.appendChild(totalResistanceADesc);
	workedSolution.appendChild(totalCurrentADesc);
	workedSolution.appendChild(I2ADesc);
	workedSolution.appendChild(I1ADesc);
	
	workedSolution.appendChild(circuitB);
	workedSolution.appendChild(totalResistanceBDesc);
	workedSolution.appendChild(totalCurrentBDesc);
	workedSolution.appendChild(I2BDesc);
	workedSolution.appendChild(I3BDesc);

	workedSolution.appendChild(superposition);
	workedSolution.appendChild(I1Desc);
	workedSolution.appendChild(I2Desc);
	workedSolution.appendChild(I3Desc);

	return I2;
}
