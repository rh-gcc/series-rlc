const createTheveninProblem = () => {
	wipeExistingQuestion();
	const componentValues = generateTheveninComponents();
	listComponentValues(componentValues);
	const solution = solveThevenin(componentValues);
	finalAnswer.innerHTML = "I<sub>R</sub> = " + solution; 
}

const generateTheveninComponents = () => {
	// L and C cannot match.
	const componentValues = {	
		V: generateRandomInt(5, 25),
		XL: generateRandomInt(1, 25),
		XC: 0 - generateRandomInt(1, 25),
		R: generateRandomInt(1, 50)
	}
	
	while(componentValues["XL"] == Math.abs(componentValues["XC"])) {
		componentValues["XL"] = generateRandomInt(0, 25);
	}

	return componentValues;
}

const solveThevenin = (componentValues) => {
	const solution = { magnitude: 0, direction: 0 };

	// Find Vth
	const findVth = document.createElement("p");
	findVth.style.fontWeight = "bold";
	findVth.innerHTML = "To find V<sub>TH</sub>, replace R with an open circuit circuit (&#8734;&#8486;)";

	const Vth = { magnitude: 0, direction: 0 }; 
	Vth.magnitude = (componentValues["V"] * (componentValues["XC"] / (componentValues["XC"] + componentValues["XL"]))).toFixed(roundingPrecision); // Voltage divider
	Vth.direction = Vth.magnitude < 0 ? -180 : 0;
	
	const calculateVthMag = document.createElement("p");
	calculateVthMag.innerHTML = "L and C form a voltage divider so |V<sub>TH</sub>| = V * (X<sub>C</sub> / (X<sub>C</sub> + X<sub>L</sub>))<br />|V<sub>TH</sub>| = " + componentValues["V"] + " * (" + componentValues["XC"] + "j / (" + componentValues["XC"] + "j + " + componentValues["XL"] + "j)) = " + Vth.magnitude + "V + 0j";


	const calculateVthDir = document.createElement("p");
	calculateVthDir.innerHTML = "V<sub>TH</sub> = " + Math.abs(Vth.magnitude) + "V &#8736;" + Vth.direction + "&#176;";
	
	Vth.magnitude = Math.abs(Vth.magnitude);
	
	// Find Rth
	const findRth = document.createElement("p");
	findRth.style.fontWeight = "bold";
	findRth.innerHTML = "To find Z<sub>TH</sub>, replace R with an open circuit and V1 with a short circuit (0&#8486;)";
	
	const Rth = { magnitude: 0, direction: 0 }
	Rth.magnitude = ((Math.abs(componentValues["XC"] * componentValues["XL"]) / (componentValues["XC"] + componentValues["XL"])) * -1).toFixed(roundingPrecision);
	Rth.direction = Rth.magnitude < 0 ? -90 : 90;
	Rth.magnitude = Math.abs(Rth.magnitude);

	const calculateRth = document.createElement("p");
	calculateRth.innerHTML = "Z<sub>TH</sub> = X<sub>C</sub> // X<sub>L</sub> = " + Rth.magnitude + "&#8486; &#8736;" + Rth.direction + "&#176;";

	// Norton equivalent
	const theveninEquivalent = document.createElement("img");
	theveninEquivalent.classList = "centre-image";
	theveninEquivalent.src = "circuit-diagrams/thevenin-equivalent.png";

	const IR = { magnitude: 0, direction: 0}
	const ZT = { magnitude: 0, direction: 0}
	ZT.magnitude = (Math.sqrt(Math.pow(componentValues["R"], 2) + Math.pow(Rth.magnitude, 2))).toFixed(roundingPrecision);
	ZT.direction = (radiansToDegrees(Math.atan(Rth.magnitude / componentValues["R"]))).toFixed(roundingPrecision);
	IR.magnitude = Number(Vth.magnitude / ZT.magnitude).toFixed(roundingPrecision);
	IR.direction = Number(Number(Vth.direction) + Number(ZT.direction)).toFixed(roundingPrecision);

	const calculateZT = document.createElement("p");
	calculateZT.innerHTML = "To find the current flowing through R, we need to know the total impedance of the circuit<br />Z<sub>T</sub> = R + Z<sub>TH</sub> = " + componentValues["R"] + (Rth.direction < 0 ? " + " : " - ") + Rth.magnitude + "j = " + ZT.magnitude + "&#8486; &#8736;" + ZT.direction + "&#176;"
	
	const calculateIR = document.createElement("p");
	calculateIR.innerHTML = "I<sub>R</sub> = V<sub>TH</sub> / Z<sub>T</sub> = " + Vth.magnitude + "V &#8736;" + Vth.direction + "&#176; / " + ZT.magnitude + "&#8486; &#8736;" + ZT.direction + "&#176; = " + IR.magnitude + "A &#8736;" + IR.direction + "&#176;";

	// Append worked solution
	workedSolution.appendChild(findVth);
	workedSolution.appendChild(calculateVthMag);
	workedSolution.appendChild(calculateVthDir);
	
	workedSolution.appendChild(findRth);
	workedSolution.appendChild(calculateRth);
	
	workedSolution.appendChild(theveninEquivalent);
	workedSolution.appendChild(calculateZT);
	workedSolution.appendChild(calculateIR);

	return IR.magnitude + "A &#8736;" + IR.direction + "&#176;";
}
