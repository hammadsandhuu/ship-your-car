"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick?: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepClick,
}) => {
  // Ensure currentStep is within valid bounds
  const validCurrentStep = Math.max(1, Math.min(currentStep, totalSteps));
  const progressPercentage = (validCurrentStep / totalSteps) * 100;

  const handleStepClick = (stepNum: number) => {
    if (stepNum <= validCurrentStep && onStepClick) {
      onStepClick(stepNum);
    }
  };

  return (
    <>
      <div
        className="border-b shadow-lg sticky top-0 z-50"
        style={{
          backgroundColor: "var(--black-2, #1a1a1a)",
          borderColor: "var(--black-5, #333333)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          {/* Mobile Progress */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm shadow-lg"
                    style={{
                      backgroundColor: "var(--primary, #c9f31d)",
                      color: "var(--black, #000000)",
                      boxShadow: "0 4px 15px rgba(201, 243, 29, 0.3)",
                    }}
                  >
                    {validCurrentStep}
                  </div>
                  <div
                    className="absolute -inset-1 rounded-xl opacity-20 animate-pulse"
                    style={{ backgroundColor: "var(--primary, #c9f31d)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-base font-bold"
                    style={{ color: "var(--white, #ffffff)" }}
                  >
                    Step {validCurrentStep} of {totalSteps}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--primary, #c9f31d)" }}
                  >
                    {stepTitles[validCurrentStep - 1] ||
                      `Step ${validCurrentStep}`}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-xl border shadow-md"
                style={{
                  backgroundColor: "var(--black-4, #2a2a2a)",
                  borderColor: "var(--primary, #c9f31d)",
                  boxShadow: "0 2px 10px rgba(201, 243, 29, 0.2)",
                }}
              >
                <Circle
                  className="w-3 h-3 fill-current"
                  style={{ color: "var(--primary, #c9f31d)" }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--primary, #c9f31d)" }}
                >
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="relative">
              <div
                className="w-full rounded-full h-2 overflow-hidden shadow-inner border"
                style={{
                  backgroundColor: "var(--black-5, #333333)",
                  borderColor: "var(--black-6, #404040)",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary, #c9f31d) 0%, #a8d916 100%)",
                    boxShadow: "0 0 8px rgba(201, 243, 29, 0.5)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop Progress */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--white, #ffffff)" }}
                  >
                    Step {validCurrentStep} of {totalSteps}
                  </h3>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--gray-2, #888888)" }}
                  >
                    {stepTitles[validCurrentStep - 1] ||
                      `Step ${validCurrentStep}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {/* Step Indicators */}
                <div className="flex items-center space-x-3">
                  {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNum = index + 1;
                    const isCompleted = stepNum < validCurrentStep;
                    const isCurrent = stepNum === validCurrentStep;
                    const isClickable = stepNum <= validCurrentStep;

                    return (
                      <motion.div
                        key={stepNum}
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          opacity: isCurrent || isCompleted ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-300 ${
                          isClickable
                            ? "cursor-pointer hover:scale-105"
                            : "cursor-default"
                        }`}
                        style={{
                          backgroundColor:
                            isCompleted || isCurrent
                              ? "var(--primary, #c9f31d)"
                              : "var(--black-4, #2a2a2a)",
                          borderColor:
                            isCompleted || isCurrent
                              ? "var(--primary, #c9f31d)"
                              : "var(--black-6, #404040)",
                          color:
                            isCompleted || isCurrent
                              ? "var(--black, #000000)"
                              : "var(--gray-2, #888888)",
                          boxShadow: isCurrent
                            ? "0 4px 20px rgba(201, 243, 29, 0.4), 0 0 0 3px rgba(201, 243, 29, 0.1)"
                            : isCompleted
                            ? "0 2px 10px rgba(201, 243, 29, 0.2)"
                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() => handleStepClick(stepNum)}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            <Check className="w-5 h-5" strokeWidth={2.5} />
                          </motion.div>
                        ) : (
                          <span className="text-sm font-bold">{stepNum}</span>
                        )}

                        {/* Current Step Glow Effect */}
                        {isCurrent && (
                          <div
                            className="absolute -inset-1 rounded-xl opacity-20 animate-pulse"
                            style={{
                              backgroundColor: "var(--primary, #c9f31d)",
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress Percentage Display */}
                <div
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl border shadow-lg"
                  style={{
                    backgroundColor: "var(--black-4, #2a2a2a)",
                    borderColor: "var(--primary, #c9f31d)",
                    boxShadow: "0 4px 15px rgba(201, 243, 29, 0.2)",
                  }}
                >
                  <div className="relative">
                    <Circle
                      className="w-4 h-4 fill-current"
                      style={{ color: "var(--primary, #c9f31d)" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: "var(--primary, #c9f31d)" }}
                    />
                  </div>
                  <span
                    className="text-base font-bold"
                    style={{ color: "var(--primary, #c9f31d)" }}
                  >
                    {Math.round(progressPercentage)}% Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Progress Line */}
            <div className="mt-6 relative">
              <div
                className="w-full rounded-full h-1 overflow-hidden shadow-inner"
                style={{ backgroundColor: "var(--black-5, #333333)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary, #c9f31d) 0%, #a8d916 100%)",
                    boxShadow: "0 0 10px rgba(201, 243, 29, 0.6)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer Animation Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ProgressBar;
