"use client"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCarShippingForm } from "@/hooks/use-car-shipping-form";
import { FormStep } from "./FormStep";
import { CompletionStep } from "./CompletionStep";
import BookingStep from "./BookingStep";

export default function ShipCarForm() {
  const {
    formData,
    currentStep,
    isSubmitting,
    updateFormData,
    handleInitialSubmit,
    handleBookNow,
    handleWait24Hours,
    handleBookingComplete,
    goBack,
  } = useCarShippingForm();

  const renderBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ backgroundColor: "var(--primary)" }}
      />
      <div
        className="absolute top-[30%] right-[10%] w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ backgroundColor: "var(--primary)", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ backgroundColor: "var(--primary)", animationDelay: "2s" }}
      />
    </div>
  );

  const renderHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-6 sm:mb-8 lg:mb-10"
    >
      <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 lg:mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="SABIT Logo"
            width={80}
            height={80}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
        </motion.div>
        <motion.h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-left !ml-0 text-white/75">
          SABIT
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3"
          style={{ color: "var(--white)" }}
        >
          Ship Your Car from USA to KSA
        </h2>
        <p
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light px-4"
          style={{ color: "var(--white-2)" }}
        >
          Get a Free Quote & Advisory Call. No Bots. No Call Centers. Just
          Expert Support.
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--black)" }}>
      {renderBackground()}
      <div className="relative z-10 py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {renderHeader()}

          <AnimatePresence mode="wait">
            {currentStep === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <FormStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onSubmit={handleInitialSubmit}
                />
              </motion.div>
            )}

            {currentStep === "completion" && (
              <motion.div
                key="completion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CompletionStep
                  onBookNow={handleBookNow}
                  onWait24Hours={handleWait24Hours}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {currentStep === "booking" && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl sm:rounded-4xl shadow-2xl border p-4 md:p-12 lg:p-16 md:mx-auto relative overflow-hidden"
                style={{
                  backgroundColor: "var(--black-4)",
                  borderColor: "var(--black-5)",
                }}
              >
                <BookingStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onBack={goBack}
                  onSubmit={handleBookingComplete}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
