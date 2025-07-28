import KMRMSPlayer from "./interface";
import url from "../../sound/kmrms-1.mp3?url"
export default class WavBackend implements KMRMSPlayer {
    #ctx = new AudioContext({ latencyHint: 'interactive' });
    #inputFront: AudioNode
    #e: HTMLAudioElement
    ready: Promise<void>;
    #buf: AudioBuffer
    constructor() {
        this.ready = this.#init();
    }
    async #init() {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        this.#buf = await this.#ctx.decodeAudioData(arrayBuffer)

        // create nodes
        const highpassFilter = this.#ctx.createBiquadFilter()


        highpassFilter.type = "highpass"
        highpassFilter.frequency.value = 1000

        highpassFilter.connect(this.#ctx.destination)
        this.#inputFront = highpassFilter
    }
    #c: AudioBufferSourceNode
    play() {
         this.#ctx.resume()
        if (this.#c) {
            return
        }
        const sourceNode = this.#ctx.createBufferSource()
        sourceNode.buffer = this.#buf
        sourceNode.connect(this.#inputFront)
        sourceNode.start()
        this.#c = sourceNode
        sourceNode.onended = () => {
            this.#c = null
        }
    }
/*     [Symbol.dispose]() {
        this.#e.remove()
        this.#ctx.close()
    } */
}
