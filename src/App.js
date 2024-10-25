import React from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import './Styles/Datepicker.css';
import DatePicker from "./Components/DataPicker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DatePicker />
      </header>
    </div>
  );
}

export default App;
