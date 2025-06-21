"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Package, CheckCircle, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormData {
  shippingType: string
  freightType: string
  packagingHelp: string
  serviceType: string
}

interface StepThreeProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: any) => void
  onNext: () => void
  onPrev: () => void
}

const StepThree: React.FC<StepThreeProps> = ({ formData, updateFormData, onNext, onPrev }) => {
  // Show packaging options for customs-inland and transport-only flows
  if (formData.shippingType === "customs-inland" || formData.shippingType === "transport-only") {
    const packagingOptions = [
      {
        id: "yes-help",
        title: "Yes, I would like help with packaging",
        description: "Professional packaging services to ensure your cargo is properly secured and protected",
        icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
        features: ["Professional packaging", "Quality materials", "Export compliance", "Damage protection"],
        gradient: "from-green-500 to-emerald-500",
      },
      {
        id: "no-help",
        title: "No, I have packaging arranged",
        description: "You have already arranged packaging and your cargo is ready for transportation",
        icon: <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
        features: ["Self-arranged", "Ready to ship", "Cost savings", "Full control"],
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        id: "not-sure",
        title: "I'm not sure yet",
        description: "Our experts will assess your cargo and recommend the best packaging solution",
        icon: <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
        features: ["Expert assessment", "Custom solution", "Professional advice", "Optimal protection"],
        gradient: "from-purple-500 to-indigo-500",
      },
    ]

    const handleSelect = (optionId: string) => {
      updateFormData("packagingHelp", optionId)
      setTimeout(() => {
        onNext()
      }, 300)
    }

    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {packagingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 border ${
                formData.packagingHelp === option.id
                  ? "ring-2 sm:ring-4 ring-opacity-50 shadow-xl sm:shadow-2xl"
                  : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
              }`}
              style={
                {
                  backgroundColor: "var(--black-5)",
                  borderColor:
                    formData.packagingHelp === option.id
                      ? "var(--primary)"
                      : "var(--black-6)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties
              }
              onClick={() => handleSelect(option.id)}
            >
              <div className="relative p-4 sm:p-6 lg:p-8 h-full">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: "var(--primary)" }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div
                      className={`hidden sm:block p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        formData.packagingHelp === option.id
                          ? "shadow-lg"
                          : "group-hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor:
                          formData.packagingHelp === option.id
                            ? "var(--primary)"
                            : "var(--black-6)",
                        color:
                          formData.packagingHelp === option.id
                            ? "var(--black)"
                            : "var(--gray-2)",
                      }}
                    >
                      {option.icon}
                    </div>
                    {formData.packagingHelp === option.id && (
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

                  <div className="flex-grow">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight"
                      style={{ color: "var(--white)" }}
                    >
                      {option.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
                      style={{ color: "var(--gray-2)" }}
                    >
                      {option.description}
                    </p>

                    <div className="space-y-1.5 sm:space-y-2">
                      <h4
                        className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
                        style={{ color: "var(--white-2)" }}
                      >
                        Benefits:
                      </h4>
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor:
                                formData.packagingHelp === option.id
                                  ? "var(--primary)"
                                  : "var(--gray-2)",
                            }}
                          />
                          <span
                            className="text-xs sm:text-sm"
                            style={{ color: "var(--gray-2)" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4">
                    <div
                      className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        formData.packagingHelp === option.id
                          ? ""
                          : "group-hover:opacity-80"
                      }`}
                      style={{
                        color:
                          formData.packagingHelp === option.id
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

        <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
          <Button
            variant="outline"
            onClick={onPrev}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:opacity-80 rounded-xl"
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
  }

  // Air-Sea flow - Service Type Selection
  const getServiceOptions = () => {
    const isAirFreight = formData.freightType === "air-freight"

    if (isAirFreight) {
      return [
        {
          id: "Ex-Works",
          title: "Ex-Works (Air Freight)",
          description:
            "We collect from your supplier and handle air freight to destination airport. You arrange final delivery from airport.",
          icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Goods pickup (e.g. factory, etc.)",
            "Origin customs & airfreight included",
            "You handle final customs & delivery",
          ],
          gradient: "from-emerald-500 to-teal-500",
          availableFor: ["air-freight"],
        },
        {
          id: "Door-to-Door",
          title: "Door-to-Door (Air Freight)",
          description:
            "Complete air freight service from pickup to final delivery. We handle everything including final delivery from airport.",
          icon: (
            <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          ),
          features: [
            "Complete door-to-door service",
            "Air freight with final delivery",
            "Airport to door delivery included",
          ],
          gradient: "from-purple-500 to-indigo-500",
          availableFor: ["air-freight"],
        },
      ];
    } else {
      const allOptions = [
        {
          id: "FOB (Freight on Board)",
          title: "FOB (Freight on Board)",
          description:
            "We only manage port-to-port freight. You and/or your supplier are responsible for everything else.",
          icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
          features: [
            "Port-to-port shipping only",
            "Best if you have a in-house team",
            "You handle pickup, customs & delivery",
          ],
          gradient: "from-blue-500 to-cyan-500",
          availableFor: ["sea-freight"],
        },
        {
          id: "Ex-Works",
          title: "Ex-Works",
          description:
            "We pick up from your supplier's location and manage everything up to the destination port.",
          icon: (
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          ),
          features: [
            "Goods pickup (e.g. factory, etc.)",
            "Origin customs & shipping included",
            "You handle final customs & delivery",
          ],
          gradient: "from-emerald-500 to-teal-500",
          availableFor: ["sea-freight"],
        },
        {
          id: "Door-to-Door",
          title: "Door-to-Door",
          description:
            "We handle everything — pickup, customs, freight, and final delivery. One point of contact from start to finish.",
          icon: (
            <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          ),
          features: [
            "Pickup to final delivery",
            "A to Z full logistics coverage",
            "Best for stress free shipping",
          ],
          gradient: "from-purple-500 to-indigo-500",
          availableFor: ["sea-freight"],
        },
      ];

      return allOptions.filter((option) => option.availableFor.includes(formData.freightType))
    }
  }

  const serviceOptions = getServiceOptions()

  const handleSelect = (optionId: string) => {
    updateFormData("serviceType", optionId)
    setTimeout(() => {
      onNext()
    }, 300)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div
        className={`grid gap-4 sm:gap-6 lg:gap-8 ${
          serviceOptions.length === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {serviceOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 border ${
              formData.serviceType === option.id
                ? "ring-2 sm:ring-4 ring-opacity-50 shadow-xl sm:shadow-2xl"
                : "hover:shadow-xl sm:hover:shadow-2xl shadow-md sm:shadow-lg"
            }`}
            style={
              {
                backgroundColor: "var(--black-5)",
                borderColor:
                  formData.serviceType === option.id
                    ? "var(--primary)"
                    : "var(--black-6)",
                "--tw-ring-color": "var(--primary)",
              } as React.CSSProperties
            }
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative p-6 lg:p-8 h-full">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div
                    className={`hidden sm:block p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      formData.serviceType === option.id
                        ? "shadow-lg"
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        formData.serviceType === option.id
                          ? "var(--primary)"
                          : "var(--black-6)",
                      color:
                        formData.serviceType === option.id
                          ? "var(--black)"
                          : "var(--gray-2)",
                    }}
                  >
                    {option.icon}
                  </div>
                  {formData.serviceType === option.id && (
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

                <div className="flex-grow">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight"
                    style={{ color: "var(--white)" }}
                  >
                    {option.title}
                  </h3>
                  <p
                    className="hidden sm:block text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
                    style={{ color: "var(--gray-2)" }}
                  >
                    {option.description}
                  </p>
                  <div className="space-y-1.5 sm:space-y-2">
                    <h4
                      className="hidden sm:block text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
                      style={{ color: "var(--white-2)" }}
                    >
                      Key Features:
                    </h4>
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              formData.serviceType === option.id
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
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4">
                  <div
                    className={`flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      formData.serviceType === option.id
                        ? ""
                        : "group-hover:opacity-80"
                    }`}
                    style={{
                      color:
                        formData.serviceType === option.id
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

      <div className="flex justify-start pt-6 sm:pt-8 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 hover:opacity-80 rounded-xl"
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
}

export default StepThree
