import React, { useState, useEffect } from "react";
import useHabits from "./useHabits"; // useHabits 커스텀 훅 가져오기
import { getTest } from "./getTest";

function HabitTracker() {
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
    const [testData, setTestData] = useState(null);
    const [checkHabit, setCheckHabit] = useState(false);

    useEffect(() => {
      async function fetchData() {
        const test = "testProgress"; // 필요한 test 값을 가져옵니다.
        const result = await getTest(test);
        setTestData(result);
      }

      fetchData();
    }, []);

    if (!testData) {
      return <div>Loading...</div>;
    }

    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일

    const habitCheckClicked = (event) => {
      setCheckHabit(event.target.checked);
      if (event.target.checked === true) {
        localStorage.setItem(selectedHabit.title, "true");
      } else {
        localStorage.setItem(selectedHabit.title, "false");
      }
    };

    return (
      <>
        <p>
          <ol>
            <li>
              여기에 해당되는 요일에 맞춰 습관들의 목록을 표시하고, 체크 표시로
              오늘의 습관을 마무리 했는지, 특이사항은 없는지 적는다.
            </li>
            <li>
              지금까지 총 몇 번 성공했는지, 이번주/달에는 몇 번 성공했는지,
              시각적으로 표시한다.(달력에 붙은 체크표시, 새싹에서 나무가
              자라나는 기재 등. 식물의 종류를 선택할 수 있게 한다) 그 주/달에
              대한 셀프 피드백을 할 수있게 만든다. 습관에 관한 이번 주 총평 같은
              느낌이다.
            </li>
          </ol>
        </p>

        <h2>Today : {year + "/" + month + "/" + date}</h2>
        <ul>
          <label>
            <h3>You did</h3>
          </label>
          <li>습관1</li>
          <li>습관2</li>
        </ul>
        <h2>Habit List</h2>
        {habits.map((habit) => (
          <button key={habit.id} onClick={() => handleHabitClick(habit.id)}>
            {habit.title}
          </button>
        ))}
        {selectedHabit != null ? (
          <>
            <div>
              <h3>습관 제목 : {selectedHabit.title}</h3>
              <input type="checkbox" onChange={habitCheckClicked} />
            </div>
          </>
        ) : (
          <div>읎어얀</div>
        )}
        {JSON.stringify(testData)}
      </>
    );
  };

  return <HabitTrackerSetting />;
}

export default HabitTracker;
