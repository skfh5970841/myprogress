import React, { useState } from "react";

import "../style/Main.css";
import DayPlan from "./Plan/DayPlan.js";
import WeekPlan from "./Plan/WeekPlan.js";
import MonthPlan from "./Plan/MonthPlan.js";
import YearPlan from "./Plan/YearPlan.js";
import HabitTrackerSetting from "./Habit/HabitTrackerSetting.js";
import HabitTracker from "./Habit/HabitTracker.js";

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
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("HabitTrackerSetting")}
        >
          Habit Tracker Setting
        </span>
        <span
          className="selectorType"
          onClick={() => handlePlanTypeClick("HabitTracker")}
        >
          Habit Tracker
        </span>
      </div>
      <div className="planTypeContent">
        {selectedPlanType === "Daily" && <DayPlan />}
        {selectedPlanType === "Weekly" && <WeekPlan />}
        {selectedPlanType === "Montly" && <MonthPlan />}
        {selectedPlanType === "Yearly" && <YearPlan />}
        {selectedPlanType === "HabitTrackerSetting" && <HabitTrackerSetting />}
        {selectedPlanType === "HabitTracker" && <HabitTracker />}
      </div>
    </>
  );
}

export default Main;
