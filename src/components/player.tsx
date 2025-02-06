"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const Player = ({ slug, ext = "m38u", type = "live" }: { slug: string, ext?: string | undefined, type?: string | undefined }) => {

    const baseStreamUrl = "http://wfdmakv.mmastertv.xyz/" +type+"/5157954183/1998162577/"

    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            const element = document.createElement("video");
            element.className = "video-js";
            videoRef.current.appendChild(element);

            const player = videojs(element, {
                controls: true,
                autoplay: true,
                height: 400,
                sources: [
                    {
                        src: baseStreamUrl+ slug+ext,
                        type: "application/x-mpegURL",
                    },
                ],
            });

            return () => {
                if (player) {
                    player.dispose();
                }
                videoRef.current?.removeChild(element);
            };
        }
    }, [slug]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
};