"use client";

import Frame from "@/components/layout/Frame";
import { StepLabel, TYPETEST_STEPS } from "@/types/typetest";
import { useState } from "react";

type FormDataType = {
  experience?: string;
  purpose?: string;
  budget?: number;
  important?: string;
  crops?: string;
  location?: string;
  revenue?: string;
};

export default function Page() {
  const [step, setStep] = useState<number>(TYPETEST_STEPS[0].id);
  const [formData, setFormData] = useState<FormDataType | null>(null);

  const CurrentComponent = TYPETEST_STEPS[step - 1]?.component;

  const nextStep = (
    field: StepLabel,
    value: string | string[] | number | object | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Frame>
      <CurrentComponent
        nextStep={(field, value) => nextStep(field, value)}
        prevStep={prevStep}
      />
    </Frame>
  );
}
