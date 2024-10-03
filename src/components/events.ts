export enum EventFrequency {
    Once,
    Daily,
    Weekly,
    Monthly,
    Yearly
}

export interface EventLocation {
    building: string;
    floor: string;
    room: string;
}

export interface Event {
    frequency: EventFrequency;
    dateStart: Date;
    dateEnd: Date;
    timeStart: number; // minutes past 6 am
    timeEnd: number; // minutes after time start
    name: string;
    location: EventLocation;
    colour: string; // hex code
}