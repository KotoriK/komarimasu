export default interface KMRMSPlayer extends Omit<EventTarget, 'addEventListener' | 'removeEventListener'> {
    readonly ready: Promise<void>
    play(): void
    addEventListner(type: 'end', listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
    removeEventListner(type: 'end', listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
    dispatchEvent(event: Event): boolean
}