import React, { useState } from "react";

const MetriCal = ({ calculateBmi }) => {
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!weight || (!heightCm && (!heightFt || !heightIn))) {
      // If weight or height is not provided, reset BMI and return
      setBmi(null);
      return;
    }

    // Calculate BMI for metric unit system (using centimeters)
    if (heightCm) {
      const weightKg = parseFloat(weight);
      const heightMeters = parseFloat(heightCm) / 100;

      if (isNaN(weightKg) || isNaN(heightMeters) || heightMeters <= 0) {
        setBmi(null);
        return;
      }

      const bmiValue = weightKg / (heightMeters * heightMeters);
      setBmi(bmiValue.toFixed(2));
      calculateBmi(bmiValue.toFixed(2));
    }

    // Calculate BMI for imperial unit system (using feet and inches)
    if (heightFt && heightIn) {
      const weightLb = parseFloat(weight);
      const heightFeet = parseFloat(heightFt);
      const heightInches = parseFloat(heightIn);

      if (
        isNaN(weightLb) ||
        isNaN(heightFeet) ||
        isNaN(heightInches) ||
        heightFeet <= 0 ||
        heightInches < 0 ||
        heightInches >= 12
      ) {
        setBmi(null);
        return;
      }

      const heightInchesTotal = heightFeet * 12 + heightInches;
      const bmiValue =
        (weightLb / (heightInchesTotal * heightInchesTotal)) * 703;
      setBmi(bmiValue.toFixed(2));
      calculateBmi(bmiValue.toFixed(2));
    }
  };

  return (
    <div className="bg-pink-100 h-72 flex flex-col justify-center rounded">
      <div className="p-5 grid grid-cols-4 items-center">
        <span className="col-span-1 text-sm">Weight</span>
        <input
          className="col-span-3 w-full text-xs p-3"
          type="number"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="kgs"
        />
      </div>
      <div className="p-5 grid grid-cols-4 gap-2 items-center">
        <span className="col-span-1 text-sm">Height (cm)</span>
        <input
          className="col-span-3 w-full text-xs p-3"
          type="number"
          name="heightCm"
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          placeholder="cm"
        />
      </div>
      <div className="p-5 grid grid-cols-4 gap-2 items-center">
        <span className="col-span-1 text-sm">Height (ft/in)</span>
        <input
          className="col-span-1 w-full text-xs p-3"
          type="number"
          name="heightFt"
          value={heightFt}
          onChange={(e) => setHeightFt(e.target.value)}
          placeholder="ft"
        />
        <input
          className="col-span-1 w-full text-xs p-3"
          type="number"
          name="heightIn"
          value={heightIn}
          onChange={(e) => setHeightIn(e.target.value)}
          placeholder="in"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="rounded px-6 py-3 bg-pink-600 text-white hover:bg-pink-400 hover:text-gray-200"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>
      </div>
      {bmi !== null && (
        <div>
          <p>Your BMI: {bmi}</p>
          {/* Add the visual meter and styling here */}
        </div>
      )}
    </div>
  );
};

export default MetriCal;
