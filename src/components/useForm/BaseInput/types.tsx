import { FieldError } from "react-hook-form";

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix" | "size"> {
  id: string;
  name: string;
  type?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string | FieldError | string[];
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  hidden?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  pattern?: string;
  step?: string | number;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  spellCheck?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  role?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  prefixIconClassName?: string;
  suffixIconClassName?: string;
  requiredIndicator?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "underline";
  clearable?: boolean;
  onClear?: () => void;
}