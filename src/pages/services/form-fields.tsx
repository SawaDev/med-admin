import { FormField } from "@/types/Other.type";

export const fields: FormField[] = [
  {
    name: "name",
    type: "input",
    inputType: "text",
    label: "Nomi",
    placeholder: "Nomi",
    gridColumn: "1",
  },
  {
    name: "price",
    type: "input",
    inputType: "number",
    label: "Narxi",
    placeholder: "Narxi",
    gridColumn: "1",
  }
]