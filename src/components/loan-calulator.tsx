import { LoanCalculatorIcon } from "@/helpers/icons";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { IndianRupee, Percent } from "lucide-react";
import { Slider } from "./ui/slider";

function LoanCalculator() {
  const [amount, setAmount] = useState(400000);
  const [interest, setInterest] = useState<string>("8"); // string for input
  const [years, setYears] = useState(10);

  // Format number in Indian style (1,00,000 for 1 lakh)
  const formatAmount = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  // Remove commas when typing back
  const parseAmount = (value: string) => Number(value.replace(/,/g, ""));

  // EMI Calculation
  const calculateEMI = (P: number, annualRate: number, Y: number) => {
    const N = Y * 12; // months
    const R = annualRate / 12 / 100; // monthly interest rate
    if (R === 0) return P / N; // simple division if 0% interest
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return emi;
  };

  const emi = calculateEMI(amount, parseFloat(interest) || 0, years);

  return (
    <div>
      <div className="bg rounded-4xl mt-5 flex justify-between items-center px-5">
        <LoanCalculatorIcon />
        <div className="flex-col flex items-end w-1/3">
          <h1 className="font-bold md:text-6xl text-3xl primary-bg-text">
            ₹ {formatAmount(Math.round(emi))}
          </h1>
          <h2 className="mt-5 md:text-3xl text-xl secondary-text">Monthly EMI</h2>
          <p className="mt-10 text-base secondary-text text-left">
            This EMI calculator is generic in nature and the actual EMI amount
            may vary depending on the rates/charges levied by the applicable
            home loan lender.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 px-5 py-5 gap-x-14 mt-5">
        {/* Loan Amount */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl secondary-text">Loan Amount</h1>
            <div className="relative h-8 w-32">
              <IndianRupee
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <Input
                type="text"
                value={formatAmount(amount)}
                onChange={(e) => {
                  const raw = parseAmount(e.target.value);
                  if (!isNaN(raw)) setAmount(raw);
                }}
                className="pl-8 h-full w-full rounded-full placeholder:text-secondary-text secondary-text font-medium text-lg bg-[#EFEFEF]"
                placeholder="Currency"
              />
            </div>
          </div>
          <Slider
            min={100000}
            max={10000000}
            step={10000}
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            className="mt-10"
          />
          <div className="flex justify-between items-center secondary-text mt-3">
            <h1>₹ 1 Lakh</h1>
            <h1>₹ 1 Cr</h1>
          </div>
        </div>

        {/* Tenure */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl secondary-text">Tenure</h1>
            <div className="relative h-8 w-20">
              <Input
                type="text"
                value={years}
                onChange={(e) => {
                  const raw = parseAmount(e.target.value);
                  if (!isNaN(raw)) setYears(raw);
                }}
                className="pl-3 h-full w-full rounded-full placeholder:text-secondary-text secondary-text font-medium text-lg bg-[#EFEFEF]"
              />
              <p className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {years > 1 ? "Yrs" : "Yr"}
              </p>
            </div>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={[years]}
            onValueChange={(value) => setYears(value[0])}
            className="mt-10"
          />
          <div className="flex justify-between items-center secondary-text mt-3">
            <h1>1 yr</h1>
            <h1>30 yrs</h1>
          </div>
        </div>

        {/* Interest */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl secondary-text">Rate of Interest</h1>
            <div className="relative h-8 w-20">
              <Input
                type="text"
                value={interest}
                onChange={(e) => {
                  const value = e.target.value;
                  // allow only numbers + one decimal
                  if (/^\d*\.?\d*$/.test(value)) {
                    setInterest(value);
                  }
                }}
                className="pl-3 h-full w-full rounded-full placeholder:text-secondary-text secondary-text font-medium text-lg bg-[#EFEFEF]"
              />
              <Percent
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
            </div>
          </div>
          <Slider
            min={0.5}
            max={15}
            step={0.1}
            value={[parseFloat(interest) || 0]}
            onValueChange={(value) => setInterest(value[0].toString())}
            className="mt-10"
          />
          <div className="flex justify-between items-center secondary-text mt-3">
            <h1>0.5 %</h1>
            <h1>15 %</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;
