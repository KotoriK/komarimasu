import KMRMSPlayer from "./interface";

export default class TTSBackend implements KMRMSPlayer {
    ready = Promise.resolve();
    play() {
        const utterance = new SpeechSynthesisUtterance("こまります");
        utterance.lang = "ja-JP";
        utterance.rate = 1.6;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);

    }
}