"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import { useState } from "react";
import ImageEditor from "./ImageEditor";
import { createCompanyAction } from "@/lib/actions/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const steps: StepConfig[] = [
  {
    name: "Company Name",
    field: "name",
    type: "text",
    question: "What is your business' name?",
  },
  {
    name: "Company Logo",
    field: "logo",
    type: "custom",
    question:
      "Optional Logo for your business. Please wait until your logo is displayed...",
  },
  {
    name: "Description",
    field: "description",
    type: "textarea",
    question: "Brief description of your business...",
  },
  {
    name: "Investment",
    field: "investment",
    type: "number",
    question: "Your estimated investment so far...",
  },
  {
    name: "Assets Value",
    field: "assetsValue",
    type: "number",
    question: "Total estimated value of your assets...",
  },
  {
    name: "Total Revenue",
    field: "totalRevenue",
    type: "number",
    question: "Your estimated total revenue so far...",
  },
  {
    name: "Total Expenditure",
    field: "totalExpenditure",
    type: "number",
    question: "Your estimated total expenditure...",
  },
  {
    name: "Loan Balance",
    field: "loanBalance",
    type: "number",
    question: "Your current loan balance...",
  },
  {
    name: "Bank Balance",
    field: "bankBalance",
    type: "number",
    question: "Your current bank balance...",
  },
  {
    name: "Cash Balance",
    field: "cashBalance",
    type: "number",
    question: "Your current Mpesa and Cash balance...",
  },
];

const CompanyStepperForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    name: "",
    logo: "",
    description: "",
    investment: 0,
    assetsValue: 0,
    totalRevenue: 0,
    totalExpenditure: 0,
    loanBalance: 0,
    bankBalance: 0,
    cashBalance: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 1.5 } },
  };

  const renderInput = (step: StepConfig) => {
    switch (step.type) {
      case "text":
      case "number":
        return (
          <Input
            type={step.type}
            name={step.field}
            value={companyData[step.field]}
            onChange={handleChange}
            placeholder={`Enter ${step.name.toLowerCase()}`}
            className="w-full px-4 py-2 border-0 rounded-md outline-none focus-visible:ring-0"
          />
        );
      case "textarea":
        return (
          <Textarea
            name={step.field}
            value={companyData[step.field]}
            onChange={handleChange}
            placeholder={`Enter ${step.name.toLowerCase()}`}
            className="w-full px-4 py-2 border-0 rounded-md outline-none focus-visible:ring-0"
            rows={4}
          />
        );
      case "custom":
        return (
          <ImageEditor
            companyName={companyData.name}
            setLogo={(logo: string) =>
              setCompanyData((prev) => ({ ...prev, logo }))
            }
            logo={companyData.logo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 laptop:w-1/3 h-screen">
      <h2 className="laptop:text-2xl text-gray-700 font-bold mb-4 text-center">
        {steps[step].question}
      </h2>

      {/* Step Indicator */}
      <div className="mb-6">
        <p className="text-gray-600">
          Step {step + 1} of {steps.length}
        </p>
        <div className="flex space-x-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={` w-4 h-4 laptop:w-6 laptop:h-6 rounded-full ${
                i <= step
                  ? "bg-gradient-to-r from-bg-from-dark to-bg-to-dark"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Form Step Animation */}
      <motion.div
        key={step}
        className="w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={stepVariants}
      >
        <div className="w-full mb-4 flex flex-col items-center">
          <label className="block mb-2 text-gray-700">{steps[step].name}</label>
          {renderInput(steps[step])}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full">
        <Button
          className={`px-4 py-2 bg-gradient-to-r from-bg-from-dark to-bg-to-dark text-white rounded-md ${
            step === 0 ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
          onClick={handleBack}
          disabled={step === 0}
        >
          <ChevronLeft />
          Back
        </Button>

        <Button
          className={`px-4 py-2 bg-gradient-to-r from-bg-from-dark to-bg-to-dark text-white rounded-md ${
            step === steps.length - 1 ? "hidden" : ""
          }`}
          onClick={handleNext}
          disabled={step === steps.length - 1}
        >
          Next
          <ChevronRight />
        </Button>

        {/* Submit Button (only on last step) */}
        {step === steps.length - 1 && (
          <motion.button
            className="px-6 py-2 bg-gradient-to-r from-bg-from-dark to-bg-to-dark text-white rounded-md flex flex-row space-x-2 items-center "
            disabled={creatingCompany}
            onClick={() => {
              setCreatingCompany(true);
              createCompanyAction(companyData, session?.user?.id!!).then(
                async (res) => {
                  await update({
                    ...session,
                    user: { ...session?.user, companies: [{ res }] },
                  });
                  setCreatingCompany(false);

                  router.refresh();
                }
              );
            }}
          >
            <div>{creatingCompany ? "Submitting..." : "Submit"}</div>
            {!creatingCompany && <Loader2Icon className="animate-spin" size={18} />}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CompanyStepperForm;
