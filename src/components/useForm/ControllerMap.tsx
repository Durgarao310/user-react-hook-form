/** @format */

import { Control, FieldValues, Path } from 'react-hook-form';
import {
  InputController,
  type InputControllerProps,
  type InputType,
} from './InputController';

// Define the FormFieldConfig type based on InputControllerProps
export type FormFieldConfig<T extends FieldValues = FieldValues> = {
  type: InputType; // Use InputType from InputController ('text' | 'number' | 'email' | 'password' | 'url' | 'tel' | 'textarea')
  name: Path<T>; // Use Path<T> to match the expected type in InputControllerProps
  label: string;
  control: Control<T>; // Control from react-hook-form
  rules?: InputControllerProps<T>['rules'];
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  min?: number; // For type="number"
  max?: number; // For type="number"
  step?: number; // For type="number"
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  clearErrors?: (name: Path<T> | Path<T>[]) => void; // Align with React Hook Form  hidden?: boolean; // To hide the field
  hidden?: boolean;
  defaultValue?: string | number; // Default value for the field
  clearable?: boolean; // For clearable input
  clearableIcon?: React.ReactNode; // Icon for clearable input
  clearableOnClick?: () => void; // Function to call when clearable icon is clicked
  helperTextClassName?: string; // Class name for helper text
};

// ControllerMap component
const ControllerMap = <T extends FieldValues>(props: FormFieldConfig<T>) => {
  const { type } = props;
  switch (type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    case 'url':
    case 'tel':
    case 'textarea':
      return <InputController {...props} />;
    default:
      return null;
  }
};

export default ControllerMap;
