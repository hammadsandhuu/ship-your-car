"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  CalendarClock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface FormData {
  readyTime: string;
  shippingType: string;
}

interface StepSixProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepSix: React.FC<StepSixProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const options = [
    {
      id: "ready-now",
      title: "Ready Now",
      description: "Urgent shipment - ready for pickup",
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      urgency: "urgent",
      color: "#ff4444",
    },
    {
      id: "1-2-weeks",
      title: "1-2 Weeks",
      description: "Standard timeline for most shipments",
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      urgency: "moderate",
      color: "#ff8800",
    },
    {
      id: "2-3-weeks",
      title: "2-3 Weeks",
      description: "Flexible timeline with good planning",
      icon: <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />,
      urgency: "planned",
      color: "#00aa44",
    },
    {
      id: "1-month",
      title: "1 Month+",
      description: "Long-term planning with best rates",
      icon: <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6" />,
      urgency: "flexible",
      color: "#0088cc",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("readyTime", optionId);
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="space-y-6 h-full">
      {/* Timeline Options - Compact Mobile Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] border ${
              formData.readyTime === option.id
                ? "ring-2 ring-opacity-50 shadow-lg"
                : "hover:shadow-md shadow-sm"
            }`}
            style={
              {
                backgroundColor: "var(--black-5)",
                borderColor:
                  formData.readyTime === option.id
                    ? "var(--primary)"
                    : "var(--black-6)",
                "--tw-ring-color": "var(--primary)",
              } as React.CSSProperties
            }
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative p-4 sm:p-5">
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                      formData.readyTime === option.id
                        ? "shadow-md"
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        formData.readyTime === option.id
                          ? "var(--primary)"
                          : "var(--black-6)",
                      color:
                        formData.readyTime === option.id
                          ? "var(--black)"
                          : "var(--gray-2)",
                    }}
                  >
                    {option.icon}
                  </div>
                  {formData.readyTime === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        style={{ color: "var(--black)" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-base sm:text-lg font-bold mb-2"
                    style={{ color: "var(--white)" }}
                  >
                    {option.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--gray-2)" }}
                  >
                    {option.description}
                  </p>

                  {/* Urgency Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium border"
                      style={{
                        color:
                          formData.readyTime === option.id
                            ? "var(--primary)"
                            : option.color,
                        backgroundColor: "var(--black-6)",
                        borderColor:
                          formData.readyTime === option.id
                            ? "var(--primary)"
                            : option.color,
                      }}
                    >
                      {option.urgency}
                    </span>

                    {/* Action Indicator */}
                    <div
                      className={`flex items-center space-x-1 text-xs font-medium transition-all duration-300 ${
                        formData.readyTime === option.id
                          ? ""
                          : "group-hover:opacity-80"
                      }`}
                      style={{
                        color:
                          formData.readyTime === option.id
                            ? "var(--primary)"
                            : "var(--gray-2)",
                      }}
                    >
                      <span>Select this option</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StepSix;
