import React, { useState } from 'react';
import './App.css';
import Table from './components/table';
import { Event, EventFrequency } from './components/events';
import EventEditor from './components/eventEditor';
import Navbar from './components/navbar';


if (!localStorage.getItem("events")) localStorage.setItem("events", "[]");
let savedEvents = (JSON.parse(localStorage.getItem("events")!) as Event[]);
savedEvents.forEach((e: any) => {e.dateStart = new Date(e.dateStart); e.dateEnd = new Date(e.dateEnd);});

function App() {
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
      <p id='calendar-code' style={{display: "none"}}></p>
      <div id='import-calendar'>
        <button onClick={() => {
          try {
            navigator.clipboard.writeText(`unical&&${btoa(encodeURIComponent(JSON.stringify(events)))}`).then(() => {
              let calendarCode = document.getElementById("calendar-code")!;
              calendarCode.textContent = "Copied to clipboard!";
              calendarCode.style.display = "block";
              setTimeout(() => {
                calendarCode.style.display = "none";
              }, 7500);
            });
          } catch (e) {
            let calendarCode = document.getElementById("calendar-code")!;
            calendarCode.textContent = "ERROR: " + e;
            calendarCode.style.display = "block";
            setTimeout(() => {
              calendarCode.style.display = "none";
            }, 7500);
          }
        }}>
          Export
        </button>
        <button onClick={() => {
          navigator.clipboard.readText().then(res => {
            if (!res.startsWith("unical&&")) 
            {
              let calendarCode = document.getElementById("calendar-code")!;
              calendarCode.textContent = "Invalid clipboard content!";
              calendarCode.style.display = "block";
              setTimeout(() => {
                calendarCode.style.display = "none";
              }, 7500);
            }
            else {
              console.log(JSON.parse(decodeURIComponent(atob(res.split("&&")[1]))));
              try {
                let newArr = JSON.parse(decodeURIComponent(atob(res.split("&&")[1]))) as Event[];
                newArr.forEach((e: Event) => {
                  e.dateStart = new Date(e.dateStart);
                  e.dateEnd = new Date(e.dateEnd);
                });
                setEvents(newArr);
                localStorage.setItem("events", JSON.stringify(newArr));
              } catch (e) {
                let calendarCode = document.getElementById("calendar-code")!;
                calendarCode.textContent = "ERROR: " + e;
                calendarCode.style.display = "block";
                setTimeout(() => {
                  calendarCode.style.display = "none";
                }, 7500);
              }
            }
          })
        }}>
          Import
        </button>
      </div>
      <Table events={events} setEventEditorContent={setEventEditorContent} activeDate={activeDate}/>
      {Object.keys(eventEditorContent).length > 0 && <EventEditor updateEvent={updateEvent} eventEditorContent={eventEditorContent} setEventEditorContent={setEventEditorContent}/>}
      
    </div>
  );
}

export default App;
