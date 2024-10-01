import { tableColumnType } from "./tableColumn"
import TableColumn from "./tableColumn"

export default function Table() {

    const columns: tableColumnType[] = [
        {columnName: "Time"},
        {columnName: "Monday"},
        {columnName: "Tuesday"},
        {columnName: "Wednesday"},
        {columnName: "Thursday"},
        {columnName: "Friday"},
        {columnName: "Saturday"},
        {columnName: "Sunday"}
    ]

    const timeSlots = [[...Array(24)].map((_, hour) => (
            <div key={hour} className="time-slot">
                <div className="hour">{`${hour.toString().padStart(2, '0')}:00`}</div>
            </div>
        ))
    ]

    return (
        <div id="table">
            <div id="time-slots">
                {timeSlots}
            </div>
            {columns.slice(1).map((column, index) => (
                <TableColumn key={index + 1} columnName={column.columnName} />
            ))}
        </div>
    )
}