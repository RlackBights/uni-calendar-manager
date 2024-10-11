import { useEffect, useState } from "react";
import { Event, EventFrequency } from "./events";
import { getMinutesFromTime, getTimeFromMinutes } from "./utils";

export default function EventEditor({ updateEvent, eventEditorContent, setEventEditorContent }: { updateEvent: Function, eventEditorContent: Event, setEventEditorContent: Function }) {
    const [oldEvent, setOldEvent] = useState({} as Event);
    useEffect(() => {
        setOldEvent(eventEditorContent);
        // eslint-disable-next-line
    }, []);
    return (
        <div id="event-editor">
            <div id="event-main">
            <input type="text" name="event-name" id="event-name" value={eventEditorContent.name} onChange={(e) => {setEventEditorContent({...eventEditorContent, name: e.target.value})}} />
            <input type="color" name="event-color" id="event-color" style={{backgroundColor: eventEditorContent.colour}} value={eventEditorContent.colour} onChange={(e) => {
                e.target.style.backgroundColor = e.target.value;
                setEventEditorContent({...eventEditorContent, colour: e.target.value})
            }} />
            </div>
            <div id="event-date-picker">
                <select name="frequency" id="freq-selector" value={eventEditorContent.frequency} onChange={(e) => setEventEditorContent({...eventEditorContent, frequency: parseInt(e.target.value)})}>
                    {Object.keys(EventFrequency).filter(s => isNaN(Number(s))).map(freq => <option value={EventFrequency[freq as keyof typeof EventFrequency]}>{freq}</option>)}
                </select>
                <input type="date" name="date-start" id="date-start" max={(eventEditorContent.frequency === EventFrequency.Once) ? "" : eventEditorContent.dateEnd.toISOString().substring(0, 10)} value={eventEditorContent.dateStart.toISOString().substring(0, 10)} onChange={(e) => setEventEditorContent({...eventEditorContent, dateStart: new Date(e.target.value)})} />
                {(eventEditorContent.frequency !== EventFrequency.Once) && <input type="date" name="date-end" id="date-end" min={eventEditorContent.dateStart.toISOString().substring(0, 10)} value={eventEditorContent.dateEnd.toISOString().substring(0, 10)} onChange={(e) => setEventEditorContent({...eventEditorContent, dateEnd: new Date(e.target.value)})} />}
            </div>
            <div id="event-time-picker">
                <input type="time" name="time-start" min={"06:00"} max={"23:59"} step={900} id="time-start" value={getTimeFromMinutes(eventEditorContent.timeStart + 360)} onChange={(e) => setEventEditorContent({...eventEditorContent, timeStart: getMinutesFromTime(e.target.value)})} />
                <input type="number" name="time-end" id="time-end" min={1} max={60*18} value={eventEditorContent.timeEnd} onChange={(e) => setEventEditorContent({...eventEditorContent, timeEnd: parseInt(e.target.value)})} />
            </div>
            <div id="event-location">
                <input type="text" name="location-building" id="location-building" value={eventEditorContent.location.building} onChange={(e) => setEventEditorContent({...eventEditorContent, location: {...eventEditorContent.location, building: e.target.value}})} />
                <input type="text" name="location-floor" id="location-floor" value={eventEditorContent.location.floor} onChange={(e) => setEventEditorContent({...eventEditorContent, location: {...eventEditorContent.location, floor: e.target.value}})} />
                <input type="text" name="location-room" id="location-room" value={eventEditorContent.location.room} onChange={(e) => setEventEditorContent({...eventEditorContent, location: {...eventEditorContent.location, room: e.target.value}})} />
            </div>
            <div id="event-btn-container">
                <button onClick={() => {
                    updateEvent(oldEvent, eventEditorContent);
                    setEventEditorContent({});
                }}>Save</button>
                <button onClick={() => {
                    setEventEditorContent({});
                }}>Cancel</button>
                <button style={{color: "#dd2222", borderColor: "#dd2222"}} onClick={() => {
                    updateEvent(oldEvent, {}, true);
                    setEventEditorContent({});
                }}>Delete</button>
            </div>
        </div>
    );
}