import KMRMSPlayer from "./interface";

export default class TTSBackend extends EventTarget implements KMRMSPlayer {
    ready = Promise.resolve();
    play() {
        const utterance = new SpeechSynthesisUtterance("こまります");
        utterance.lang = "ja-JP";
        utterance.rate = 1.6;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            this.dispatchEvent(new Event("end"));
        }
    }
    declare addEventListner: (type: "end", listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
    declare removeEventListner: (type: "end", listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
    declare dispatchEvent: (event: Event) => boolean


}