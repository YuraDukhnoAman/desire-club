"use client";

import { useEffect } from "react";

export function AxeDevTools() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Dynamically import axe-core only in development
    import("@axe-core/react")
      .then((axe) => {
        const React = require("react");
        const ReactDOM = require("react-dom");
        
        axe.default(React, ReactDOM, 1000, {
          // Configure axe-core options
          rules: [
            // Enable all rules by default
          ],
        });
        
        console.log("🔍 Axe DevTools accessibility checker is active");
      })
      .catch((err) => {
        console.error("Failed to load axe-core:", err);
      });
  }, []);

  return null;
}

