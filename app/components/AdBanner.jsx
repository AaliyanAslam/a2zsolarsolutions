"use client";

import { useEffect, useRef } from "react";


export default function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style = {},
}) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        if (!adRef.current.getAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (err) {
      // Gracefully handle if AdBlocker is active or AdSense is not ready
      console.warn("AdSense push notification handled:", err?.message || err);
    }
  }, []);

  if (!slot) return null;

  return (
    <div className={`w-full overflow-hidden text-center my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-4154546329201101"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
