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
  const [fiscalMonth, setFiscalMonth] = useState({ value: "January", label: "January" })
  const [currentYearIndex, setCurrentYearIndex] = useState(3);
  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
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
      <div style={{color : 'black'}}>
        {picker.value === DatePickerType.YQMM && <div style={{ marginBottom: "10px" }}>
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
        </div>}
        <Select
          options={options}
          onChange={(value) => setPicker(value)}
          value={picker}
        />
        {/* <Select
          options={monthOptions}
          onChange={(month) =>setFiscalMonth(month)}
          value = {fiscalMonth}
        /> */}
      </div>
      <div className="date-picker">
        {picker.value === DatePickerType.DWM && <DWM />}
        {picker.value === DatePickerType.YM && <YM />}
        {picker.value === DatePickerType.YQM && <YQM />}
        {picker.value === DatePickerType.YQMM && (
          <YQMM currentYearIndex={currentYearIndex} />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
