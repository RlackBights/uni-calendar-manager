import { Event } from "./events";
import { getTimeFromMinutes } from "./utils";

export default function Table({ events, setEvents } : { events: Event[], setEvents: Function }) {

    return (
        <div id="table">
            {[["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <div key={day} className="day-header" style={{gridRow: 0, gridColumn: index + 2}}>
                    <p>{day}</p>
                </div>
            ))]}

            {[[...Array(19)].map((_, hour) => (
                <div key={hour} className="time-slot" style={{gridRow: hour + 2, gridColumn: 0}}>
                    <div className="hour">{`${(hour + 6).toString().padStart(2, '0')}:00`}</div>
                </div>
            ))]}

            {events.map((event, index) => (
                <div className="event" style={{top: `${((event.timeStart % 60) / 60) * 100}%`, height: `${(event.timeEnd / 60) * 100}%`, gridRow: `${2 + Math.floor(event.timeStart / 60)} / span 1`, gridColumn: `${(event.dateStart.getDay() == 0) ? 7 : event.dateStart.getDay()+1} / span 1`, backgroundColor: event.color.toString()}}>
                    <p style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>{event.name}</span><span>{getTimeFromMinutes(event.timeStart + 360)}-{getTimeFromMinutes(event.timeStart + event.timeEnd + 360)}</span></p>
                    <p>{event.location.building} {event.location.floor}-{event.location.room}</p>
                </div>
            ))}
        
        </div>
    )
}