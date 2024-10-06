export type Response = {
  success: boolean;
  message?: string;
};

export interface Option {
  value: string;
  label: string;
}

export type SheetType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export interface FormField {
  type: "select" | "input" | "textarea" | "date";
  name: string;
  label: string;
  options?: Option[];
  inputType?: string;
  gridColumn: string;
  optional?: boolean;
  required_error?: string;
  placeholder?: string;
}

export type DateRangeType = {
  from_date: string;
  to_date: string;
};

export type ListType = {
  page: number;
  size: number;
  search?: string;
};

export interface ListResponse<T> extends Response {
  data: {
    content: T[];
    total_elements: number;
    total_pages: number;
  };
}
