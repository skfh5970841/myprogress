import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";

// useHabits 커스텀 훅 정의
const useHabits = () => {
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
      //console.log(habit);
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

  // useHabits 훅에서 반환하는 값
  return {
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
  };
};

export default useHabits;
