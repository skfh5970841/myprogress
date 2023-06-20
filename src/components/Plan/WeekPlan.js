import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
// def get_week_num(date):
//   """
//   해당 날짜의 일주일의 시작(같은 주의 일요일)과 일주일의 끝(같은 주의 토요일)을 구하고 그것이 같은 달에서 몇 번째 주인지 세어줍니다.

//   Args:
//     date: 날짜

//   Returns:
//     일주일의 시작(같은 주의 일요일)
//     일주일의 끝(같은 주의 토요일)
//     해당 달의 몇 번째 주
//   """

//   # 일요일의 요일을 구합니다.
//   day_of_week = date.weekday()

//   # 일주일의 시작(같은 주의 일요일)을 구합니다.
//   start_of_week = date - timedelta(days=day_of_week)

//   # 일주일의 끝(같은 주의 토요일)을 구합니다.
//   end_of_week = start_of_week + timedelta(days=6)

//   # 해당 달의 몇 번째 주를 구합니다.
//   week_num = (end_of_week.month - start_of_week.month) // 4 + 1

//   return start_of_week, end_of_week, week_num

// if __name__ == "__main__":
//   # 날짜를 입력합니다.
//   date = datetime.date(2023, 6, 14)

//   # 일주일의 시작(같은 주의 일요일)과 일주일의 끝(같은 주의 토요일)을 구합니다.
//   start_of_week, end_of_week, week_num = get_week_num(date)

//   # 해당 달의 몇 번째 주를 출력합니다.
//   print(week_num)
