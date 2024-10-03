import React, { useState } from 'react';
import './App.css';
import Table from './components/table';
import { Event, EventFrequency } from './components/events';
import EventEditor from './components/eventEditor';

function App() {
  const [events, setEvents] = useState([{frequency: EventFrequency.Once, dateStart: new Date(), dateEnd: new Date(), timeStart: 30, timeEnd: 45, name: "Hello", location: {building: "ASD", floor: "00", room: "410"}, colour: "#ffffff"} as Event]);
  const [eventEditorContent, setEventEditorContent] = useState({} as Event);

  return (
    <div className="App">
      <Table events={events} setEvents={setEvents} setEventEditorContent={setEventEditorContent}/>
      <EventEditor event={eventEditorContent} setEventEditorContent={setEventEditorContent}/>
    </div>
  );
}

export default App;
