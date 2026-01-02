"use client";

import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (isBreak) {
              // Break finished, start work timer
              setMinutes(25);
              setIsBreak(false);
            } else {
              // Work finished, start break
              setMinutes(5);
              setIsBreak(true);
            }
            // Play notification sound
            if (typeof window !== "undefined") {
              const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi6Czfbihjwgf6vp6qZgHAg9lunywW8jBi2Byvegg0ILFmG36OuqWBgKQ5zh8r1qJAUoh8rx2YNBBxxs");
              audio.play().catch(() => {});
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const startBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(5);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pomodoro Timer
        </h1>

        <div className="text-center mb-8">
          <div className="text-sm font-semibold text-gray-600 mb-2">
            {isBreak ? "BREAK TIME" : "FOCUS TIME"}
          </div>
          <div className="text-8xl font-bold text-gray-800 font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={toggleTimer}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startBreak}
            className="text-gray-600 hover:text-gray-800 font-semibold text-sm transition duration-200"
          >
            Start Break (5 min)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="mb-2">Work: 25 minutes</p>
          <p>Break: 5 minutes</p>
        </div>
      </div>
    </div>
  );
}
