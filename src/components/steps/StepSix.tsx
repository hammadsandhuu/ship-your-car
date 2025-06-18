"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  CalendarDays,
  CalendarClock,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  readyTime: string;
  shippingType: string;
  // Add other form fields as needed
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
  // Timeline selection for all flows
  const options = [
    {
      id: "ready-now",
      title: "Ready Now",
      description:
        "Shipment is prepared and available for immediate pickup or loading",
      timeline: "Pickup within 1-3 business days",
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10" />,
      urgency: "urgent",
      benefits: [
        "Fastest processing",
        "Priority scheduling",
        "Immediate attention",
      ],
      considerations: "Ensure all documentation and packaging is complete",
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: "1-2-weeks",
      title: "1-2 Weeks",
      description:
        "Shipment will be ready for pickup within the next 1-2 weeks",
      timeline: "Flexible scheduling window",
      icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10" />,
      urgency: "moderate",
      benefits: [
        "Good planning time",
        "Optimal rates",
        "Flexible coordination",
      ],
      considerations:
        "Perfect balance of preparation time and shipping efficiency",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: "2-3-weeks",
      title: "2-3 Weeks",
      description: "Shipment preparation will be completed within 2-3 weeks",
      timeline: "Extended preparation period",
      icon: <CalendarDays className="w-8 h-8 sm:w-10 sm:h-10" />,
      urgency: "near-term",
      benefits: ["Better rates", "Optimal scheduling", "Complete preparation"],
      considerations:
        "Allows time for documentation, packaging, and coordination",
      gradient: "from-green-500 to-green-800",
    },
    {
      id: "1-month",
      title: "1 Month",
      description: "Shipment will be ready within approximately one month",
      timeline: "Long-term planning horizon",
      icon: <CalendarClock className="w-8 h-8 sm:w-10 sm:h-10" />,
      urgency: "planned",
      benefits: [
        "Best rates",
        "Comprehensive planning",
        "Peak season avoidance",
      ],
      considerations:
        "Ideal for large projects, seasonal goods, or complex logistics",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("readyTime", optionId);
    // Add a small delay before navigating to the next step
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "planned":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "near-term":
        return "text-green-600 bg-green-50 border-green-500";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getNextButtonText = () => {
    if (formData.shippingType === "transport-only") {
      return "Schedule Meeting";
    }
    return "Book Your Free Freight Call — 15 Minute";
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Timeline Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 ${
              formData.readyTime === option.id
                ? "ring-2 sm:ring-4 ring-blue-500 ring-opacity-50 shadow-xl sm:shadow-2xl"
                : "hover:shadow-xl shadow-md sm:shadow-lg"
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative bg-white border border-gray-100 h-full">
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      formData.readyTime === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {formData.readyTime === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-3 h-3 sm:w-5 sm:h-5 text-white"
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
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-0">
                      {option.title}
                    </h3>
                    <span
                      className={`self-start px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
                        option.urgency
                      )}`}
                    >
                      {option.urgency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Previous button only */}
      <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:bg-gray-50"
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
