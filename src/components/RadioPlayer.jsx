import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const RadioPlayer = ({ streamUrl }) => {
  return (
    <AudioPlayer
      src={streamUrl}
      autoPlay={false}
      showJumpControls={false}
      customAdditionalControls={[]}
    />
  );
};

export default RadioPlayer;