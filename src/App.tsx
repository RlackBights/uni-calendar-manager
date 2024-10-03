import React, { useState } from 'react';
import './App.css';
import Table from './components/table';
import { Event, EventFrequency } from './components/events';
import EventEditor from './components/eventEditor';
import Navbar from './components/navbar';

let savedEvents = (JSON.parse(localStorage.getItem("events")!) as Event[]);
savedEvents.forEach((e: any) => {e.dateStart = new Date(e.dateStart); e.dateEnd = new Date(e.dateEnd);});

function App() {
  if (!localStorage.getItem("events")) localStorage.setItem("events", JSON.stringify([]));
  
  const [events, setEvents] = useState(savedEvents);
  const [eventEditorContent, setEventEditorContent] = useState({} as Event);
  const [activeDate, setActiveDate] = useState(new Date());
  const updateEvent = (oldEvent: Event, newEvent: Event, remove: Boolean = false) => {
    let newEvents = events;

    if (remove) newEvents = newEvents.filter((e: Event) => e !== oldEvent);
    else newEvents[events.findIndex((e: Event) => e === oldEvent)] = newEvent;
    
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }

  return (
    <div className="App">
      <Navbar activeDate={activeDate} setActiveDate={setActiveDate}/>
      <button id='new-event' onClick={() => {
        let newEvent = {frequency: EventFrequency.Once, dateStart: activeDate, dateEnd: activeDate, timeStart: 0, timeEnd: 60, name: "New Event", location: {building: "-", floor: "-", room: "-"}, colour: "#ffffff"} as Event;
        setEvents(currEvents => [...currEvents, newEvent]);
        setEventEditorContent(newEvent);
      }}>New event</button>
      <Table events={events} setEvents={setEvents} setEventEditorContent={setEventEditorContent} activeDate={activeDate}/>
      {Object.keys(eventEditorContent).length > 0 && <EventEditor updateEvent={updateEvent} eventEditorContent={eventEditorContent} setEventEditorContent={setEventEditorContent}/>}
      
    </div>
  );
}

export default App;
