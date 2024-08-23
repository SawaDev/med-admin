import { FormField } from "@/types/Other.type";

export const fields: FormField[] = [
  {
    name: "name",
    type: "input",
    inputType: "text",
    label: "Ismi",
    placeholder: "Ismi",
    gridColumn: "1",
  },
  {
    name: "surname",
    type: "input",
    inputType: "text",
    label: "Familya",
    placeholder: "Familya",
    gridColumn: "1",
  },
  {
    name: "birthdate",
    type: "input",
    inputType: "text",
    label: "Tug'ilgan kun",
    placeholder: "Tug'ilgan kun",
    gridColumn: "1",
  },
  {
    name: "address",
    type: "textarea",
    inputType: "text",
    label: "Address",
    placeholder: "Address",
    gridColumn: "1",
  },
]