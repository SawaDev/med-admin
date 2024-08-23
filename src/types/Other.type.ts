
export interface Option {
  value: string
  label: string
}

export type SheetType = {
  open: boolean
  setOpen: (value: boolean) => void
}

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