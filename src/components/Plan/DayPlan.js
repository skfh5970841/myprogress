import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

function DayPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [inputPlan, setInputPlan] = useState("");
  const [planList, setPlanList] = useState([]);
  const normalizeTime = (time) => {
    // 시간을 복제하여 원래 시간을 변경하지 않도록 합니다.
    const newTime = new Date(time);

    // 정규화 프로세스: 시간, 분, 초, 밀리초를 삭제하십시오.
    newTime.setHours(0);
    newTime.setMinutes(0);
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);

    return newTime;
  };

  const convertTimeToNumber = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const sortPlannerByTime = (planner) => {
    return planner.sort((a, b) => {
      const timeA = convertTimeToNumber(a.startTime);
      const timeB = convertTimeToNumber(b.startTime);
      return timeA - timeB;
    });
  };
  const getNormalizedKey = (time) => {
    const normalizedTime = normalizeTime(time);
    return normalizedTime.toISOString();
  };

  const addToLocalStorage = (key, value) => {
    const keyVal = getNormalizedKey(key);

    localStorage.setItem(keyVal, JSON.stringify(value));
  };

  const getFromLocalStorage = (key, defaultValue) => {
    const keyVal = getNormalizedKey(key);
    const storedValue = localStorage.getItem(keyVal);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  useEffect(() => {
    const storedData = getFromLocalStorage(selectedDate.toString(), []);

    setPlanList(storedData);
  }, [selectedDate]);
  const isPlanOverlap = (startTime, endTime, plans) => {
    // 입력 검증
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      throw new Error("Invalid time format");
    }
    if (compareTime(startTime, endTime) > 0) {
      throw new Error("Start time should be less than or equal to end time");
    }
    if (plans.length === 0) {
      return false;
    }

    const start = parseInt(startTime.replace(":", ""), 10);
    const end = parseInt(endTime.replace(":", ""), 10);

    return plans.some((plan) => {
      const planStart = parseInt(plan.startTime.replace(":", ""), 10);
      const planEnd = parseInt(plan.endTime.replace(":", ""), 10);

      return (
        (start >= planStart && start < planEnd) ||
        (end > planStart && end <= planEnd) ||
        (start >= planStart && start < planEnd && end > planEnd) ||
        (end > planStart && end <= planEnd && start < planStart)
      );
    });
  };

  // 시간 형식이 유효한지 검사하는 함수
  const isValidTime = (time) => {
    const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  };

  // 두 시간을 비교하는 함수
  // time1이 time2보다 작으면 -1, 같으면 0, 크면 1을 반환
  const compareTime = (time1, time2) => {
    const t1 = parseInt(time1.replace(":", ""), 10);
    const t2 = parseInt(time2.replace(":", ""), 10);
    if (t1 < t2) {
      return -1;
    } else if (t1 === t2) {
      return 0;
    } else {
      return 1;
    }
  };

  const addPlan = () => {
    if (isPlanOverlap(startTime, endTime, planList)) {
      alert(
        "기존의 일정과 겹칩니다. 시간을 조정하거나 기존 일정을 삭제해주세요."
      );
      return;
    }

    const newPlanList = [...planList, { startTime, endTime, task: inputPlan }];
    const sortedPlanList = sortPlannerByTime(newPlanList);
    setPlanList(sortedPlanList);
    addToLocalStorage(selectedDate.toString(), sortedPlanList);
    setInputPlan("");
  };

  const deletePlan = (index) => {
    const newPlanList = [...planList];
    newPlanList.splice(index, 1);
    setPlanList(newPlanList);
    addToLocalStorage(selectedDate.toString(), newPlanList);
  };

  return (
    <>
      <div>
        <h3>Date selector / 하루 일정</h3>
        <DatePicker
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          minDate={new Date("2000-01-01")}
          todayButton="On Today"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <div>
          <h2>
            여기에 이제 선택한 날짜에 대한 계획 데이터를 보여주면 됨 // todoList
            모드와 노말 모드? 이거hahav
          </h2>
          <TimePicker onChange={setStartTime} value={startTime} />
          {" 부터 "}
          <TimePicker onChange={setEndTime} value={endTime} />{" "}
          <input
            type="text"
            value={inputPlan}
            onChange={(e) => setInputPlan(e.target.value)}
          />{" "}
          <button onClick={addPlan}>Add Plan</button>{" "}
          <button
            onClick={() => addToLocalStorage(selectedDate.toString(), planList)}
          >
            Save Changes
          </button>
          <h3>여기부터 선택된 날짜의 계획이 보이게 할거임</h3>
          <ul>
            {planList.map((plan, index) => (
              <li key={index}>
                {plan.startTime}~{plan.endTime} 까지 / {plan.task}{" "}
                <button onClick={() => deletePlan(index)}>지우기</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DayPlan;
