import React, { useState, useEffect } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([]);

  const [selectedHabit, setSelectedHabit] = useState(null);
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
  const handleHabitClick = (habitId) => {
    if (selectedHabit && selectedHabit.id === habitId) {
      setSelectedHabit(null);
    } else {
      const habit = habits.find((h) => h.id === habitId);
      setSelectedHabit(habit);
    }
  };
  return (
    <>
      <p>
        <ol>
          <li>
            여기에 해당되는 요일에 맞춰 습관들의 목록을 표시하고, 체크 표시로
            오늘의 습관을 마무리 했는지, 특이사항은 없는지 적는다.{" "}
          </li>
          <li>
            지금까지 총 몇 번 성공했는지, 이번주/달에는 몇 번 성공했는지,
            시각적으로 표시한다.(달력에 붙은 체크표시, 새싹에서 나무가 자라나는
            기재 등. 식물의 종류를 선택할 수 있게 한다) 그 주/달에 대한 셀프
            피드백을 할 수있게 만든다. 습관에 관한 이번 주 총평 같은 느낌이다.
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
}

export default HabitTracker;
