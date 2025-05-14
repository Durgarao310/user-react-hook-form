import { Controller, FieldValues } from "react-hook-form";
import { BaseInput } from "../BaseInput";
import { NumberControllerProps } from "./type";

export function NumberController<T extends FieldValues>({
  id,
  name,
  control,
  rules,
  label,
  placeholder,
  disabled,
  readOnly,
  defaultValue,
  onChange,
}: NumberControllerProps<T>) {
  return (
    <Controller
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({
        field: {
          onChange: controllerOnChange,
          value,
          onBlur,
          disabled,
          name,
          ref,
        },
        fieldState: { error },
      }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e);
          }
          controllerOnChange(e);
        };

        return (
          <BaseInput
            required={rules?.required as boolean | undefined}
            id={id}
            label={label}
            ref={ref}
            onBlur={onBlur}
            placeholder={placeholder}
            min={rules?.min as number | undefined}
            max={rules?.max as number | undefined}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue}
            name={name}
            type="number"
            onChange={handleChange}
            value={value ?? ""}
            error={error}
            inputMode="numeric"
          />
        );
      }}
    />
  );
}
