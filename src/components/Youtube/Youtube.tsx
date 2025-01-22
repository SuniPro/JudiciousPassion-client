import YouTube from "react-youtube";
import React from "react";
import { ErrorNotify } from "../Alert/Alert";

export const YoutubePlayer = (props: {
  link: string;
  size: { width: number; height: number };
}) => {
  const { link, size } = props;
  if (!link) return;
  let urlParams;
  try {
    urlParams = new URLSearchParams(new URL(link).search);
  } catch (e) {
    ErrorNotify("Youtube 링크가 아닙니다.");
  }

  if (!urlParams) return;

  const v = urlParams.get("v");

  return (
    <YouTube
      videoId={v ? v : new URL(link).pathname.substring(1)}
      opts={size}
    />
  );
};
