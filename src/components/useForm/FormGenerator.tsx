/** @format */

import { Fragment } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import ControllerMap, { FormFieldConfig } from './ControllerMap'; // Adjust path as needed
import { cn } from '@/lib/utils'; // Assuming you have this utility for classNames

// Props for FormGenerator
interface FormGeneratorProps<T extends FieldValues> {
  fields: FormFieldConfig<T>[]; // Array of field configurations
  form: UseFormReturn<T>; // React Hook Form's useForm return value
  className?: string; // Optional className for the container
}

// FormGenerator component
function FormGenerator<T extends FieldValues>({
  fields,
  form,
  className,
}: FormGeneratorProps<T>) {
  const { clearErrors } = form;

  return (
    <>
      {fields.map((field) => {
        const { hidden = false, fullWidth = false, name } = field;
        if (hidden) return null;

        return (
          <Fragment key={name}>
            <div className={cn(fullWidth ? 'col-span-2' : '', className)}>
              <ControllerMap {...field} clearErrors={clearErrors} />
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export default FormGenerator;
