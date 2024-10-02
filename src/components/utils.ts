export function normaliseTime(hours: number, minutes: number) {
    return `${(hours > 9) ? hours : "0" + hours}:${(minutes > 9) ? minutes : "0" + minutes}`;
}

export function getTimeFromMinutes(minutes: number) {
    return normaliseTime(Math.floor(minutes / 60), minutes % 60);
}