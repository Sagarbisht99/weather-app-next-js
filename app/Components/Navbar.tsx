"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <>
      <div className="w-full py-4 flex flex-col  items-center md:flex-row justify-between">
        {/* Left Side */}
        <div
          className="left flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-current"
              style={{
                animation:
                  "runningMan 1.5s ease-in-out infinite, float 3s ease-in-out infinite",
              }}
            >
              {/* Running man figure */}
              <g className="transform-origin-center">
                {/* Head */}
                <circle
                  cx="50"
                  cy="20"
                  r="8"
                  fill="currentColor"
                  className="animate-pulse"
                />

                {/* Body */}
                <rect
                  x="46"
                  y="28"
                  width="8"
                  height="25"
                  rx="4"
                  fill="currentColor"
                />

                {/* Arms - animated */}
                <rect
                  x="35"
                  y="32"
                  width="12"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  className="transform origin-center"
                  style={{
                    animation: "armSwing 0.6s ease-in-out infinite alternate",
                  }}
                />
                <rect
                  x="53"
                  y="36"
                  width="12"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  className="transform origin-center"
                  style={{
                    animation:
                      "armSwing 0.6s ease-in-out infinite alternate-reverse",
                  }}
                />

                {/* Legs - animated */}
                <rect
                  x="42"
                  y="50"
                  width="6"
                  height="18"
                  rx="3"
                  fill="currentColor"
                  className="transform origin-top"
                  style={{ animation: "legKick 0.8s ease-in-out infinite" }}
                />
                <rect
                  x="52"
                  y="50"
                  width="6"
                  height="18"
                  rx="3"
                  fill="currentColor"
                  className="transform origin-top"
                  style={{ animation: "legKick 0.8s ease-in-out infinite reverse" }}
                />

                {/* Feet */}
                <ellipse
                  cx="45"
                  cy="72"
                  rx="4"
                  ry="2"
                  fill="currentColor"
                  style={{ animation: "footStep 0.8s ease-in-out infinite" }}
                />
                <ellipse
                  cx="55"
                  cy="72"
                  rx="4"
                  ry="2"
                  fill="currentColor"
                  style={{
                    animation: "footStep 0.8s ease-in-out infinite reverse",
                  }}
                />
              </g>
            </svg>
          </div>
          <span className=" font-light text-lg tracking-tight">MAUSAM</span>
        </div>

        {/* Search + Right Side */}
        <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
          <SearchDialog />

          <div className="btn-group flex items-center gap-2">
            <ThemeDropdown />

            <Button
              className="source-code-btn flex items-center gap-2"
              onClick={() => {
                router.push("https://github.com");
              }}
            >
              {github} Source Code
            </Button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes runningMan {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(1deg); }
        }
        
        @keyframes armSwing {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }
        
        @keyframes legKick {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes footStep {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
      `}</style>
    </>
  );
}

export default Navbar;