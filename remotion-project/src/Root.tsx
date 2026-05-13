import { Composition } from "remotion";
import { PriscaAd } from "./PriscaAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1080x1080 square — Instagram / Facebook feed */}
      <Composition
        id="PriscaAd"
        component={PriscaAd}
        durationInFrames={150}   // 5 seconds at 30fps
        fps={30}
        width={1080}
        height={1080}
      />

      {/* 1920x1080 widescreen — YouTube / Facebook cover */}
      <Composition
        id="PriscaAdWide"
        component={PriscaAd}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 1080x1920 vertical — Instagram / Facebook Stories & Reels */}
      <Composition
        id="PriscaAdStory"
        component={PriscaAd}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
