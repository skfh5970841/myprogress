import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthPlan() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <>
      <div>
        <h3>Mounth selector / 한달 일정</h3>
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="yyyy. MM"
          showMonthYearPicker
          showFullMonthYearPicker
        />
      </div>
      <div>여기에 이제 선택한 달에 대한 계획 데이터를 보여주면 됨</div>
    </>
  );
}

export default MonthPlan;
