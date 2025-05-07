import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BaseInput } from '../BaseInput';

type InputState = 'default' | 'disabled' | 'readonly' | 'error' | 'filled';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'tel'
  | 'url'
  | 'search';

export interface InputControllerProps<T extends FieldValues> {
  name: keyof T & string;
  label: string;
  control: Control<T>;
  type?: InputType;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  rules?: RegisterOptions<T, Path<T>>;
  defaultValue?: string | number;

  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';

  helperText?: string;
  clearErrors?: (name: Path<T>) => void;

  clearable?: boolean;
  clearableIcon?: React.ReactNode;
  clearableOnClick?: () => void;

  min?: number;
  max?: number;
  step?: number;

  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

export function InputController<T extends FieldValues>({
  name,
  label,
  type = 'text',
  control,
  onChange,
  onBlur,
  onFocus,
  rules,
  icon,
  iconPosition = 'left',
  placeholder = '',
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  autoComplete,
  size = 'md',
  fullWidth = true,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  clearableOnClick,
  clearableIcon,
  clearable = false,
  defaultValue,
  helperTextClassName,
  min,
  max,
  step,
  clearErrors,
}: InputControllerProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    if (!disabled && !readOnly) {
      setShowPassword((prev) => !prev);
    }
  };

  const inputId = `input-${name}`;

  return (
    <div className={cn(fullWidth ? 'w-full' : '', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'block text-sm font-medium mb-1 text-neutral-800',
          required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : '',
          disabled ? 'text-neutral-400 cursor-not-allowed' : '',
          labelClassName
        )}
      >
        {label}
      </label>

      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => {
          const { onChange: fieldOnChange, onBlur: fieldOnBlur, ref, value } = field;
          let currentState: InputState = 'default';

          if (disabled) currentState = 'disabled';
          else if (readOnly) currentState = 'readonly';
          else if (fieldState.error) currentState = 'error';
          else if (value) currentState = 'filled';

          const effectiveIcon =
            type === 'password' && !icon
              ? showPassword
                ? <Eye />
                : <EyeOff />
              : icon;

          const isTextarea = type === 'textarea';

          return (
            <>
              <BaseInput
                id={inputId}
                ref={ref}
                name={name}
                type={type}
                value={value}
                onChange={(e) => {
                  fieldOnChange(e);
                  clearErrors?.(name as Path<T>);
                  onChange?.(e as React.ChangeEvent<HTMLInputElement>);
                }}
                onBlur={(e) => {
                  fieldOnBlur();
                  onBlur?.(e as React.FocusEvent<HTMLInputElement>);
                }}
                onFocus={onFocus}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                placeholder={placeholder}
                icon={effectiveIcon}
                iconPosition={iconPosition}
                showPasswordToggle={type === 'password' && !icon}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                size={size}
                currentState={currentState}
                inputClassName={inputClassName}
                min={min}
                max={max}
                step={step}
                textarea={isTextarea}
                clearable={clearable}
                onClear={() => {
                  fieldOnChange('');
                  clearErrors?.(name as Path<T>);
                  clearableOnClick?.();
                }}
                clearableIcon={clearableIcon}
              />

              {fieldState.error ? (
                <p className={cn('text-sm text-red-500 mt-1', errorClassName)} role="alert">
                  {fieldState.error.message}
                </p>
              ) : helperText ? (
                <p className={cn('text-sm text-neutral-500 mt-1', helperTextClassName)}>
                  {helperText}
                </p>
              ) : null}
            </>
          );
        }}
      />
    </div>
  );
}
