import { Control, Path, FieldValues } from "react-hook-form";

export interface NumberControllerProps<T extends FieldValues> {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  defaultValue?: T[Path<T>];
  onChange?: (value: string | number) => void;
}