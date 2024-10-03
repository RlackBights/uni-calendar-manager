import { Event } from "./events";

export default function EventEditor({ event, setEventEditorContent }: { event: Event, setEventEditorContent: Function }) {
    console.log(event);
    if (event === {} as Event) return (<></>);
    return (
        <div id="event-editor">
            div
        </div>
    );
}