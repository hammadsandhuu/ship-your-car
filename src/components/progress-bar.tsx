"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Check, Circle, ChevronRight } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressBarModern: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        {/* Mobile Progress - Completely Redesigned */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {currentStep}
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 animate-pulse"></div>
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">
                  {stepTitles[currentStep - 1]}
                </p>
                <p className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Complete</p>
            </div>
          </div>

          {/* Mobile Progress Bar - Enhanced */}
          <div className="relative mb-2">
            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Mobile Step Dots */}
          <div className="flex justify-center space-x-2 mt-3">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNum = index + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <motion.div
                  key={stepNum}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isCurrent ? 1.2 : isCompleted ? 1 : 0.8,
                    opacity: isCurrent ? 1 : isCompleted ? 0.8 : 0.4,
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg"
                      : isCurrent
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                      : "bg-gray-300"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop Progress - Completely Redesigned */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Complete Your Freight Request
              </h3>
              <p className="text-gray-600">
                Follow the steps below to get your personalized freight quote
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200">
                <Circle className="w-4 h-4 fill-current text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {currentStep} of {totalSteps} steps
              </div>
            </div>
          </div>

          {/* Desktop Step Flow */}
          <div className="relative">
            {/* Background Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full relative overflow-hidden shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>

            {/* Step Circles and Labels */}
            <div className="relative flex justify-between">
              {stepTitles.map((title, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                const isUpcoming = stepNumber > currentStep;

                return (
                  <div
                    key={stepNumber}
                    className="flex flex-col items-center relative"
                  >
                    {/* Step Circle */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`
                        relative flex items-center justify-center w-16 h-16 rounded-2xl border-4 transition-all duration-500 shadow-xl z-10
                        ${
                          isCompleted
                            ? "bg-gradient-to-br from-green-400 to-emerald-600 border-green-300 text-white shadow-green-200"
                            : isCurrent
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-300 text-white shadow-blue-200"
                            : "bg-white border-gray-300 text-gray-400 shadow-gray-100"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <Check className="w-7 h-7" strokeWidth={3} />
                        </motion.div>
                      ) : (
                        <span className="text-lg font-bold">{stepNumber}</span>
                      )}

                      {/* Current step glow effect */}
                      {isCurrent && (
                        <>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 animate-ping opacity-30"></div>
                          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-300 to-purple-300 opacity-20 animate-pulse"></div>
                        </>
                      )}

                      {/* Completed step shine effect */}
                      {isCompleted && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/30 to-transparent"></div>
                      )}
                    </motion.div>

                    {/* Step Title and Status */}
                    <div className="mt-4 text-center max-w-32">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className={`text-sm font-semibold leading-tight mb-1 ${
                          isCompleted || isCurrent
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {title}
                      </motion.p>

                      {/* Status Indicator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="flex items-center justify-center"
                      >
                        {isCompleted && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Check className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              Complete
                            </span>
                          </div>
                        )}
                        {isCurrent && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">Current</span>
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Circle className="w-3 h-3" />
                            <span className="text-xs font-medium">Pending</span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Connection Arrow */}
                    {index < stepTitles.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                        className="absolute top-8 -right-8 transform -translate-y-1/2"
                      >
                        <ChevronRight
                          className={`w-4 h-4 ${
                            isCompleted ? "text-green-400" : "text-gray-300"
                          }`}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add shimmer animation styles */}
      <style>{`
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
    </div>
  );
};

export default ProgressBarModern;
