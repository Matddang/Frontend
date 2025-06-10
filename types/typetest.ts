import AddLoaction from "@/app/typetest/_components/AddLocation";
import Agreement from "@/app/typetest/_components/Agreement";
import Budget from "@/app/typetest/_components/Budget";
import Crops from "@/app/typetest/_components/Crops";
import Experience from "@/app/typetest/_components/Experience";
import Important from "@/app/typetest/_components/Important";
import Purpose from "@/app/typetest/_components/Purpose";
import Revenue from "@/app/typetest/_components/Revenue";
import Type from "@/app/typetest/_components/Type";

export const STEPS_LABEL = {
  EXPERIENCE: "experience",
  PURPOSE: "purpose",
  BUDGET: "budget",
  IMPORTANT: "important",
  CROPS: "crops",
  LOCATION: "location",
  REVENUE: "revenue",
  AGREEMENT: "agreement",
  TYPE: "type",
} as const;

export type StepLabel = (typeof STEPS_LABEL)[keyof typeof STEPS_LABEL];

export interface StepProps {
  nextStep: (
    field: StepLabel,
    value: string | string[] | number | object | boolean,
  ) => void;
}

export const TYPETEST_STEPS: {
  id: number;
  name: StepLabel;
  component: React.FC<StepProps>;
}[] = [
  {
    id: 1,
    name: STEPS_LABEL.EXPERIENCE,
    component: Experience,
  },
  {
    id: 2,
    name: STEPS_LABEL.PURPOSE,
    component: Purpose,
  },
  {
    id: 3,
    name: STEPS_LABEL.BUDGET,
    component: Budget,
  },
  {
    id: 4,
    name: STEPS_LABEL.IMPORTANT,
    component: Important,
  },
  {
    id: 5,
    name: STEPS_LABEL.CROPS,
    component: Crops,
  },
  {
    id: 6,
    name: STEPS_LABEL.LOCATION,
    component: AddLoaction,
  },
  {
    id: 7,
    name: STEPS_LABEL.REVENUE,
    component: Revenue,
  },
  {
    id: 8,
    name: STEPS_LABEL.AGREEMENT,
    component: Agreement,
  },
  {
    id: 9,
    name: STEPS_LABEL.TYPE,
    component: Type,
  },
];
