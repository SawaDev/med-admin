import { Control, FieldValues } from "react-hook-form";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormField } from "@/types/Other.type";
import { FormTextarea } from "./FormTextarea";

interface DynamicFormProps<T extends FieldValues> {
  control: Control<T, any>;
  fields: FormField[];
}

const DynamicForm = <T extends FieldValues>({ control, fields }: DynamicFormProps<T>) => {
  return (
    <div className={`grid grid-cols-1 gap-4`}>
      {fields.map((field, index) => {
        if (field.type === "select") {
          return (
            <div key={index} className={`col-span-${field.gridColumn}`}>
              <FormSelect
                control={control}
                name={field.name}
                label={field.label}
                options={field.options || []}
                placeholder={field.placeholder}
              />
            </div>
          );
        } else if (field.type === "input") {
          return (
            <div key={index} className={`col-span-${field.gridColumn}`}>
              <FormInput
                control={control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.inputType || "text"}
              />
            </div>
          );
        } else if (field.type === "textarea") {
          return (
            <div key={index} className={`col-span-${field.gridColumn}`}>
              <FormTextarea
                control={control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
              />
            </div>
          )
        }
        return null;
      })}
    </div>
  );
};

export default DynamicForm