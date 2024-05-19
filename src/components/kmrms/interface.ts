export default interface KMRMSPlayer  {
    readonly ready: Promise<void>
    play(): void
}