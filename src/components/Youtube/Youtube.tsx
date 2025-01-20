import YouTube from "react-youtube";
import React from "react";

export const YoutubePlayer = (props: {
  link: string;
  size: { width: number; height: number };
}) => {
  const { link, size } = props;
  if (!link) return;

  const urlParams = new URLSearchParams(new URL(link).search);
  const v = urlParams.get("v");

  return <YouTube videoId={v} opts={size} />;
};
