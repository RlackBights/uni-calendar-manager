export enum EventFrequency {
    Once,
    Daily,
    Weekly,
    Monthly,
    Yearly
}

export interface EventLocation {
    building: String;
    floor: String;
    room: String;
}

export interface Event {
    frequency: EventFrequency;
    dateStart: Date;
    dateEnd: Date;
    timeStart: number; // minutes past 6 am
    timeEnd: number; // minutes after time start
    name: String;
    location: EventLocation;
    color: String; // hex code
}