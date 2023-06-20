import React, { useState } from "react";

import "../style/Main.css";
import DayPlan from "./Plan/DayPlan.js";
import WeekPlan from "./Plan/WeekPlan.js";
import MonthPlan from "./Plan/MonthPlan.js";
import YearPlan from "./Plan/YearPlan.js";

function Main() {
  const [selectedPlanType, setSelectedPlanType] = useState("");

  const handlePlanTypeClick = (planType) => {
    setSelectedPlanType(planType);
  };

  return (
    <>
      <div className="planTypeSelector">
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("Daily")}
        >
          Daily
        </span>
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("Weekly")}
        >
          Weekly
        </span>
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("Montly")}
        >
          Montly
        </span>
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("Yearly")}
        >
          Yearly
        </span>
      </div>
      <div className="planTypeContent">
        {selectedPlanType === "Daily" && <DayPlan />}
        {selectedPlanType === "Weekly" && <WeekPlan />}
        {selectedPlanType === "Montly" && <MonthPlan />}
        {selectedPlanType === "Yearly" && <YearPlan />}
      </div>
    </>
  );
}

export default Main;
