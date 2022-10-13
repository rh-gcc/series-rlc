// Store DOM elements in global memory
let questionTitle, questionText, circuitDiagram, workedSolution, finalAnswers, componentValuesList;
let workedSolutionWrapper, finalAnswersWrapper, solutions;
let toggleFinalAnswer, toggleWorkedSolution;

// Set calculation precision
const roundingPrecision = 2; // decimal places

// Store common symbols as HTML/hex entities
const phaseAngleSymbol = "&#x2220;";
const degreeSymbol = "&#176;";
const microSymbol = "&#181;";
const ohmSymbol = "&#8486;"

// Generate a random integer within the range.
const generateRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// List component reference designators and their values.
const listComponentValues = (componentValues) => {
  
  componentValuesList.innerHTML = "<b><h5>Circuit Values</h5></b>"
  for(let i = 0; i < Object.keys(componentValues).length; i++) {
		const componentValue = document.createElement("li");
    componentRefDes = Object.keys(componentValues)[i];
    componentValue.innerHTML = componentRefDes + " = ";

    // If component is voltage source, list out value in polar form, as well as frequency.
		if(componentRefDes == "V1") {
			componentValue.innerHTML += Object.values(componentValues)[i].magnitude + "V " + phaseAngleSymbol + Object.values(componentValues)[i].phaseAngle  + degreeSymbol + " @ " + Object.values(componentValues)[i].frequency + "Hz";
    } else {
      // Append value of component to DOM element (if not voltage source)
      componentValue.innerHTML += Object.values(componentValues)[i];
    }

    // Add symbols for component values.
    if (componentRefDes == "R1") {
			componentValue.innerHTML += ohmSymbol;
    } else if(componentRefDes == "C1") {
      componentValue.innerHTML += microSymbol + "F"
    } else if(componentRefDes == "L1") {
      componentValue.innerHTML += "mH"
    }

		componentValuesList.appendChild(componentValue);
	}
}

// Reset for new question to be generated
const wipeExistingQuestion = () => {
	workedSolution.innerHTML = "";
	finalAnswers.innerHTML = "";
	componentValuesList.innerHTML = "";
	finalAnswersWrapper.style.display = "none";
	workedSolutionWrapper.style.display = "none";
	solutions.style.display = "block";
}


// When the page loads...
window.onload = () => {
  // Get and store DOM element objects.
	questionText = document.getElementById("questionText");
	circuitDiagram = document.getElementById("circuitDiagram");
	componentValuesList = document.getElementById("componentValues");
	
	solutions = document.getElementById("solutions");
	finalAnswersWrapper = document.getElementById("finalAnswersWrapper");
	finalAnswers = document.getElementById("finalAnswers");
	workedSolutionWrapper = document.getElementById("workedSolutionWrapper");
	workedSolution = document.getElementById("workedSolution");
	
	toggleFinalAnswers = document.getElementById("toggleFinalAnswers");
	toggleWorkedSolution = document.getElementById("toggleWorkedSolution");

  // Open final answers on click of button
	toggleFinalAnswers.addEventListener("click", () => {
		if(finalAnswersWrapper.style.display == "none") {
			finalAnswersWrapper.style.display = "block";
		} else {
			finalAnswersWrapper.style.display = "none";
		}
	})

  // Open worked solutions on click of button
	toggleWorkedSolution.addEventListener("click", () => {
		if(workedSolutionWrapper.style.display == "none") {
			workedSolutionWrapper.style.display = "block";
		} else {
			workedSolutionWrapper.style.display = "none";
		}
	})
  
  document.getElementById("generateNewProblem").addEventListener("click", () => {
    createProblem();
    window.location.href = "#";
  })

  // Add question text to DOM
  questionText.innerHTML = "<b><h5>Calculate the Following</h5></b><ol type='a' style='list-style: lower-alpha outside;'><li>Total impedance (Z)</li><li>Total current (I)</li><li>Voltage across each component - V<sub>R1</sub>, V<sub>L1</sub>, V<sub>C1</sub></li><li>Power - apparent (S), real (P), and reactive (Q)</li><li>Power factor (PF), and determine if it is leading or lagging</li></ol>";
	circuitDiagram.src = "circuit-diagrams/seriesRlc.png";
  // Generate problem.
  createProblem();	
}

const createProblem = () => {
  // Clear existing problem
  wipeExistingQuestion();

  // Create new random component values
	const componentValues = generateComponents();
  listComponentValues(componentValues);

  // Solve circuit
  const answers = solveCircuit(componentValues);

  // Add final answers to DOM
  answers.forEach((answer) => {
    finalAnswers.innerHTML += answer + "<br/>"
  })
}

// Convert rectangular form to polar form
const rectToPolar = (real, complex) => {
  return { magnitude: Math.sqrt(real**2 + complex**2).toFixed(roundingPrecision), phaseAngle: (Math.atan(complex / real) * (180/Math.PI)).toFixed(roundingPrecision) }
}

