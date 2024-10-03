import { useEffect, useState } from "react";
import { Event, EventFrequency } from "./events";
import { getMinutesFromTime, getTimeFromMinutes, normaliseTime } from "./utils";

export default function EventEditor({ updateEvent, eventEditorContent, setEventEditorContent }: { updateEvent: Function, eventEditorContent: Event, setEventEditorContent: Function }) {
    const [oldEvent, setOldEvent] = useState({} as Event);
    useEffect(() => {
        setOldEvent(eventEditorContent);
    }, []);
    return (
        <div id="event-editor">
            <div id="event-date-picker">
                <select name="frequency" id="freq-selector" value={eventEditorContent.frequency} onChange={(e) => setEventEditorContent({...eventEditorContent, frequency: parseInt(e.target.value)})}>
                    <option value={EventFrequency.Once}>Only Once</option>
                    <option value={EventFrequency.Daily}>Daily</option>
                    <option value={EventFrequency.Weekly}>Weekly</option>
                    <option value={EventFrequency.Monthly}>Monthly</option>
                    <option value={EventFrequency.Yearly}>Yearly</option>
                </select>
                <input type="date" name="date-start" id="date-start" value={eventEditorContent.dateStart.toISOString().substring(0, 10)} onChange={(e) => setEventEditorContent({...eventEditorContent, dateStart: new Date(e.target.value)})} />
                <input type="date" name="date-end" id="date-end" value={eventEditorContent.dateEnd.toISOString().substring(0, 10)} onChange={(e) => setEventEditorContent({...eventEditorContent, dateEnd: new Date(e.target.value)})} />
            </div>
            <div id="event-time-picker">
                <input type="time" name="time-start" id="time-start" value={getTimeFromMinutes(eventEditorContent.timeStart + 360)} onChange={(e) => setEventEditorContent({...eventEditorContent, timeStart: getMinutesFromTime(e.target.value)})} />
                <input type="number" name="time-end" id="time-end" value={eventEditorContent.timeEnd} onChange={(e) => setEventEditorContent({...eventEditorContent, timeEnd: parseInt(e.target.value)})} />
            </div>
            <div id="event-btn-container">
                <button onClick={() => {
                    updateEvent(oldEvent, eventEditorContent);
                    setEventEditorContent({});
                }}>Save</button>
                <button onClick={() => {
                    setEventEditorContent({});
                }}>Cancel</button>
            </div>
        </div>
    );
}