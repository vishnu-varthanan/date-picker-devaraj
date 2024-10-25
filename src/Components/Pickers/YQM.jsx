import { useEffect, useState } from "react";
import Calendar from "react-calendar";

const quarters = ["Q1", "Q2", "Q3", "Q4"];


const YQM = () => {
  const currentDate = new Date();
  const [activeQuarters, setActiveQuarters] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
    Q4: false,
  });
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(currentYear, 0, 1)
  );


  useEffect(() => {
    const updatedQuarters = {
      Q1: isQuarterActive("Q1", currentYear),
      Q2: isQuarterActive("Q2", currentYear),
      Q3: isQuarterActive("Q3", currentYear),
      Q4: isQuarterActive("Q4", currentYear),
    };
    setActiveQuarters(updatedQuarters);
  }, [currentYear, selectedDates]);

  const isQuarterActive = (quarter, year) => {
    const quarterMonths = {
      Q1: [0, 1, 2], // January, February, March
      Q2: [3, 4, 5], // April, May, June
      Q3: [6, 7, 8], // July, August, September
      Q4: [9, 10, 11], // October, November, December
    };

    const monthsInQuarter = quarterMonths[quarter];

    // Filter dates matching the current year
    const datesInYear = selectedDates.filter(
      (date) => date.getFullYear() === year
    );

    // Get the unique months from the filtered dates
    const monthsInYear = new Set(datesInYear.map((date) => date.getMonth()));

    // Check if all months of the quarter are present in the set
    return monthsInQuarter.every((month) => monthsInYear.has(month));
  };

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

  const handleQuarterClick = (quarter) => {
    const quarters = {
      Q1: [0, 1, 2], // January, February, March
      Q2: [3, 4, 5], // April, May, June
      Q3: [6, 7, 8], // July, August, September
      Q4: [9, 10, 11], // October, November, December
    };

    const isActive = activeQuarters[quarter];
    if (isActive) {
      const monthsInQuarter = quarters[quarter];
      const filtered = selectedDates.filter(
        (date) =>
          date.getFullYear() === currentYear &&
          !monthsInQuarter.includes(date.getMonth())
      );
      setSelectedDates(filtered);
      return;
    }
    // Map the selected quarter's months to their first day
    const selectedQuarters = quarters[quarter].map(
      (month) => new Date(currentYear, month, 1)
    );

    const updatedDates = [...selectedDates, ...selectedQuarters];
    setSelectedDates(updatedDates);
  };

  return (
    <div className="YQM-datePicker">
      <div className="quarters-container">
        {quarters.map((quarter, index) => {
          const isActive = activeQuarters[quarter];

          return (
            <button className={isActive ? 'active' : ''} key={index} onClick={() => handleQuarterClick(quarter)}>
              {quarter}
            </button>
          );
        })}
      </div>
      <Calendar
        onChange={handleDateChange}
        value={activeStartDate}
        tileClassName={({ date }) =>
          selectedDates.some((d) => d.toDateString() === date.toDateString())
            ? "selected-date"
            : null
        }
        selectRange={false}
        showWeekNumbers={true}
        view="year"
        onActiveStartDateChange={({ activeStartDate }) => {
          setActiveStartDate(activeStartDate);
          setCurrentYear(activeStartDate.getFullYear()); // Update the active year when navigating in the calendar
        }}
        minDetail="year"
        maxDetail="year"
        showNavigation={true}
      />
    </div>
  );
};

export default YQM;
