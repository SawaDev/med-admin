import { createTherapySchema } from "@/schema/therapy";
import { z } from "zod";
import { DateRangeType, ListType, Response } from "./Other.type";

export interface Therapy {
  id: number;
  name: string;
  price: number;
}

export type CreateTherapy = z.infer<typeof createTherapySchema>;

export type CreateTherapyDataType = {
  comment?: string;
  patient_id: number;
  type_id: number;
  price_in_sum: number;
};

export type GetTherapiesData = Partial<DateRangeType> & ListType;

export type GetTherapiesResponse = Response & {
  data: {
    content: {
      id: number;
      comment?: string;
      type_name: string;
      price_in_sum: number;
      patient_name: string;
    }[];
    total_pages: number;
    total_elements: number;
  };
};

export type GetTherapyStatisticsResponse = Response & {
  data: {
    id: number;
    name: string;
    percentage: number;
  }[];
};

export type GetTherapyStatisticsData = {
  from_date_time: string;
  to_date_time: string;
};
