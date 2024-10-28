import { useEffect, useState } from "react";
import Calendar from "react-calendar";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

const YQMM = ({ currentYearIndex, fiscalMonth }) => {
  const currentDate = new Date();
  const [activeQuarters, setActiveQuarters] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
    Q4: false,
  });
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [activeYears, setActiveYears] = useState([currentDate.getFullYear()]); // Tracks active years
  const [baseYear, setBaseYear] = useState(currentYear);
  // const [showYear, setShowYear] = useState(currentDate.getFullYear());
  const [quarterMonths, setQuarterMonths] = useState({
    Q1: [0, 1, 2], // January, February, March
    Q2: [3, 4, 5], // April, May, June
    Q3: [6, 7, 8], // July, August, September
    Q4: [9, 10, 11], // October, November, December
  });

  // Generate a 4-year range with the current year at the given index
  const generateYearRange = (year, index) => {
    const range = Array.from({ length: 4 }, (_, i) => year - index + i);
    return range;
  };

  const yearRange = generateYearRange(baseYear, currentYearIndex);

  // Shift the base year range backward
  const handlePrev = () => {
    setBaseYear((prev) => prev - 4);
  };

  // Shift the base year range forward
  const handleNext = () => {
    setBaseYear((prev) => prev + 4);
  };

  useEffect(() => {
    const updatedQuarters = {
      Q1: isQuarterActive("Q1", quarterMonths),
      Q2: isQuarterActive("Q2", quarterMonths),
      Q3: isQuarterActive("Q3", quarterMonths),
      Q4: isQuarterActive("Q4", quarterMonths),
    };
    setActiveQuarters(updatedQuarters);
  }, [currentYear, selectedDates]);

  useEffect(() => {
    const allMonths = Array.from({ length: 12 }, (_, i) => i); // [0, 1, 2, ..., 11]

    // Rotate the months array to start with the fiscalMonth
    const rotatedMonths = [
      ...allMonths.slice(fiscalMonth.value),
      ...allMonths.slice(0, fiscalMonth.value),
    ];

    // Divide rotated months into quarters of 3 months each
    const fiscalQuarters = {
      Q1: rotatedMonths.slice(0, 3),
      Q2: rotatedMonths.slice(3, 6),
      Q3: rotatedMonths.slice(6, 9),
      Q4: rotatedMonths.slice(9, 12),
    };
    setQuarterMonths(fiscalQuarters);
    setTimeout(() => {
      const updatedQuarters = {
        Q1: isQuarterActive("Q1", fiscalQuarters),
        Q2: isQuarterActive("Q2", fiscalQuarters),
        Q3: isQuarterActive("Q3", fiscalQuarters),
        Q4: isQuarterActive("Q4", fiscalQuarters),
      };
      setActiveQuarters(updatedQuarters);
    }, 200);
  }, [fiscalMonth]);

  // useEffect(() => {
  //   setShowYear(
  //     activeYears.length ? Number(activeYears[0]) : currentDate.getFullYear()
  //   );
  // }, [activeYears, selectedDates]);

  const isQuarterActive = (quarter, fiscalQuarters) => {
    const monthsInQuarter = fiscalQuarters[quarter];

    // Get the unique months from the filtered dates
    const monthsInYear = new Set(selectedDates.map((date) => date.getMonth()));

    // Check if all months of the quarter are present in the set
    return monthsInQuarter.every((month) => monthsInYear.has(month));
  };

  const handleDateChange = (date) => {
    setSelectedDates((prevDates) => {
      const dateStr = date.toDateString();
      if (prevDates.some((d) => d.toDateString() === dateStr)) {
        const activeDates = prevDates.filter(
          (d) => d.toDateString() !== dateStr
        );
        generateActiveDates(activeDates, activeYears);
        // return activeDates;
      } else {
        const activeDates = [...prevDates, date];
        generateActiveDates(activeDates, activeYears);
        // return activeDates;
      }
    });
  };

  const handleQuarterClick = (quarter) => {
    const isActive = activeQuarters[quarter];
    if (isActive) {
      const monthsInQuarter = quarterMonths[quarter];
      const filtered = selectedDates.filter(
        (date) =>
          date.getFullYear() === currentYear &&
          !monthsInQuarter.includes(date.getMonth())
      );
      generateActiveDates(filtered, activeYears);
      setSelectedDates(filtered);
      return;
    }
    // Map the selected quarter's months to their first day
    const selectedQuarters = quarterMonths[quarter].map(
      (month) => new Date(currentYear, month, 1)
    );

    const updatedDates = [...selectedDates, ...selectedQuarters];
    generateActiveDates(updatedDates, activeYears);
    setSelectedDates(updatedDates);
  };

  const generateActiveDates = (dateArray, yearStatus) => {
    // Create a set to store unique month and day combinations
    const uniqueDates = new Set();

    // Populate the uniqueDates set with month and day combinations from dateArray
    dateArray.forEach((date) => {
      const month = date.getMonth();
      const day = date.getDate();
      uniqueDates.add(`${month}-${day}`); // Using a string format to ensure uniqueness
    });

    // Create a new array for the active dates
    const result = [];

    // Generate dates for each active year and each unique month-day combination
    yearStatus.forEach((year) => {
      uniqueDates.forEach((uniqueDate) => {
        const [month, day] = uniqueDate.split("-").map(Number);
        result.push(new Date(year, month, day));
      });
    });
    setSelectedDates(result);
  };

  // Handle year click to update the calendar's active start date
  const handleYearClick = (year) => {
    setActiveYears((prevYears) => {
      let selectedYears = [];
      if (prevYears.includes(year)) {
        if (prevYears.length === 1) return prevYears;
        selectedYears = prevYears.filter(
          (y) => y.toString() !== year.toString()
        );
      } else {
        selectedYears.push(...prevYears, year);
      }
      generateActiveDates(selectedDates, selectedYears);
      return selectedYears;
    });
  };
  const activeYearForShow = activeYears.length
    ? Number(activeYears[0])
    : currentDate.getFullYear();
  console.log({ activeYearForShow });
  return (
    <div className="YQMM-datePicker">
      <div className="years-container">
        <button onClick={handlePrev}>{"<"}</button>
        <div className="year-number-container">
          {yearRange.map((year) => {
            const activeyear = activeYears.includes(year);
            return (
              <div
                key={year}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  backgroundColor: activeyear ? "#2c7d30" : "#f0f0f0",
                  color: activeyear ? "#fff" : "#000",
                }}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </div>
            );
          })}
        </div>
        <button onClick={handleNext}>{">"}</button>
      </div>
      <div className="quarters-container">
        {quarters.map((quarter, index) => {
          const isActive = activeQuarters[quarter];

          return (
            <button
              className={isActive ? "active" : ""}
              key={index}
              onClick={() => handleQuarterClick(quarter)}
            >
              {quarter}
            </button>
          );
        })}
      </div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDates}
        tileClassName={({ date }) => {
          return selectedDates.some((d) => d.getMonth() === date.getMonth())
            ? "selected-date"
            : null;
        }}
        selectRange={false}
        showWeekNumbers={true}
        view="month"
        onActiveStartDateChange={({ activeStartDate }) => {
          handleYearClick(activeStartDate);
          setCurrentYear(activeStartDate.getFullYear()); // Update the active year when navigating in the calendar
        }}
        minDetail="year"
        maxDetail="year"
        showNavigation={false}
      />
    </div>
  );
};

export default YQMM;
