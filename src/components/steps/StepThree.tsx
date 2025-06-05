"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  shippingType: string;
  packagingHelp: string;
  serviceType: string;
  // Add other form fields as needed
}

interface StepThreeProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // Show packaging options for customs-inland and transport-only flows
  if (
    formData.shippingType === "customs-inland" ||
    formData.shippingType === "transport-only"
  ) {
    const packagingOptions = [
      {
        id: "yes-help",
        title: "Yes, I would like help with packaging",
        description:
          "Professional packaging services to ensure your cargo is properly secured and protected",
        icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
        features: [
          "Professional packaging",
          "Quality materials",
          "Export compliance",
          "Damage protection",
        ],
        gradient: "from-green-500 to-emerald-500",
      },
      {
        id: "no-help",
        title: "No, I have packaging arranged",
        description:
          "You have already arranged packaging and your cargo is ready for transportation",
        icon: (
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        ),
        features: [
          "Self-arranged",
          "Ready to ship",
          "Cost savings",
          "Full control",
        ],
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        id: "not-sure",
        title: "I'm not sure yet",
        description:
          "Our experts will assess your cargo and recommend the best packaging solution",
        icon: (
          <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        ),
        features: [
          "Expert assessment",
          "Custom solution",
          "Professional advice",
          "Optimal protection",
        ],
        gradient: "from-purple-500 to-indigo-500",
      },
    ];

    const handleSelect = (optionId: string) => {
      updateFormData("packagingHelp", optionId);
      // Add a small delay before navigating to the next step
      setTimeout(() => {
        onNext();
      }, 300);
    };

    return (
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {packagingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 ${
                formData.packagingHelp === option.id
                  ? "ring-2 sm:ring-4 ring-blue-500 ring-opacity-50 shadow-xl sm:shadow-2xl"
                  : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
              }`}
              onClick={() => handleSelect(option.id)}
            >
              <div className="relative bg-white p-4 sm:p-6 lg:p-8 h-full border border-gray-100">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        formData.packagingHelp === option.id
                          ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                          : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                      }`}
                    >
                      {option.icon}
                    </div>
                    {formData.packagingHelp === option.id && (
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
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                      {option.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Benefits:
                      </h4>
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              formData.packagingHelp === option.id
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            }`}
                          />
                          <span className="text-xs sm:text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Indicator */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4">
                    <div
                      className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        formData.packagingHelp === option.id
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
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
  }

  // Air-Sea flow - Service Type Selection
  const serviceOptions = [
    {
      id: "FOB (Freight on Board)",
      title: "FOB (Freight on Board)",
      description:
        "We only manage port-to-port freight. You and/or your supplier are responsible for everything else.",
      icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      features: [
        "Port-to-port shipping only",
        "Clear handoff at the port",
        "Best if you have your own agents or in-house team.",
        "You handle pickup, origin clearance, destination clearance & delivery.",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "Ex-Works",
      title: "Ex-Works",
      description:
        "We pick up from your supplier’s location and manage everything up to the destination port or airport..",
      icon: <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      features: [
        "Factory or warehouse pickup",
        "We handle transport to origin port + customs clearance",
        "Ends at destination port",
        "Ideal if your supplier provides no logistics help",
      ],
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "Door-to-Door",
      title: "Door-to-Door",
      description:
        "We handle everything — pickup, customs, freight, and final delivery. One point of contact from start to finish.",
      icon: <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
      features: [
        "Full logistics coverage",
        "Pickup to final delivery",
        "Best for time-sensitive or stress free shipping",
        "Origin & destination customs clearance",
      ],
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("serviceType", optionId);
    // Add a small delay before navigating to the next step
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {serviceOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 ${
              formData.serviceType === option.id
                ? "ring-2 sm:ring-4 ring-blue-500 ring-opacity-50 shadow-xl sm:shadow-2xl"
                : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative bg-white p-4 sm:p-6 lg:p-8 h-full border border-gray-100">
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      formData.serviceType === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {formData.serviceType === option.id && (
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {option.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Key Features:
                    </h4>
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            formData.serviceType === option.id
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span className="text-xs sm:text-sm text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Indicator */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4">
                  <div
                    className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      formData.serviceType === option.id
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
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

export default StepThree;
