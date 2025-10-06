// components/FormStep.tsx
"use client";

import type React from "react";

import { motion } from "framer-motion";
import type { CarFormData } from "@/types/car-shipping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Navigation,
  MessageCircle,
  Mail,
  ArrowRight,
  User,
} from "lucide-react";
import {
  US_STATES,
  KSA_CITIES,
  CAR_QUANTITIES,
  CAR_TYPES,
  SHIPPING_MODES,
  TIMELINES,
} from "@/lib/constants";

interface FormStepProps {
  formData: CarFormData;
  updateFormData: (field: keyof CarFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormStep: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  onSubmit,
}) => {
  const renderButtonGroup = (
    options: string[],
    field: keyof CarFormData,
    label: string
  ) => (
    <div className="space-y-2 sm:space-y-3">
      <Label
        className="text-sm sm:text-base font-semibold"
        style={{ color: "var(--white)" }}
      >
        {label}
      </Label>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => updateFormData(field, option)}
            className={`py-2.5 sm:py-3 px-3 rounded-xl border-2 transition-all duration-300 font-medium text-sm hover:scale-105 ${
              formData[field] === option
                ? "shadow-lg scale-105"
                : "hover:opacity-80"
            }`}
            style={{
              backgroundColor:
                formData[field] === option
                  ? "var(--primary)"
                  : "var(--black-5)",
              borderColor:
                formData[field] === option
                  ? "var(--primary)"
                  : "var(--black-6)",
              color:
                formData[field] === option ? "var(--black)" : "var(--white-2)",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="rounded-2xl sm:rounded-3xl shadow-2xl border p-4 sm:p-6 md:p-8 relative overflow-hidden max-w-2xl mx-auto"
      style={{
        backgroundColor: "var(--black-4)",
        borderColor: "var(--black-5)",
      }}
    >
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {renderButtonGroup(CAR_QUANTITIES, "numberOfCars", "How many cars?")}
        {renderButtonGroup(CAR_TYPES, "carType", "Car type")}

        {formData.carType === "Other" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              type="text"
              placeholder="Please specify car type"
              value={formData.customCarType || ""}
              onChange={(e) => updateFormData("customCarType", e.target.value)}
              className="h-10 sm:h-11 text-sm rounded-xl border-2 transition-all hover:border-opacity-80 mt-2"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: formData.customCarType
                  ? "var(--primary)"
                  : "var(--black-6)",
                color: "var(--white-2)",
              }}
            />
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="pickupState"
              className="text-sm sm:text-base font-semibold flex items-center gap-2"
              style={{ color: "var(--white)" }}
            >
              <MapPin className="w-4 h-4" style={{ color: "var(--primary)" }} />{" "}
              Pickup State (USA)
            </Label>
            <Select
              value={formData.pickupState}
              onValueChange={(value) => updateFormData("pickupState", value)}
            >
              <SelectTrigger
                className="h-10 sm:h-11 text-sm rounded-xl border-2 hover:border-opacity-80 transition-all"
                style={{
                  backgroundColor: "var(--black-5)",
                  borderColor: formData.pickupState
                    ? "var(--primary)"
                    : "var(--black-6)",
                  color: "var(--white-2)",
                }}
              >
                <SelectValue placeholder="Select pickup state" />
              </SelectTrigger>
              <SelectContent
                className="max-h-[300px]"
                style={{
                  backgroundColor: "var(--black-4)",
                  borderColor: "var(--black-6)",
                }}
              >
                {US_STATES.map((state) => (
                  <SelectItem
                    key={state}
                    value={state}
                    className="hover:opacity-80 cursor-pointer"
                    style={{ color: "var(--white-2)" }}
                  >
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="dropOffCity"
              className="text-sm sm:text-base font-semibold flex items-center gap-2"
              style={{ color: "var(--white)" }}
            >
              <Navigation
                className="w-4 h-4"
                style={{ color: "var(--primary)" }}
              />{" "}
              Drop-off City (KSA)
            </Label>
            <Select
              value={formData.dropOffCity}
              onValueChange={(value) => updateFormData("dropOffCity", value)}
            >
              <SelectTrigger
                className="h-10 sm:h-11 text-sm rounded-xl border-2 hover:border-opacity-80 transition-all"
                style={{
                  backgroundColor: "var(--black-5)",
                  borderColor: formData.dropOffCity
                    ? "var(--primary)"
                    : "var(--black-6)",
                  color: "var(--white-2)",
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: "var(--black-4)",
                  borderColor: "var(--black-6)",
                }}
              >
                {KSA_CITIES.map((city) => (
                  <SelectItem
                    key={city}
                    value={city}
                    className="hover:opacity-80 cursor-pointer"
                    style={{ color: "var(--white-2)" }}
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {renderButtonGroup(SHIPPING_MODES, "mode", "Mode")}
        {renderButtonGroup(TIMELINES, "timeline", "Timeline")}

        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm sm:text-base font-semibold flex items-center gap-2"
            style={{ color: "var(--white)" }}
          >
            <User className="w-4 h-4" style={{ color: "var(--primary)" }} />{" "}
            Full Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            required
            className="h-10 sm:h-11 text-sm rounded-xl border-2 transition-all hover:border-opacity-80"
            style={{
              backgroundColor: "var(--black-5)",
              borderColor: formData.name ? "var(--primary)" : "var(--black-6)",
              color: "var(--white-2)",
            }}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="whatsapp"
              className="text-sm sm:text-base font-semibold flex items-center gap-2"
              style={{ color: "var(--white)" }}
            >
              <MessageCircle
                className="w-4 h-4"
                style={{ color: "var(--primary)" }}
              />{" "}
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              required
              type="tel"
              placeholder="+1 234 567 8900"
              value={formData.whatsapp}
              onChange={(e) => updateFormData("whatsapp", e.target.value)}
              className="h-10 sm:h-11 text-sm rounded-xl border-2 transition-all hover:border-opacity-80"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: formData.whatsapp
                  ? "var(--primary)"
                  : "var(--black-6)",
                color: "var(--white-2)",
              }}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm sm:text-base font-semibold flex items-center gap-2"
              style={{ color: "var(--white)" }}
            >
              <Mail className="w-4 h-4" style={{ color: "var(--primary)" }} />{" "}
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
              className="h-10 sm:h-11 text-sm rounded-xl border-2 transition-all hover:border-opacity-80"
              style={{
                backgroundColor: "var(--black-5)",
                borderColor: formData.email
                  ? "var(--primary)"
                  : "var(--black-6)",
                color: "var(--white-2)",
              }}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-fit h-12 sm:h-13 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ backgroundColor: "var(--primary2)", color: "var(--black)" }}
        >
          Next <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </form>
    </motion.div>
  );
};