// Convert polar form to rectangular form
const polarToRect = (magnitude, phaseAngle) => {
  const real = magnitude * (Math.cos(phaseAngle * (Math.PI/180)));
  const complex = magnitude * (Math.sin(phaseAngle * (Math.PI/180)))
  return { real: real.toFixed(roundingPrecision), complex: complex.toFixed(roundingPrecision) };
}

// Randomly generate component values
const generateComponents = () => {
	// L and C cannot match.
	const componentValues = {	
    "V1": { magnitude: generateRandomInt(15, 100), phaseAngle: 0, frequency: generateRandomInt(100, 1000) },
    "R1": generateRandomInt(10, 47),
		"L1": generateRandomInt(10, 22),
		"C1": generateRandomInt(5, 18)
	}
	
	return componentValues;
}

// Solve the randomly generated circuit
const solveCircuit = (componentValues) => {

  // Get key component values
  const V = componentValues["V1"].magnitude;
  const f = componentValues["V1"].frequency;
  const R = componentValues["R1"];
  const L = componentValues["L1"] * 10**-3; // Convert from micro
  const C = componentValues["C1"] * 10**-6; // Convert from milli

  // a) Total impedance
	const findZTitle = document.createElement("p");
  findZTitle.style.fontWeight = "bold";
  findZTitle.innerHTML = "a) Find the total impedance (Z)";

	const findZExplainer = document.createElement("p");
  findZExplainer.innerHTML = "To find the total impedance, we need to know the resistances and reactances in the circuit";

  // Find reactance of C
	const findXC = document.createElement("p");
  findXC.innerHTML = "Find X<sub>C</sub>:<br/><img src='equations/capacitive-reactance.png' /></br>Where:";
  findXC.innerHTML += "<ul><li>C = " + componentValues["C1"] + microSymbol + "F</li><li>f = " + f + "Hz</li></ul>";
  findXC.innerHTML += "<b>Remember:</b> to convert from " + microSymbol + "F to F, you need to multiply by <b>10<sup>-6</sup></b>.<br /><br />";

  XC = (1 / (2 * Math.PI * f * C)).toFixed(roundingPrecision);

  findXC.innerHTML += "X<sub>C</sub> = <b>" + XC + ohmSymbol + "</b>";
  
  // Find reactance of L
	const findXL = document.createElement("p");
  findXL.innerHTML = "<br />Find X<sub>L</sub>:<br /><img src='equations/inductive-reactance.png' /><br />Where:";
  findXL.innerHTML += "<ul><li>L = " + componentValues["L1"] + "mF</li><li>f = " + f + "Hz</li></ul>";
  findXL.innerHTML += "<b>Remember:</b> to convert from mH to H, you need to multiply by <b>10<sup>-3</sup></b>.<br /><br />";

  XL = (2 * Math.PI * f * L).toFixed(roundingPrecision);

  findXL.innerHTML += "X<sub>L</sub> = <b>" + XL + ohmSymbol + "</b>";

	const findZRect = document.createElement("p");
  findZRect.innerHTML = "First, find the total impedance in rectangular form:";

  const ZRect = { real: R, complex: XL - XC }
  
  findZRect.innerHTML += "<br />Z = R + jX<sub>L</sub> - jX<sub>C</sub> = " + R + ohmSymbol + " + j" + XL + ohmSymbol + " - j" + XC + ohmSymbol;
  findZRect.innerHTML += "<br/ >Z = " + ZRect.real + ohmSymbol + (ZRect.complex < 0 ? " - " : " + ") + " j" + Math.abs(ZRect.complex) + ohmSymbol;

	const findZPolar = document.createElement("p");
  findZPolar.innerHTML = "Then convert into polar form using your calculator: ";
  findZPolar.innerHTML += "<br />Z = Pol(Real, Complex) = Pol(" + ZRect.real + ", " + ZRect.complex + ")";

  ZPolar = rectToPolar(ZRect.real, ZRect.complex);

  const ZAnswer = "Z = " + ZPolar.magnitude + ohmSymbol + " " + phaseAngleSymbol + ZPolar.phaseAngle + degreeSymbol;
  findZPolar.innerHTML += "<br /><b>" + ZAnswer + "</b>";

  // b) Total current
	const findITitle = document.createElement("p");
  findITitle.style.fontWeight = "bold";
  findITitle.innerHTML = "b) Find the total current (I)";

	const findIExplainer = document.createElement("p");
  findIExplainer.innerHTML = "Since we know the supply voltage and the total impedance, we can use <b>Ohm's law</b> to calculate the total current.";
  findIExplainer.innerHTML += "<br /><br /><b>Remember:</b> to divide two complex numbers in <b>polar</b> form, you <b>divide the magnitudes</b> and <b>subtract the phase angles</b>."

	const findI = document.createElement("p");
  findI.innerHTML = "I = V / Z";
  findI.innerHTML += "<br/>" + V + "V " + phaseAngleSymbol + "0" + degreeSymbol + " / " + ZPolar.magnitude + ohmSymbol + " " + phaseAngleSymbol + ZPolar.phaseAngle + degreeSymbol;

  IPolar = { magnitude: (V / ZPolar.magnitude).toFixed(roundingPrecision), phaseAngle: Number((0 - ZPolar.phaseAngle)).toFixed(roundingPrecision) };

  const IAnswer = "I = " + IPolar.magnitude + "A " + phaseAngleSymbol + IPolar.phaseAngle + degreeSymbol;
  findI.innerHTML += "<br /><br /><b>" + IAnswer + "</b>"
  
  // c) Voltage across each component
	const findVTitle = document.createElement("p");
  findVTitle.style.fontWeight = "bold";
  findVTitle.innerHTML = "c) Find the voltage across each component - V<sub>R</sub>, V<sub>L</sub>, V<sub>C</sub>";

	const findVExplainer = document.createElement("p");
  findVExplainer.innerHTML = "Since we know the resistance/reactance of each component and current flowing through them, we can use <b>Ohm's law</b> to calculate the voltage across each component.";
  findVExplainer.innerHTML += "<br /><br /><b>Remember:</b> To multiply two complex numbers in polar form, you <b>multiply the magnitudes</b> and <b>add the phase angles</b>."

	const findVR = document.createElement("p");
  findVR.innerHTML = "V<sub>R</sub> = IR";
  findVR.innerHTML += "<br/>" + IPolar.magnitude + "A " + phaseAngleSymbol + IPolar.phaseAngle + degreeSymbol + " * " + R + ohmSymbol + " " + phaseAngleSymbol + "0" + degreeSymbol;

  VRPolar = { magnitude: (IPolar.magnitude * R).toFixed(roundingPrecision), phaseAngle: Number((IPolar.phaseAngle + 0)).toFixed(roundingPrecision) };

  const VRAnswer = "V<sub>R</sub> = " + VRPolar.magnitude + "V " + phaseAngleSymbol + VRPolar.phaseAngle + degreeSymbol

  findVR.innerHTML += "<br /><b>" + VRAnswer + "</b>"
  
  const findVL = document.createElement("p");
  findVL.innerHTML = "<br/>V<sub>L</sub> = IX<sub>L</sub>";
  findVL.innerHTML += "<br/>" + IPolar.magnitude + "A " + phaseAngleSymbol + IPolar.phaseAngle + degreeSymbol + " * " + XL + ohmSymbol + " " + phaseAngleSymbol + "90" + degreeSymbol;

  VLPolar = { magnitude: (IPolar.magnitude * XL).toFixed(roundingPrecision), phaseAngle: (Number(IPolar.phaseAngle) + 90).toFixed(roundingPrecision) };

  const VLAnswer = "V<sub>L</sub> = " + VLPolar.magnitude + "V " + phaseAngleSymbol + VLPolar.phaseAngle + degreeSymbol;
  
  findVL.innerHTML += "<br /><b>" + VLAnswer + "</b>";
  
  const findVC = document.createElement("p");
  findVC.innerHTML = "<br/>V<sub>C</sub> = IX<sub>C</sub>";
  findVC.innerHTML += "<br/>" + IPolar.magnitude + "A " + phaseAngleSymbol + IPolar.phaseAngle + degreeSymbol + " * " + XC + ohmSymbol + " " + phaseAngleSymbol + "-90" + degreeSymbol;

  VCPolar = { magnitude: (IPolar.magnitude * XC).toFixed(roundingPrecision), phaseAngle: (Number(IPolar.phaseAngle) - 90).toFixed(roundingPrecision) };

  const VCAnswer = "V<sub>C</sub> = " + VCPolar.magnitude + "V " + phaseAngleSymbol + VCPolar.phaseAngle + degreeSymbol;

  findVC.innerHTML += "<br /><b>" + VCAnswer +"</b>"

  // d) Find the apparent power (S), real power (P), reactive power (Q)

	const findPowerTitle = document.createElement("p");
  findPowerTitle.style.fontWeight = "bold";
  findPowerTitle.innerHTML = "d) Find the apparent power (S), real power (P), and reactive power (Q) used by the circuit.";

	const findPowerExplainer = document.createElement("p");
  findPowerExplainer.innerHTML = "Since we know the total current flowing and the voltage applied to the circuit, we can calculate the power used by the circuit.";
  findPowerExplainer.innerHTML += "<br /><br /><b>Remember:</b> To multiply two complex numbers in polar form, you <b>multiply the magnitudes</b> and <b>add the phase angles</b>."

	const findS = document.createElement("p");
  findS.innerHTML = "S = IV";
  findS.innerHTML += "<br/>" + IPolar.magnitude + "A " + phaseAngleSymbol + IPolar.phaseAngle + degreeSymbol + " * " + V + "V " + phaseAngleSymbol + "0" + degreeSymbol;

  SPolar = { magnitude: (IPolar.magnitude * V).toFixed(roundingPrecision), phaseAngle: Number((IPolar.phaseAngle + 0)).toFixed(roundingPrecision) };

  const SAnswer = "S = " + SPolar.magnitude + "VA " + phaseAngleSymbol + SPolar.phaseAngle + degreeSymbol;
  findS.innerHTML += "<br /><b>" + SAnswer + "</b>"

  SRect = polarToRect(SPolar.magnitude, SPolar.phaseAngle)

  findS.innerHTML += "<br/><br/>The <b>real power (P)</b> and <b>reactive power (Q)</b> can be found by converting the apparent power to the <b>rectangular</b> form.<br/><br/>The <b>real</b> part is the <b>real power</b>, the <b>complex</b> part is the <b>reactive power</b>.";
  findS.innerHTML += "<br/> You can do this on your calculator:"
  findS.innerHTML += "<br/><br/>S = Rec(Magnitude, Phase Angle) = Rec(" + SPolar.magnitude + "," + SPolar.phaseAngle + ")";
  findS.innerHTML += "<br/ >S = " + SRect.real + "W " + (SRect.complex < 0 ? " - " : " + ") + " j" + Math.abs(SRect.complex) + "VAr";

  const PAnswer = "P = " + SRect.real + "W"
  const findP = document.createElement("p");
  findP.innerHTML = "<b>" + PAnswer + "</b>";

  const QAnswer = "Q = " + Math.abs(SRect.complex) + "VAr";
  const findQ = document.createElement("p");
  findQ.innerHTML = "<b>" + QAnswer + "</b>";
  
  // e) Power factor
	const findPFTitle = document.createElement("p");
  findPFTitle.style.fontWeight = "bold";
  findPFTitle.innerHTML = "e) Find the power factor of the circuit";

	const findPFExplainer = document.createElement("p");
  findPFExplainer.innerHTML = "The power factor tells how much of the apparent power is used to perform real work - it is the ratio between apparent power and real power.";

	const findPF = document.createElement("p");
  findPF.innerHTML = "PF = P / S<br/>";

  PF = (SRect.real / SPolar.magnitude).toFixed(roundingPrecision);

  findPF.innerHTML += "= " + SRect.real + "W / " + SPolar.magnitude + "VA<br />";

  PFAnswer = "PF = " + PF + (IPolar.phaseAngle < 0 ? ", leading" : ", lagging");
  
  findPF.innerHTML += "<b>" + PFAnswer + "</b>";
  
  findPF.innerHTML += "<br /><br />Since the current has a <b>" + (IPolar.phaseAngle < 0 ? "negative" : "positive") + "</b> phase shift we say it is <b>" + (IPolar.phaseAngle < 0 ? "leading" : "lagging") + "</b>";

  // Append worked solution to DOM
  // a) Total impedance
	workedSolution.appendChild(findZTitle);
	workedSolution.appendChild(findZExplainer);
	workedSolution.appendChild(findXC);
	workedSolution.appendChild(findXL);
	workedSolution.appendChild(findZRect);
	workedSolution.appendChild(findZPolar);

  workedSolution.innerHTML += "<hr/>";

  // b) Total current
	workedSolution.appendChild(findITitle);
	workedSolution.appendChild(findIExplainer);
	workedSolution.appendChild(findI);
  
  workedSolution.innerHTML += "<hr/>";

  // c) Find the voltages across each component
	workedSolution.appendChild(findVTitle);
	workedSolution.appendChild(findVExplainer);
	workedSolution.appendChild(findVR);
	workedSolution.appendChild(findVL);
	workedSolution.appendChild(findVC);
  
  workedSolution.innerHTML += "<hr/>";
  
  // d) Find the power
	workedSolution.appendChild(findPowerTitle);
	workedSolution.appendChild(findPowerExplainer);
	workedSolution.appendChild(findS);
	workedSolution.appendChild(findP);
	workedSolution.appendChild(findQ);
  
  workedSolution.innerHTML += "<hr/>";
  
  // d) Find the power factor
	workedSolution.appendChild(findPFTitle);
	workedSolution.appendChild(findPFExplainer);
	workedSolution.appendChild(findPF);

  // Return final answers to each question as an array (to be added to DOM in callback)
  return [ ZAnswer, IAnswer, VRAnswer, VLAnswer, VCAnswer, SAnswer, PAnswer, QAnswer, PFAnswer ];
}

