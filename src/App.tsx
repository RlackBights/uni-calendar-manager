import React, { useState } from 'react';
import './App.css';
import Table from './components/table';
import { EventFrequency } from './components/events';

function App() {
  const [events, setEvents] = useState([{frequency: EventFrequency.Once, dateStart: new Date(), dateEnd: new Date(), timeStart: 30, timeEnd: 45, name: "Hello", location: {building: "ASD", floor: "00", room: "410"}, color: "#ff00ff"}]);

  return (
    <div className="App">
      <Table events={events} setEvents={setEvents}/>
    </div>
  );
}

export default App;
