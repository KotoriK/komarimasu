import KMRMSPlayer from "./interface";
import wavUrl from "./wav/kmrms-1.wav?url"
import aacUrl from "./wav/kmrms-1.aac?url"
export default class WavBackend extends EventTarget implements KMRMSPlayer {
    #ctx = new AudioContext({ latencyHint: 'interactive' });
    #inputFront: AudioNode
    #e: HTMLAudioElement
    ready: Promise<void>;
    constructor() {
        super();
        this.ready = this.#init();
    }
    async #init() {
        const audioElement = document.createElement("audio")
        audioElement.innerHTML = `<source src="${aacUrl}" type="audio/aac"/><source src="${wavUrl}" type="audio/wav"/>`
        audioElement.style.display = "none"
        audioElement.preload = "auto"
        audioElement.onended = () => {
            this.dispatchEvent(new Event("end"));
        }
        this.#e = document.body.appendChild(audioElement)

        const sourceNode = this.#ctx.createMediaElementSource(audioElement)

        // create nodes
        const highpassFilter = this.#ctx.createBiquadFilter()
        highpassFilter.type = "highpass"
        highpassFilter.frequency.value = 1000

        highpassFilter.connect(this.#ctx.destination)
        this.#inputFront = highpassFilter

        sourceNode.connect(this.#inputFront)
    }
    play() {
        this.#ctx.resume()
        this.#e.play()
    }
    declare addEventListner: (type: "end", listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
    declare removeEventListner: (type: "end", listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
    declare dispatchEvent: (event: Event) => boolean
    [Symbol.dispose]() {
        this.#e.remove()
        this.#ctx.close()
    }
}
