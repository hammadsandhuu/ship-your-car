"use client";

import { useEffect } from "react";
import type React from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Plane,
  Package,
  Shield,
  Thermometer,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  shippingType: string;
  freightType: string;
  handlingType: string;
}

interface StepTwoProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // 🔝 Scroll to top when this component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getOptions = () => {
    if (
      formData.shippingType === "customs-inland" ||
      formData.shippingType === "transport-only"
    ) {
      return [
        {
          id: "no-special",
          title: "No Special Handling",
          description:
            "Standard cargo handling procedures for regular shipments without special requirements",
          icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Standard procedures",
            "Regular handling",
            "Cost-effective",
            "Suitable for most cargo",
          ],
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          id: "fragile",
          title: "Fragile/Sensitive Cargo",
          description:
            "Special care and handling for delicate items requiring extra protection during transport",
          icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Extra protection",
            "Careful handling",
            "Specialized packaging",
            "Insurance coverage",
          ],
          gradient: "from-amber-500 to-orange-500",
        },
        {
          id: "temperature",
          title: "Temperature Controlled Cargo",
          description:
            "Climate-controlled transportation for temperature-sensitive goods and perishables",
          icon: (
            <Thermometer className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          ),
          features: [
            "Temperature monitoring",
            "Climate control",
            "Cold chain management",
            "Real-time tracking",
          ],
          gradient: "from-emerald-500 to-teal-500",
        },
      ];
    } else {
      return [
        {
          id: "sea-freight",
          title: "Sea Freight",
          description:
            "Ideal for larger volumes with flexible timelines. Choose from direct or indirect vessels, depending on urgency and budget.",
          icon: <Ship className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Most economical",
            "High capacity",
            "Direct / indirect routing",
          ],
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          id: "air-freight",
          title: "Air Freight",
          description:
            "Best for urgent or high-value shipments. Faster transit, tighter handling — ideal for palletized cargo.",
          icon: <Plane className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "1–7 days transit",
            "Better suited for pallets",
            "Urgent delivery options",
          ],
          gradient: "from-indigo-500 to-purple-500",
        },
      ];
    }
  };

  const options = getOptions();
  const fieldName =
    formData.shippingType === "customs-inland" ||
    formData.shippingType === "transport-only"
      ? "handlingType"
      : "freightType";
  const selectedValue =
    formData.shippingType === "customs-inland" ||
    formData.shippingType === "transport-only"
      ? formData.handlingType
      : formData.freightType;

  const handleSelect = (optionId: string) => {
    updateFormData(fieldName as keyof FormData, optionId);
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8 h-full">
      <div
        className={`grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 ${
          options.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 border ${
              selectedValue === option.id
                ? "ring-2 sm:ring-4 ring-opacity-50 shadow-xl sm:shadow-2xl"
                : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
            }`}
            style={
              {
                backgroundColor: "var(--black-5)",
                borderColor:
                  selectedValue === option.id
                    ? "var(--primary)"
                    : "var(--black-6)",
                "--tw-ring-color": "var(--primary)",
              } as React.CSSProperties
            }
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative p-4 sm:p-6 lg:p-8 h-full">
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`hidden sm:block p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      selectedValue === option.id
                        ? "shadow-lg"
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        selectedValue === option.id
                          ? "var(--primary)"
                          : "var(--black-6)",
                      color:
                        selectedValue === option.id
                          ? "var(--black)"
                          : "var(--gray-2)",
                    }}
                  >
                    {option.icon}
                  </div>
                  {selectedValue === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <svg
                        className="w-3 h-3 sm:w-5 sm:h-5"
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
                <h3
                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 leading-tight"
                  style={{ color: "var(--white)" }}
                >
                  {option.title}
                </h3>
                <p
                  className="sm:text-base mb-4 sm:mb-6 leading-relaxed"
                  style={{ color: "var(--gray-2)" }}
                >
                  {option.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            selectedValue === option.id
                              ? "var(--primary)"
                              : "var(--gray-2)",
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--gray-2)" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Indicator */}
                <div
                  className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t"
                  style={{ borderColor: "var(--black-6)" }}
                >
                  <div
                    className={`flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ${
                      selectedValue === option.id
                        ? ""
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      color:
                        selectedValue === option.id
                          ? "var(--primary)"
                          : "var(--gray-2)",
                    }}
                  >
                    <span>Select this option</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Previous button */}
      <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-3 text-sm sm:text-base border-2 hover:opacity-80 rounded-xl"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
            color: "var(--white-2)",
          }}
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
