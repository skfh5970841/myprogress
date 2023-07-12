import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";

const HabitTrackerSetting = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [selectedDays, setSelectedDays] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingPeriod, setEditingPeriod] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingStartTime, setEditingStartTime] = useState("00:00");
  const [editingEndTime, setEditingEndTime] = useState("23:59");

  const days = [
    { day: "월", order: 1 },
    { day: "화", order: 2 },
    { day: "수", order: 3 },
    { day: "목", order: 4 },
    { day: "금", order: 5 },
    { day: "토", order: 6 },
    { day: "일", order: 7 },
  ];

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));

    if (storedHabits) {
      const parsedHabits = storedHabits.map((habit) => {
        return {
          ...habit,
          date: new Date(habit.date),
        };
      });
      setHabits(parsedHabits);
    }
  }, []);

  const handleClick = (day) => {
    if (selectedDays.some((d) => d.day === day.day)) {
      setSelectedDays(
        selectedDays
          .filter((d) => d.day !== day.day)
          .sort((a, b) => a.order - b.order)
      );
    } else {
      setSelectedDays([...selectedDays, day].sort((a, b) => a.order - b.order));
    }
  };

  const validateInputs = () => {
    if (selectedDays.length === 0 || title.trim() === "") {
      alert("필수 입력 사항을 작성해주세요");
      return false;
    }

    const startHours = parseInt(startTime.split(":")[0]);
    const startMinutes = parseInt(startTime.split(":")[1]);
    const endHours = parseInt(endTime.split(":")[0]);
    const endMinutes = parseInt(endTime.split(":")[1]);

    if (
      startHours > endHours ||
      (startHours === endHours && startMinutes >= endMinutes)
    ) {
      alert("시작 시간과 종료 시간이 올바른지 확인해주세요");
      return false;
    }

    return true;
  };

  const saveHabit = () => {
    if (!validateInputs()) return;

    const newHabit = {
      id: Date.now(),
      date: selectedDate.toISOString(),
      startTime,
      endTime,
      days: selectedDays,
      title,
      description,
    };

    setHabits([...habits, newHabit]);
    localStorage.setItem("habits", JSON.stringify([...habits, newHabit]));
  };

  const handleHabitClick = (habitId) => {
    if (selectedHabit && selectedHabit.id === habitId) {
      setSelectedHabit(null);
    } else {
      const habit = habits.find((h) => h.id === habitId);
      setSelectedHabit(habit);
    }
  };

  const handleEdit = (habitId) => {
    const habitIndex = habits.findIndex((h) => h.id === habitId);
    const updatedHabits = [...habits];
    updatedHabits[habitIndex] = {
      ...selectedHabit,
      date: selectedDate.toISOString(),
      startTime: editingStartTime,
      endTime: editingEndTime,
      days: selectedDays,
      title: editingTitle,
      description: editingDescription,
    };

    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setEditing(false);
  };

  const handleDelete = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setSelectedHabit(null);
  };

  return (
    <>
      <h1>습관 트래커</h1>
      <button onClick={() => setShowForm(!showForm)}>습관추가</button>
      {showForm && (
        <div className="HabitAdd">
          <DatePicker
            onChange={(date) => {
              setSelectedDate(date);
            }}
            selected={selectedDate}
          />
          <div className="Period">
            <h3>주기 설정</h3>
            <div>
              {days.map((day) => (
                <span
                  key={day.day}
                  onClick={() => handleClick(day)}
                  style={{
                    fontWeight: selectedDays.some((d) => d.day === day.day)
                      ? "bold"
                      : "normal",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                >
                  {day.day}
                </span>
              ))}
              <div>
                선택된 요일:{" "}
                {selectedDays.length > 0
                  ? selectedDays.map((d) => d.day).join(", ")
                  : "없음"}
              </div>
            </div>
          </div>
          <div className="Name">
            <h3>제목</h3>
            <input
              placeholder="Write your Habit Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <br />
          <span>--- 선택사항 ---</span>
          <div className="Description">
            <h3>상세 정보</h3>
            <input
              placeholder="Explain your Habit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className="TimeSelect">
            <h3>시작 시간 / 종료 시간</h3>
            <TimePicker onChange={setStartTime} value={startTime} />
            {" 부터 "}
            <TimePicker onChange={setEndTime} value={endTime} />
          </div>
          <br />
          <button onClick={saveHabit}>저장</button>
        </div>
      )}

      {habits.map((habit) => (
        <button key={habit.id} onClick={() => handleHabitClick(habit.id)}>
          {habit.title}
        </button>
      ))}
      {selectedHabit && (
        <div className="HabitDetails">
          {!editing ? (
            <>
              <h2>{selectedHabit.title}</h2>
              <h4>
                시작 날짜: {new Date(selectedHabit.date).toLocaleDateString()}
              </h4>
              <h4>주기: {selectedHabit.days.map((d) => d.day).join(", ")}</h4>
              <h4>상세 정보: {selectedHabit.description}</h4>
              <h4>
                시작 시간: {selectedHabit.startTime} / 종료 시간:{" "}
                {selectedHabit.endTime}
              </h4>
              <button onClick={() => setEditing(true)}>습관 편집</button>
              <button onClick={() => handleDelete(selectedHabit.id)}>
                습관 삭제
              </button>
            </>
          ) : (
            <>
              <h2>
                <label>습관 제목 : </label>
                <input
                  placeholder="습관 제목 임마"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                ></input>
              </h2>
              <h4>
                <label>반복 주기: </label>
                {days.map((day) => (
                  <span
                    key={day.day}
                    onClick={() => handleClick(day)}
                    style={{
                      fontWeight: selectedDays.some((d) => d.day === day.day)
                        ? "bold"
                        : "normal",
                      margin: "0 5px",
                      cursor: "pointer",
                    }}
                  >
                    {day.day}
                  </span>
                ))}
                <div>
                  선택된 요일:{" "}
                  {selectedDays.length > 0
                    ? selectedDays.map((d) => d.day).join(", ")
                    : "없음"}
                </div>
              </h4>
              <h4>
                상세 정보:{" "}
                <input
                  placeholder="상세 정보 임마"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                ></input>
              </h4>
              <div className="TimeSelect">
                <h3>시작 시간 / 종료 시간</h3>
                <TimePicker
                  onChange={setEditingStartTime}
                  value={editingStartTime}
                />
                {" 부터 "}
                <TimePicker
                  onChange={setEditingEndTime}
                  value={editingEndTime}
                />
              </div>
              <button onClick={() => handleEdit(selectedHabit.id)}>
                편집 완료
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HabitTrackerSetting;
