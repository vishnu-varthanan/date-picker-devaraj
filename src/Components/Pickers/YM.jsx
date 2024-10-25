import { useState } from "react";
import Calendar from "react-calendar";

const YM = () => {
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

  return (
    <div className="YM-datePicker">
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
        view="year"
        minDetail="year"
        onActiveStartDateChange={({ activeStartDate }) => {
          console.log(activeStartDate.getFullYear()); // Update the active year when navigating in the calendar
        }}
        maxDetail="year"
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        formatWeekNumber={(date) => `W${getWeekNumber(date)}`}
      />
    </div>
  );
};

export default YM;
