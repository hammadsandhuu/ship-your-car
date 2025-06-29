"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Plane, Ship, Truck, ArrowRight } from "lucide-react";
import type { FormData } from "../freight-form";

interface StepOneProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  goToStep: (step: number) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  formData,
  updateFormData,
  onNext,
  goToStep,
}) => {
  const options = [
    {
      id: "air-sea",
      title: "International Shipping – Air or Sea",
      description:
        "FOB, ExWorks, or Door-to-Door delivery. You decide — we execute through trusted, vetted freight professionals.",
      icon: <Plane className="w-12 h-12" />,
      features: [
        "Global Freight (Air & Sea)",
        "Customs Clearance",
        "Real-time Tracking",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "customs-inland",
      title: "Customs & Inland Transport",
      description:
        "Customs clearance and local delivery once your shipment arrives — or first-mile transport if needed.",
      icon: <Ship className="w-12 h-12" />,
      features: [
        "Import & Export Clearance",
        "Inland Trucking Options",
        "Customs Documentation",
      ],
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "transport-only",
      title: "Just Transport",
      description:
        "Just need to move the cargo in land? Direct, fast, no extras.",
      icon: <Truck className="w-12 h-12" />,
      features: [
        "A-to-B Cargo Movement",
        "Flexible Pickup Scheduling",
        "Trailers or Trucks",
      ],
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("shippingType", optionId);
    onNext();
  };

  return (
    <div className="space-y-8 h-full">
      <div className="grid lg:grid-cols-3 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 border ${
              formData.shippingType === option.id
                ? "ring-4 ring-opacity-50 shadow-2xl"
                : "hover:shadow-2xl shadow-lg"
            }`}
            style={
              {
                backgroundColor: "var(--black-5)",
                borderColor:
                  formData.shippingType === option.id
                    ? "var(--primary)"
                    : "var(--black-6)",
                "--tw-ring-color": "var(--primary)",
              } as React.CSSProperties
            }
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative p-4 px-5 md:p-8 h-full">
              {/* Background Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-300 hidden sm:block ${
                      formData.shippingType === option.id
                        ? "shadow-lg"
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        formData.shippingType === option.id
                          ? "var(--primary)"
                          : "var(--black-6)",
                      color:
                        formData.shippingType === option.id
                          ? "var(--black)"
                          : "var(--gray-2)",
                    }}
                  >
                    {option.icon}
                  </div>
                  {formData.shippingType === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <svg
                        className="w-5 h-5"
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
                <div className="flex-grow">
                  <h3
                    className="text-xl font-bold mb-4 group-hover:opacity-90 transition-colors"
                    style={{ color: "var(--white)" }}
                  >
                    {option.title}
                  </h3>
                  <p
                    className="hidden sm:block mb-6 leading-relaxed"
                    style={{ color: "var(--gray-2)" }}
                  >
                    {option.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    <h4
                      className="hidden sm:block text-sm font-semibold mb-3"
                      style={{ color: "var(--white-2)" }}
                    >
                      Key Features:
                    </h4>

                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              formData.shippingType === option.id
                                ? "var(--primary)"
                                : "var(--gray-2)",
                          }}
                        />
                        <span
                          className="text-sm md:text-base"
                          style={{ color: "var(--gray-2)" }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Indicator */}
                <div
                  className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t"
                  style={{ borderColor: "var(--black-6)" }}
                >
                  <div
                    className={`flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ${
                      formData.shippingType === option.id
                        ? ""
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      color:
                        formData.shippingType === option.id
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

      {/* Help Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden sm:block rounded-xl p-6 border"
        style={{
          backgroundColor: "var(--black-5)",
          borderColor: "var(--black-6)",
        }}
      >
        <h4 className="font-semibold mb-2" style={{ color: "var(--white)" }}>
          Need help choosing?
        </h4>
        <p
          className="text-sm md:text-base mb-2"
          style={{ color: "var(--gray-2)" }}
        >
          Not sure what those terms mean? We'll help you choose the right one on
          the next screen.
        </p>
        <p
          className="text-sm md:text-base mb-2"
          style={{ color: "var(--gray-2)" }}
        >
          Most clients use this for destination clearance and last-mile
          delivery.
        </p>
        <p className="text-sm md:text-base" style={{ color: "var(--gray-2)" }}>
          For experienced operators who only need the wheels turning.
        </p>
      </motion.div> */}
    </div>
  );
};

export default StepOne;
