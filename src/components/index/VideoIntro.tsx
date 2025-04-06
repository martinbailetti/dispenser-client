import { sendActionToMachine } from "@/bridge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPending, setPendingVideo } from "@/slices/appSlice";
import { memo, useEffect, useRef, useState } from "react";

const VideoIntro = memo(() => {
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [loopCount, setLoopCount] = useState(0);

  const configData = useAppSelector((state) => state.configData);

  useEffect(() => {
    console.log("VIDEO");
    const handleVideoEnded = () => {
      setLoopCount((prevCount) => prevCount + 1);
      if (loopCount+1 < configData.video_loops) {
        if (videoRef.current) {
          if (!configData.audio_on_attract) {
            videoRef.current.muted = true;
          }
          videoRef.current.play();
        }
      } else {
        dispatch(setPendingVideo(false));
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [loopCount, configData.video_loops, dispatch, configData.audio_on_attract]);

  const handleVideoClick = () => {
    if (videoRef.current && videoRef.current.paused) {
      sendActionToMachine("log", {message: `intro video first click`});
      if (!configData.audio_on_attract) {
        videoRef.current.muted = true;
      }
      videoRef.current.play();
    } else {
      sendActionToMachine("log", {message: `intro video click`});
      dispatch(setPending(false));
    }
  };

  return (
    <div data-testid="video-container" className="video-container" onClick={handleVideoClick}>
      <video
        data-testid="video-element"
        className="video"
        ref={videoRef}
        autoPlay
        muted={!configData.audio_on_attract}
      >
        <source src={`${configData.video_intro}`} type="video/mp4" />
      </video>
    </div>
  );
});

VideoIntro.displayName = "VideoIntro";
export default VideoIntro;
