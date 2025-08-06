"use client";

import { useEffect } from "react";

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    if (!pixelId || pixelId === "your_meta_pixel_id_here") {
      return;
    }

    // Meta Pixel base code
    (function (
      f: any,
      b: Document,
      e: string,
      v: string,
      n?: any,
      t?: any,
      s?: any
    ) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    // Initialize the pixel
    (window as any).fbq("init", pixelId);
    (window as any).fbq("track", "PageView");

    // Add noscript image for fallback
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    img.alt = "";
    noscript.appendChild(img);
    document.head.appendChild(noscript);
  }, []);

  return <>{children}</>;
}
