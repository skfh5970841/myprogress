import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

function DayPlan() {
  const planJsonData = [];
  //planJsonData에 날짜 정보와 함께 백엔드에 데이터를 요청하게 만들어질 예정 / 지금은 프론트에서만 작동하여 LocalStorage를 사용하고 연동은 되지 않게 만드는 중
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  const [dayPlanData, setDayPlanData] = useState(new Date());

  return (
    <>
      <div>
        <h3>Date selector / 하루 일정</h3>
        <DatePicker
          dateFormat="yyyy.MM.dd" // 날짜 형태
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
          //maxDate={new Date()} // maxDate 이후 날짜 선택 불가
          todayButton="On Today" // today 버튼
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <div>
          <h2>
            여기에 이제 선택한 날짜에 대한 계획 데이터를 보여주면 됨 // todoList
            모드와 노말 모드?ss
          </h2>
          <TimePicker onChange={setStartTime} value={startTime} />
          {" 부터 "}
          <TimePicker onChange={setEndTime} value={endTime} />{" "}
          <input type="text" /> <button>Add Plan</button>{" "}
          <button>Save Changes</button>
          <h3>여기부터 선택된 날짜의 계획이 보이게 할거임</h3>
          <ul className="planUl">
            <li>
              nn:nn~NN:NN 까지 / 잠자기 <button>지우기</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DayPlan;
