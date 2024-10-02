export default function Table() {

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

            <div className="event" style={{gridRow: "2 / span 2", gridColumn: 2, backgroundColor: "red"}}>
                <p>06:00-07:00</p>
                <p>ProgAlap</p>
                <p>Déli Tömb 00-410</p>
            </div>
        
        </div>
    )
}