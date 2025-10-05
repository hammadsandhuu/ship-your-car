// hooks/use-car-shipping-form.ts
"use client";

import { useState } from "react";
import { CarFormData, FormStep } from "@/types/car-shipping";
import { useToast } from "@/hooks/use-toast";
import { submitCarShipping } from "@/lib/api";

export const useCarShippingForm = () => {
  const [formData, setFormData] = useState<CarFormData>({
    numberOfCars: "",
    carType: "",
    pickupState: "",
    dropOffCity: "Riyadh",
    mode: "",
    timeline: "",
    whatsapp: "",
    email: "",
    name: "",
  });

  const [currentStep, setCurrentStep] = useState<FormStep>("initial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (field: keyof CarFormData, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("completion");
  };

  const handleBookNow = () => {
    setCurrentStep("booking");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  const handleWait24Hours = async () => {
    setIsSubmitting(true);
    try {
      await submitCarShipping(formData, "wait-24-hours");
      toast({
        title: "Request Submitted Successfully!",
        description:
          "We'll contact you within 24 hours with a quote and next steps.",
        className: "border-2",
        style: {
          backgroundColor: "var(--black-4)",
          borderColor: "var(--primary)",
          color: "var(--white)",
        },
      });
      setTimeout(
        () => (window.location.href = "https://www.justsabit.com/"),
        2000
      );
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
        className: "border-2",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingComplete = async (bookingData: Partial<CarFormData>) => {
    setIsSubmitting(true);
    try {
      const payload = { ...formData, ...bookingData };
      await submitCarShipping(payload, "book-now");

      toast({
        title: "Consultation Scheduled Successfully!",
        description:
          "We'll send you a calendar invite and call you at the scheduled time.",
        className: "border-2",
        style: {
          backgroundColor: "var(--black-4)",
          borderColor: "var(--primary)",
          color: "var(--white)",
        },
      });

      setTimeout(
        () => (window.location.href = "https://www.justsabit.com/"),
        2000
      );
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: "Please try again or contact our support team.",
        variant: "destructive",
        className: "border-2",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => setCurrentStep("initial");

  return {
    formData,
    currentStep,
    isSubmitting,
    updateFormData,
    handleInitialSubmit,
    handleBookNow,
    handleWait24Hours,
    handleBookingComplete,
    goBack,
  };
};
