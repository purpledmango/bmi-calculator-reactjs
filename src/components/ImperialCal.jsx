import React, { useState } from "react";

const ImperialCal = ({ calculateBmi }) => {
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const weightKg = parseFloat(weightLbs) * 0.453592; // Convert weight from lbs to kg
    const heightMeters =
      parseFloat(heightFt) * 0.3048 + parseFloat(heightIn) * 0.0254; // Convert height from ft and in to meters

    if (
      isNaN(weightKg) ||
      isNaN(heightMeters) ||
      heightMeters <= 0 ||
      weightKg <= 0
    ) {
      setBmi(null);
    } else {
      const bmiValue = weightKg / (heightMeters * heightMeters);
      setBmi(bmiValue.toFixed(2));
      calculateBmi(bmiValue); // Pass the calculated BMI value to the parent component
    }
  };

  return (
    <div className="bg-blue-100 h-72 flex flex-col justify-center rounded">
      <div className="p-5 grid grid-cols-4 items-center">
        <span className="col-span-1 text-sm">Weight</span>
        <input
          className="col-span-3 w-full text-xs p-3"
          type="number"
          value={weightLbs}
          onChange={(e) => setWeightLbs(e.target.value)}
          placeholder="lbs"
        />
      </div>
      <div className="p-5 grid grid-cols-4 gap-2 items-center">
        <span className="col-span-1 text-sm">Height</span>
        <input
          className="col-span-2 w-full text-xs p-3"
          type="number"
          value={heightFt}
          onChange={(e) => setHeightFt(e.target.value)}
          placeholder="ft"
        />
        <input
          className="col-span-1 w-full text-xs p-3"
          type="number"
          value={heightIn}
          onChange={(e) => setHeightIn(e.target.value)}
          placeholder="in"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="rounded px-6 py-3 bg-blue-600 text-white hover:bg-blue-400 hover:text-gray-200"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>
      </div>
    </div>
  );
};

export default ImperialCal;
