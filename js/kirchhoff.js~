const createKirchhoffProblem = () => {
	wipeExistingQuestion();
	const componentValues = generateKirchhoffComponents();
	listComponentValues(componentValues);
	const I3 = solveKirchhoff(componentValues);
	finalAnswer.innerHTML = "I<sub>R3</sub> = " + I3 + "A"
}

const generateKirchhoffComponents = () => {
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

const solveKirchhoff = (componentValues) => {
	
	const KCL = document.createElement("p");
	KCL.innerHTML = "KCL: I<sub>R3</sub> = I<sub>R2</sub> - I<sub>R1</sub>";

	// Loop 1
	let loopOneLHS = componentValues["V1"] - componentValues["V2"];
	let loopOneI1Co = componentValues["R1"] + componentValues["R3"];
	let loopOneI2Co = -componentValues["R2"];

	const loopOne = document.createElement("p");
	loopOne.innerHTML = "Loop ACDF: " + loopOneLHS + "V = " + loopOneI1Co + "I1 + " + loopOneI2Co + "I2";

	// Loop 2
	let loopTwoLHS = componentValues["V1"];
	let loopTwoI1Co = componentValues["R1"];
	let loopTwoI2Co = componentValues["R2"];

	const loopTwo = document.createElement("p");
	loopTwo.innerHTML = "Loop ABDF: " + loopTwoLHS + "V = " + loopTwoI1Co + "I1 + " + loopTwoI2Co + "I2";
	
	// Simulataneous equation
	let multiplier = loopTwoI2Co / loopOneI2Co;

	const I1Voltage = loopOneLHS - (loopTwoLHS * multiplier);
	const I1Resistance = loopOneI1Co - (loopTwoI1Co * multiplier);
	const I1 = (I1Voltage / I1Resistance).toFixed(roundingPrecision);

	const I1Result = document.createElement("p");
	I1Result.innerHTML = "I<sub>R1</sub> = " + I1 + "A";

	multiplier = loopOneI1Co / loopOneI1Co;
	const I2Voltage = loopOneLHS - (loopTwoLHS * multiplier);
	const I2Resistance = loopOneI1Co - (loopTwoI2Co * multiplier);
	const I2 = (I2Voltage / I2Resistance).toFixed(roundingPrecision);
	
	const I2Result = document.createElement("p");
	I2Result.innerHTML = "I<sub>R2</sub> = " + I2 + "A";

	const I3 = (I2 - I1).toFixed(roundingPrecision);
	
	const I3Result = document.createElement("p");
	I3Result.innerHTML = "I<sub>R3</sub> = " + I3 + "A";

	// Append worked solution
	workedSolution.appendChild(KCL);
	workedSolution.appendChild(loopOne);
	workedSolution.appendChild(loopTwo);
	workedSolution.appendChild(I1Result);
	workedSolution.appendChild(I2Result);
	workedSolution.appendChild(I3Result);

	return I3;
}
