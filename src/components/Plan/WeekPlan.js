import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFromLocalStorageWithRange } from "../storage/storageHelpers.js";

function WeekPlan() {
  const [date, setDate] = useState(new Date());
  const [weekNum, setWeekNum] = useState(0);
  const onSelectDate = (date) => {
    setDate(date);
  };
  function getWeekInfo(date) {
    // 입력 받은 날짜를 처음(직전의 일요일)과 끝(직후의 토요일)으로 설정
    const start = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay()
    );
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (6 - date.getDay())
    );
    //
    console.log(
      getFromLocalStorageWithRange(
        start.toLocaleDateString(),
        end.toLocaleDateString()
      )
    );
    //
    return {
      start: start.toLocaleDateString(),
      end: end.toLocaleDateString(),
    };
  }

  return (
    <>
      <div>
        <h3>Week selector / 일주 일정</h3>

        <DatePicker
          dateFormat="yyyy.MM.dd" // 날짜 형태
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
          //maxDate={new Date()} // maxDate 이후 날짜 선택 불가
          todayButton="On Today" // today 버튼
          selected={date}
          onChange={(date) => setDate(date)}
        />

        <p>
          <p>Selected date: {date.toLocaleDateString()}</p>
          <p>
            <span>{getWeekInfo(date).start}</span>
            {"~"}
            <span>{getWeekInfo(date).end}</span>
          </p>
        </p>
        <div>여기에 이제 선택한 주에 대한 계획 데이터를 보여주면 됨</div>
      </div>
    </>
  );
}

export default WeekPlan;
