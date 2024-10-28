import { useState } from "react";
import Select from "react-select";
import DWM from "./Pickers/DWM";
import YM from "./Pickers/YM";
import YQM from "./Pickers/YQM";
import YQMM from "./Pickers/YQMM";

export const DatePickerType = {
  DWM: "DWM",
  YM: "YM",
  YQM: "YQM",
  YQMM: "YQMM",
};

const DatePicker = () => {
  const [picker, setPicker] = useState({
    value: DatePickerType.DWM,
    label: "DWM",
  });
  const [fiscalMonth, setFiscalMonth] = useState({
    value: 0,
    label: "January",
  });
  const [currentYearIndex, setCurrentYearIndex] = useState(3);
  const monthOptions = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  const options = [
    { value: DatePickerType.DWM, label: "DWM" },
    { value: DatePickerType.YM, label: "YM" },
    { value: DatePickerType.YQM, label: "YQM" },
    {
      value: DatePickerType.YQMM,
      label: "YQMM",
    },
  ];

  // Handle input change for the current year index (with validation)
  const handleIndexChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= 3) {
      setCurrentYearIndex(value);
    }
  };
  return (
    <div
      className="datepicker-component"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",

        flex: "50%",
      }}
    >
      <div style={{ color: "black" }}>
        {picker.value === DatePickerType.YQMM && (
          <>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Set Current Year Index (0-3):{" "}
                <input
                  type="number"
                  value={currentYearIndex}
                  min="0"
                  max="3"
                  onChange={handleIndexChange}
                />
              </label>
            </div>{" "}
            <Select
              options={monthOptions}
              onChange={(month) => setFiscalMonth(month)}
              value={fiscalMonth}
            />
          </>
        )}
        <Select
          options={options}
          onChange={(value) => setPicker(value)}
          value={picker}
        />
      </div>
      <div className="date-picker">
        {picker.value === DatePickerType.DWM && <DWM />}
        {picker.value === DatePickerType.YM && <YM />}
        {picker.value === DatePickerType.YQM && <YQM />}
        {picker.value === DatePickerType.YQMM && (
          <YQMM currentYearIndex={currentYearIndex} fiscalMonth={fiscalMonth} />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
