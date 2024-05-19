import PressUp from '../sound/press-up.mp3?url'
import PressDown from '../sound/press-down.mp3?url'
export default class ButtonSE {
    #ctx = new AudioContext({ latencyHint: 'interactive' });
    #bufPressUp: AudioBuffer
    #bufPressDown: AudioBuffer
    #front: AudioNode
    constructor() {
        this.#load(PressUp).then(buf => this.#bufPressUp = buf)
        this.#load(PressDown).then(buf => this.#bufPressDown = buf)
        const gain = this.#front = this.#ctx.createGain()
        gain.gain.setValueAtTime(0.5, this.#ctx.currentTime)
        gain.connect(this.#ctx.destination)
    }
    async #load(url: string) {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        return this.#ctx.decodeAudioData(arrayBuffer)
    }
    on(button: HTMLElement) {
        const handleDown = () => {
            this.#play(this.#bufPressDown)
        }
        const handleUp = () => {
            this.#play(this.#bufPressUp)
        }
        button.addEventListener("pointerdown", handleDown)
        button.addEventListener("pointerup", handleUp)
        return () => {
            button.removeEventListener("pointerdown", handleDown)
            button.removeEventListener("pointerup", handleUp)
        }
    }
    #play(buf: AudioBuffer) {
        const source = this.#ctx.createBufferSource()
        source.buffer = buf
        source.connect(this.#front)
        source.start()
    }
    [Symbol.dispose]() {
        this.#ctx.close()
    }
}