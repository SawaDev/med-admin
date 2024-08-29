import { FormField, Option } from "@/types/Other.type";

export const addRoomFields: FormField[] = [
  {
    name: "name",
    type: "input",
    inputType: "text",
    label: "Nomi",
    placeholder: "Nomi",
    gridColumn: "1",
  },
  {
    name: "type",
    type: "select",
    label: "Xona turi",
    placeholder: "Xona turi",
    options: [
      {
        value: "standard",
        label: "Standart"
      },
      {
        value: "premium",
        label: "Premium"
      }
    ],
    gridColumn: "1",
  }
]

export const addSpaceFields = (): FormField[] => {
  const roomOptions: Option[] = [
    {
      value: "1",
      label: "Room 1",
    },
    {
      value: "2",
      label: "Room 2",
    },
  ]

  return [
    {
      name: "name",
      type: "input",
      inputType: "text",
      label: "Nomi",
      placeholder: "Nomi",
      gridColumn: "1",
    },
    {
      name: "room_id",
      type: "select",
      options: roomOptions,
      label: "Xonani tanlang",
      placeholder: "Xonani tanlang",
      gridColumn: "1"
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
}