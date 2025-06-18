
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Truck, ArrowRight } from 'lucide-react';
import { FormData } from '../FreightForm';

interface StepOneProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, updateFormData, onNext }) => {
  const options = [
    {
      id: "air-sea",
      title: "International Shipping – Air or Sea",
      description:
        "FOB, ExWorks, or Door-to-Door delivery. You decide — we execute through trusted, vetted freight professionals.",
      icon: <Ship className="w-12 h-12" />,
      features: [
        "Global Freight (Air & Sea)",
        "Documentation Handling",
        "Customs Clearance",
        "Real-time Tracking",
        "24/7 Support (Email & WhatsApp)",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "customs-inland",
      title: "Customs & Inland Transport",
      description:
        "Customs clearance and local delivery once your shipment arrives — or first-mile transport if needed.",
      icon: <Truck className="w-12 h-12" />,
      features: [
        "Import & Export Clearance",
        "Inland Trucking (Origin or Destination)",
        "Customs Documentation",
        "Compliance Support",
        "Local Delivery Options",
      ],
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "transport-only",
      title: "Just Transport",
      description:
        "Just need to move the cargo in land? Direct, fast, no extras.",
      icon: <Plane className="w-12 h-12" />,
      features: [
        "A-to-B Cargo Movement",
        "Flexible Pickup Scheduling",
        "Trailers, Trucks, or Multimodal",
        "Cost-Effective Options",
      ],
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const handleSelect = (optionId: string) => {
    updateFormData("shippingType", optionId);
    // All options now proceed to next step
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 ${
              formData.shippingType === option.id
                ? "ring-4 ring-blue-500 ring-opacity-50 shadow-2xl"
                : "hover:shadow-2xl shadow-lg"
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative bg-white p-8 h-full border border-gray-100">
              {/* Background Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon and Selection Indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      formData.shippingType === option.id
                        ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {formData.shippingType === option.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 text-white"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Key Features:
                    </h4>
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            formData.shippingType === option.id
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Indicator */}
                <div className="mt-6 pt-4">
                  <div
                    className={`flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-300 ${
                      formData.shippingType === option.id
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span>Select this option</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
      >
        <h4 className="font-semibold text-gray-900 mb-2">
          Need help choosing?
        </h4>
        <p className="text-gray-600 text-sm">
          Not sure what those terms mean? We’ll help you choose the right one on
          the next screen.
        </p>
        <p className="text-gray-600 text-sm">
          Most clients use this for destination clearance and last-mile
          delivery.
        </p>
        <p className="text-gray-600 text-sm">
          For experienced operators who only need the wheels turning.
        </p>
      </motion.div>
    </div>
  );
};

export default StepOne;
