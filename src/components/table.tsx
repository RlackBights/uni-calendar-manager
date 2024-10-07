import { useEffect, useState } from "react";
import { Event, EventFrequency } from "./events";
import { areDatesSameWeek, doesEventMatchFilters, getFirstDayOfWeek, getFontColour, getTimeFromMinutes, isDateBetweenDates, stripDate } from "./utils";

export default function Table({ events, setEvents, setEventEditorContent, activeDate } : { events: Event[], setEvents: Function, setEventEditorContent: Function, activeDate: Date }) {
    const [timeDisplay, setTimeDisplay] = useState({left: `calc(9vw * ${(new Date().getDay() === 0 ? 7 : new Date().getDay())})`, top: `${Math.max(4, ((new Date().getHours() - 5) * 4 + new Date().getMinutes() * (4/60)))}rem`});
    
    useEffect(() => {
        setInterval(() => {
            setTimeDisplay({left: `calc(9vw * ${(new Date().getDay() === 0 ? 7 : new Date().getDay())})`, top: `${Math.max(4, ((new Date().getHours() - 5) * 4 + new Date().getMinutes() * (4/60)))}rem`});
        }, 1000);
    }, [])

    return (
        <div id="table">
            {[["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <>
                    <div key={day} className="day-header" style={{gridRow: 0, gridColumn: index + 2, backgroundColor: ((activeDate.getDay() === 0 ? 7 : activeDate.getDay()) - 1 === index) ? "#222222" : "", position: "relative"}}>
                        <p style={{zIndex: 20}}>{day}<br/>{new Date(getFirstDayOfWeek(activeDate).getTime() + 86400000 * index).getDate()}</p>
                        <div className="day-column" style={{backgroundColor: ((activeDate.getDay() === 0 ? 7 : activeDate.getDay()) - 1 === index) ? "#222222" : "", width: "100%", position: "absolute", height: "76rem", top: 0}}>

                        </div>
                    </div>
                </>
            ))]}
            

            {[[...Array(19)].map((_, hour) => (
                <div key={hour} className="time-slot" style={{gridRow: hour + 2, gridColumn: 0}}>
                    <div className="hour">{`${(hour + 6).toString().padStart(2, '0')}:00`}</div>
                </div>
            ))]}

            {events.map((event, index) => (
                <>
                    {![EventFrequency.Daily, EventFrequency.Workdays, EventFrequency.Weekends, EventFrequency.Yearly].includes(event.frequency) && doesEventMatchFilters(event, activeDate) && 
                        <div onClick={() => setEventEditorContent(event)} key={index} className="event" style={{top: `${((event.timeStart % 60) / 60) * 100}%`, height: `${(event.timeEnd / 60) * 100}%`, gridRow: `${2 + Math.floor(event.timeStart / 60)} / span 1`, gridColumn: `${(event.dateStart.getDay() === 0) ? 7 : event.dateStart.getDay()+1} / span 1`, backgroundColor: event.colour, color: getFontColour(event.colour)}}>
                            <p style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>{event.name}</span><span>{getTimeFromMinutes(event.timeStart + 360)}-{getTimeFromMinutes(event.timeStart + event.timeEnd + 360)}</span></p>
                            <p>{event.location.building} {event.location.floor}-{event.location.room}</p>
                        </div>
                    }
                    {[EventFrequency.Daily, EventFrequency.Workdays, EventFrequency.Weekends].includes(event.frequency) && ([...Array(7)].map((_, index) => ((doesEventMatchFilters(event, new Date(stripDate(getFirstDayOfWeek(activeDate)).getTime() + 86400000 * index))) && (
                        <div onClick={() => setEventEditorContent(event)} key={index} className="event" style={{top: `${((event.timeStart % 60) / 60) * 100}%`, height: `${(event.timeEnd / 60) * 100}%`, gridRow: `${2 + Math.floor(event.timeStart / 60)} / span 1`, gridColumn: `${index + 2} / span 1`, backgroundColor: event.colour, color: getFontColour(event.colour)}}>
                            <p style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>{event.name}</span><span>{getTimeFromMinutes(event.timeStart + 360)}-{getTimeFromMinutes(event.timeStart + event.timeEnd + 360)}</span></p>
                            <p>{event.location.building} {event.location.floor}-{event.location.room}</p>
                        </div>
                    ))))}
                    {event.frequency === EventFrequency.Yearly && doesEventMatchFilters(event, activeDate) && 
                        <div onClick={() => setEventEditorContent(event)} key={index} className="event" style={{top: `${((event.timeStart % 60) / 60) * 100}%`, height: `${(event.timeEnd / 60) * 100}%`, gridRow: `${2 + Math.floor(event.timeStart / 60)} / span 1`, gridColumn: `${(-stripDate(getFirstDayOfWeek(new Date(new Date(activeDate.getFullYear(), event.dateStart.getMonth()).setDate(event.dateStart.getDate())))).getTime() + stripDate(new Date(new Date(activeDate.getFullYear(), event.dateStart.getMonth()).setDate(event.dateStart.getDate()))).getTime()) / 86400000 + 1} / span 1`, backgroundColor: event.colour, color: getFontColour(event.colour)}}>
                            <p style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>{event.name}</span><span>{getTimeFromMinutes(event.timeStart + 360)}-{getTimeFromMinutes(event.timeStart + event.timeEnd + 360)}</span></p>
                            <p>{event.location.building} {event.location.floor}-{event.location.room}</p>
                        </div>
                    }
                </>
            ))}

            {areDatesSameWeek(new Date(), activeDate) && <div id="current-time-display" style={timeDisplay}></div>}
        
        </div>
    )
}