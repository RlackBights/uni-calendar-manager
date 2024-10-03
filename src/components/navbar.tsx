import { getWrittenDate } from "./utils";

export default function Navbar({ activeDate, setActiveDate } : { activeDate: Date, setActiveDate: Function }) {

    return (
        <div id="navbar">
            <p onClick={() => {
                setActiveDate((currDate: Date) => new Date(currDate.getTime() - 86400000));
            }}>{"<"}</p>
            <h1>{getWrittenDate(activeDate)}</h1>
            <p onClick={() => {
                setActiveDate((currDate: Date) => new Date(currDate.getTime() + 86400000));
            }}>{">"}</p>
        </div>
    )
}