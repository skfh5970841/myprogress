import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import useHabits from "./useHabits"; // useHabits 커스텀 훅 가져오기

const HabitTrackerSetting = () => {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedDays,
    setSelectedDays,
    title,
    setTitle,
    description,
    setDescription,
    habits,
    setHabits,
    selectedHabit,
    setSelectedHabit,
    editing,
    setEditing,
    showForm,
    setShowForm,
    editingTitle,
    setEditingTitle,
    editingPeriod,
    setEditingPeriod,
    editingDescription,
    setEditingDescription,
    editingStartTime,
    setEditingStartTime,
    editingEndTime,
    setEditingEndTime,
    days,
    handleClick,
    validateInputs,
    saveHabit,
    handleHabitClick,
    handleEdit,
    handleDelete,
  } = useHabits(); // useHabits 커스텀 훅 적용

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
              placeholder="습관 이름을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <br />
          <span>--- 선택사항 ---</span>
          <div className="Description">
            <h3>상세 정보</h3>
            <input
              placeholder="습관에 대한 설명을 입력하세요"
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
                  placeholder="습관 제목을 입력하세요"
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
                  placeholder="상세 정보를 입력하세요"
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
