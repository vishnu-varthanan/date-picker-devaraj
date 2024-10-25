import { useState } from "react";
import Calendar from "react-calendar";

const DWM = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDates((prevDates) => {
      const dateStr = date.toDateString();
      if (prevDates.some((d) => d.toDateString() === dateStr)) {
        return prevDates.filter((d) => d.toDateString() !== dateStr);
      } else {
        return [...prevDates, date];
      }
    });
  };

  const getWeekNumber = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const handleWeekClick = (weekNumber, date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      weekDates.push(currentDate);
    }

    setSelectedDates((prevDates) => {
      const newDates = [...prevDates];
      weekDates.forEach((date) => {
        const dateStr = date.toDateString();
        const index = newDates.findIndex((d) => d.toDateString() === dateStr);
        if (index === -1) {
          newDates.push(date);
        } else {
          newDates.splice(index, 1);
        }
      });
      return newDates;
    });
  };

  return (
      <Calendar
        onChange={handleDateChange}
        value={null}
        tileClassName={({ date }) =>
          selectedDates.some((d) => d.toDateString() === date.toDateString())
            ? "selected-date"
            : null
        }
        selectRange={false}
        showWeekNumbers={true}
        onClickWeekNumber={handleWeekClick}
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        formatWeekNumber={(date) => `W${getWeekNumber(date)}`}
      />
  );
};

export default DWM;
