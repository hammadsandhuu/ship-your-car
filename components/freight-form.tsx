"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Globe, HeartHandshake, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";
import StepFour from "./steps/step-four";
import StepFive from "./steps/step-five";
import StepSix from "./steps/step-six";
import StepSeven from "./steps/step-seven";
import ProgressBar from "./progress-bar";
import Image from "next/image";

export interface FormData {
  shippingType: string;
  freightType: string;
  serviceType: string;
  handlingType: string;
  packagingHelp: string;
  locationInput: string;
  deliveryAddress: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  supplierAddress?: string;
  factoryAddress?: string;
  warehouseAddress?: string;
  finalDeliveryAddress?: string;
  containerType: string;
  shippingDescription?: string;
  coldStoragePreference?: string;
  readyTime: string;
  selectedDate: Date | null;
  selectedTime: string;
  userName: string;
  userEmail: string;
  cbm?: string;
  weight?: string;
  volume?: string;
}

const FreightForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    shippingType: "",
    freightType: "",
    serviceType: "",
    handlingType: "",
    packagingHelp: "",
    locationInput: "",
    deliveryAddress: "",
    containerType: "",
    readyTime: "",
    selectedDate: null,
    selectedTime: "",
    userName: "",
    userEmail: "",
    cbm: "",
    weight: "",
    volume: "",
  });

  console.log("fomr data", formData);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Add goToStep function to navigate to specific step
  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const getActualStep = () => {
    if (
      formData.shippingType === "customs-inland" ||
      formData.shippingType === "transport-only"
    ) {
      // For these types: Step 1 → Step 4 → Step 5 → Step 6 → Step 7
      const stepMapping = {
        1: 1, // Service Type
        2: 4, // Locations (skip to step 4)
        3: 5, // Container Details
        4: 6, // Timeline
        5: 7, // Schedule Meeting
      };
      return (
        stepMapping[currentStep as keyof typeof stepMapping] || currentStep
      );
    }
    return currentStep; // Normal flow for air-sea
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "🎉 Consultation Scheduled Successfully!",
        description:
          "We'll send you a calendar invite and call you at the scheduled time.",
        className: "border-2",
        style: {
          backgroundColor: "var(--black-4)",
          borderColor: "var(--primary)",
          color: "var(--white)",
        },
      });
    } catch (error) {
      toast({
        title: "❌ Scheduling Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
        className: "border-2",
        style: {
          backgroundColor: "var(--black-4)",
          borderColor: "#ff4444",
          color: "var(--white)",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalSteps = () => {
    // For customs-inland and transport-only, show only 5 steps
    if (
      formData.shippingType === "customs-inland" ||
      formData.shippingType === "transport-only"
    ) {
      return 5;
    }
    // For air-sea, show all 7 steps
    return 7;
  };

  const getStepTitles = () => {
    if (
      formData.shippingType === "customs-inland" ||
      formData.shippingType === "transport-only"
    ) {
      return [
        "Service Type",
        "Locations",
        "Container Details",
        "Timeline",
        "Schedule Meeting",
      ];
    }
    return [
      "Service Type",
      "Freight/Handling",
      "Service Options",
      "Locations",
      "Container Details",
      "Timeline",
      "Schedule Meeting",
    ];
  };

  const getStepTitle = () => {
    const titles = {
      "transport-only": [
        "What Do You Need Help With Today?",
        "Cargo Handling Requirements",
        "Packaging Assistance",
        "Pickup & Delivery Details",
        "Container & Cargo Type",
        "Shipment Timeline",
        "Schedule Your Transport Consultation",
      ],
      "customs-inland": [
        "What Do You Need Help With Today?",
        "Cargo Handling Requirements",
        "Packaging Assistance",
        "Pickup Location Details",
        "Container & Cargo Type",
        "Shipment Timeline",
        "Schedule Your Customs & Inland Consultation",
      ],
      default: [
        "What Do You Need Help With Today?",
        "Choose Your Shipping Method",
        "Choose Your Service Type",
        formData.serviceType === "FOB (Freight on Board)"
          ? "Port of Loading & Discharge"
          : "Pickup & Delivery Address",
        "Container & Cargo Type",
        "Shipment Timeline",
        "Book Your Free Freight Call — 15 Minutes",
      ],
    };

    const titleArray =
      titles[formData.shippingType as keyof typeof titles] || titles.default;
    return titleArray[currentStep - 1] || "Freight Logistics Form";
  };

  const getStepDescription = () => {
    const descriptions = {
      "transport-only": [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Specify any special handling requirements for your cargo",
        "Let us know if you need assistance with packaging",
        "Provide pickup and delivery address details",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        "Let's discuss your transportation requirements",
      ],
      "customs-inland": [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Specify any special handling requirements for your cargo",
        "Let us know if you need assistance with packaging",
        "Provide pickup location and delivery address details",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        "Expert guidance for customs clearance and inland transport",
      ],
      default: [
        "Shipping via Sea, Air, or Land. Real Freight Advisors. No Bots. No Call Centers. 40+ Years of Experience.",
        "Choose between Air or Sea Freight. Not sure? Your assigned advisor will help you decide.",
        "FOB, ExWorks, or Door-to-Door — we'll explain each and help you pick what fits your shipment.",
        formData.serviceType === "FOB (Freight on Board)"
          ? "Where it loads. Where it offloads. No friction, just flow."
          : "Enter where the goods will be picked up—and the exact address they should be delivered to.",
        "Pick what you believe fits best — your supplier or shipper usually decides the container size. We'll confirm it for you.",
        "When will your shipment be ready?",
        "Expert freight solutions tailored for you",
      ],
    };

    const descArray =
      descriptions[formData.shippingType as keyof typeof descriptions] ||
      descriptions.default;
    return (
      descArray[currentStep - 1] ||
      "Complete your freight logistics requirements"
    );
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: nextStep,
      onPrev: prevStep,
      onSubmit: handleFormSubmit,
      isSubmitting,
    };

    const actualStep = getActualStep();

    switch (actualStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            goToStep={goToStep} // Pass the goToStep function
          />
        );
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      case 7:
        return <StepSeven {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--black)" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--primary)" }}
        ></div>
        <div
          className="absolute top-[30%] right-[10%] w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: "var(--primary)" }}
        ></div>
        <div
          className="absolute bottom-[20%] left-[15%] w-36 h-36 sm:w-56 sm:h-56 rounded-full opacity-10 blur-3xl animate-pulse delay-2000"
          style={{ backgroundColor: "var(--primary)" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Progress Bar */}
        {currentStep > 1 && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={getTotalSteps()}
            stepTitles={getStepTitles()}
          />
        )}

        <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            {currentStep === 1 && (
              <div className="text-center mb-12 sm:mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-8 sm:mb-12"
                >
                  <div className="flex justify-center items-center space-x-4 mb-6 sm:mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <Image
                        src={"/logo2.png"}
                        alt={""}
                        width={100}
                        height={100}
                      />
                    </motion.div>
                    <motion.h1
                      className="font-bold text-4xl sm:text-5xl md:text-6xl text-center sm:text-left ml-0"
                      style={{ color: "var(--primary)" }}
                    >
                      SABIT
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                  >
                    {currentStep === 1 && (
                      <p
                        className="text-xl sm:text-xl md:text-2xl px-4 mx-auto leading-relaxed font-light"
                        style={{ color: "var(--white-2)" }}
                      >
                        Global Freight. Personal Support. No Bots. No Call
                        Centers.
                      </p>
                    )}
                  </motion.div>
                </motion.div>

                {/* Feature Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="hidden sm:flex flex-col sm:flex-row justify-center items-center sm:space-x-8 md:space-x-12 space-y-4 sm:space-y-0"
                >
                  {[
                    {
                      icon: ShieldCheck,
                      text: "Secure & Reliable",
                      color: "var(--primary)",
                    },
                    {
                      icon: Globe,
                      text: "Global Coverage",
                      color: "var(--primary)",
                    },
                    {
                      icon: HeartHandshake,
                      text: "Human Support",
                      color: "var(--primary)",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.2, duration: 0.6 }}
                      className="flex items-center space-x-3 rounded-2xl px-6 py-4 shadow-lg border hover:shadow-xl transition-all duration-300"
                      style={{
                        backgroundColor: "var(--black-4)",
                        borderColor: "var(--black-5)",
                      }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: feature.color }}
                      />
                      <span
                        className="text-sm sm:text-base font-medium"
                        style={{ color: "var(--white-2)" }}
                      >
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Step Title and Description */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              {/* Title */}
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                  currentStep === 1 ? "hidden sm:block" : ""
                }`}
                style={{ color: "var(--white)" }}
              >
                {getStepTitle()}
              </h2>
              <p
                className={`text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-4 ${
                  currentStep === 1 ? "hidden sm:block" : "hidden sm:block"
                }`}
                style={{ color: "var(--gray-2)" }}
              >
                {currentStep === 1 ? getStepDescription() : ""}
              </p>
            </motion.div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="rounded-3xl sm:rounded-4xl shadow-2xl border p-4 md:p-12 lg:p-16  md:mx-auto relative overflow-hidden"
                style={{
                  backgroundColor: "var(--black-4)",
                  borderColor: "var(--black-5)",
                }}
              >
                <div className="relative z-10">{renderCurrentStep()}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightForm;
