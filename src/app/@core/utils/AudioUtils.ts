export class AudioUtils {
  public static playSound() {
      const audio = new Audio();
      audio.src = '../../../../assets/audio/inbox-message.mp3';
      audio.load();
      audio.play();
  }
}
