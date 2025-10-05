// components/CompletionStep.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

interface CompletionStepProps {
  onBookNow: () => void;
  onWait24Hours: () => void;
  isSubmitting: boolean;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  onBookNow,
  onWait24Hours,
  isSubmitting,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="rounded-2xl sm:rounded-3xl shadow-2xl border p-6 sm:p-8 md:p-10 text-center"
      style={{
        backgroundColor: "var(--black-4)",
        borderColor: "var(--black-5)",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
        style={{ backgroundColor: "rgba(var(--primary-rgb), 0.2)" }}
      >
        <CheckCircle
          className="w-8 h-8 sm:w-10 sm:h-10"
          style={{ color: "var(--primary2)" }}
        />
      </motion.div>

      <h3
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
        style={{ color: "var(--white)" }}
      >
        Thank You for Your Submission!
      </h3>
      <p
        className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
        style={{ color: "var(--gray-2)" }}
      >
        Would you like to book a consultation call now, or would you prefer we
        contact you within 24 hours?
      </p>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
        <Button
          onClick={onBookNow}
          className="h-11 sm:h-12 md:h-13 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ backgroundColor: "var(--primary2)", color: "var(--black)" }}
        >
          <Clock className="mr-2 w-4 h-4" />
          Book Call Now
        </Button>
        <Button
          onClick={onWait24Hours}
          disabled={isSubmitting}
          variant="outline"
          className="h-11 sm:h-12 md:h-13 text-sm sm:text-base font-semibold rounded-xl border-2 hover:opacity-80 hover:scale-[1.02] bg-transparent transition-all duration-300"
          style={{
            backgroundColor: "var(--black-5)",
            borderColor: "var(--black-6)",
            color: "var(--white-2)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Wait 24 Hours"}
        </Button>
      </div>
    </motion.div>
  );
};
