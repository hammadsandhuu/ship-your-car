"use client";
import { useState } from "react";
import type React from "react";

import type { CarFormData, FormStep } from "@/types/car-shipping";
import { submitCarShipping } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const initialFormData: CarFormData = {
  numberOfCars: "",
  carType: "",
  customCarType: "",
  pickupState: "",
  dropOffCity: "Riyadh",
  mode: "",
  timeline: "",
  whatsapp: "",
  email: "",
  name: "",
};

export const useCarShippingForm = () => {
  const [formData, setFormData] = useState<CarFormData>(initialFormData);

  const [currentStep, setCurrentStep] = useState<FormStep>("initial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateFormData = (field: keyof CarFormData, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep("initial");
  };

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
        title: "Success!",
        description:
          "Your request has been submitted. We'll contact you within 24 hours.",
        variant: "default",
        style: {
          backgroundColor: "var(--black-2)",
          borderColor: "var(--primary)",
          color: "var(--white)",
        },
      });
      resetForm();
      setTimeout(() => {
        window.location.href = "https://www.justsabit.com/";
      }, 10000);
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
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
        title: "Booking Confirmed!",
        description: "Your meeting has been scheduled successfully.",
        variant: "default",
        style: {
          backgroundColor: "var(--black-2)",
          borderColor: "var(--primary)",
          color: "var(--white)",
        },
      });
      resetForm();
      setTimeout(() => {
        window.location.href = "https://www.justsabit.com/";
      }, 10000);
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Failed to complete booking. Please try again.",
        variant: "destructive",
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
