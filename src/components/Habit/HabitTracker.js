import React, { useState, useEffect } from "react";
import useHabits from "./useHabits"; // useHabits 커스텀 훅 가져오기

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
          {habits.map((habit) => (
            <button key={habit.id} onClick={() => handleHabitClick(habit.id)}>
              {habit.title}
            </button>
          ))}
        </p>
      </>
    );
  };

  return <HabitTrackerSetting />;
}

export default HabitTracker;
