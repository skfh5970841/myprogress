import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function YearPlan() {
  const [selectedYear, setSelectedYear] = useState(new Date());

  return (
    <>
      <div>
        <h3>Year selector / 일년 목표</h3>
        <DatePicker
          selected={selectedYear}
          onChange={(date) => setSelectedYear(date)}
          showYearPicker
          dateFormat="yyyy"
        />
      </div>
      <div>여기에 이제 선택한 년도에 대한 계획 데이터를 보여주면 됨</div>
    </>
  );
}

export default YearPlan;
