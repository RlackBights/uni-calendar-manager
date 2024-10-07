import { useState } from "react";
import { changeDate, getWrittenDate } from "./utils";

export enum NavbarMode {
    Day = 0,
    Month = 1,
    Year = 2
}

export default function Navbar({ activeDate, setActiveDate } : { activeDate: Date, setActiveDate: Function }) {
    const [navMode, setNavMode] = useState(NavbarMode.Day);
    
    return (
        <div id="navbar">
            <p onClick={() => {
                setActiveDate(changeDate(activeDate, navMode, -1));
            }}>{"<"}</p>
            <div id="date-display">
                <h1 onClick={() => { setNavMode(NavbarMode.Day) }} style={(navMode === NavbarMode.Day) ? {textDecoration: "underline", fontWeight: "bold"} : {}}>{getWrittenDate(activeDate)[0]}</h1>
                <h1 onClick={() => { setNavMode(NavbarMode.Month) }} style={(navMode === NavbarMode.Month) ? {textDecoration: "underline", fontWeight: "bold"} : {}}>{getWrittenDate(activeDate)[1]}</h1>
                <h1 onClick={() => { setNavMode(NavbarMode.Year) }} style={(navMode === NavbarMode.Year) ? {textDecoration: "underline", fontWeight: "bold"} : {}}>{getWrittenDate(activeDate)[2]}</h1>
            </div>
            <p onClick={() => {
                setActiveDate(changeDate(activeDate, navMode, 1));
            }}>{">"}</p>
        </div>
    )
}