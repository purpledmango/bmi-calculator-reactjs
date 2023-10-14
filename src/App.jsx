import React, { useState } from "react";
import MetriCal from "./components/MetriCal";
import ImperialCal from "./components/ImperialCal";

const App = () => {
  const [bmi, setBmi] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric"); // Initial unit system is set to "metric"

  const calculateBMI = (bmiValue) => {
    setBmi(bmiValue.toFixed(2));
  };

  const toggleUnitSystem = () => {
    // Toggle the unit system between "metric" and "imperial"
    setUnitSystem((prevUnitSystem) =>
      prevUnitSystem === "metric" ? "imperial" : "metric"
    );
    setBmi(null); // Reset the BMI value when the unit system is toggled
  };

  return (
    <div>
      <button
        onClick={toggleUnitSystem}
        className={`bg-${
          unitSystem === "metric" ? "pink" : "gray-500"
        } px-4 py-2 text-white rounded`}
      >
        {unitSystem === "metric" ? "Metric" : "Imperial"}
      </button>
      {unitSystem === "metric" ? (
        <MetriCal calculateBmi={calculateBMI} />
      ) : (
        <ImperialCal calculateBmi={calculateBMI} />
      )}
      {bmi !== null && (
        <div>
          <p>Your BMI: {bmi}</p>
          {/* Visual BMI Meter */}
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              backgroundColor: "#ccc",
              height: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${(bmi / 40) * 100}%`,
                backgroundColor:
                  bmi < 18.5
                    ? "red"
                    : bmi < 25
                    ? "green"
                    : bmi < 30
                    ? "orange"
                    : "red",
                height: "100%",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
