/** @format */

import { useState } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InputState =
  | 'default'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'readonly';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'url'
  | 'tel';

export interface InputControllerProps<T extends FieldValues> {
  name: keyof T & string;
  label: string;
  type?: InputType;
  control: Control<T>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  rules?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
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
  helperTextClassName?: string;
  min?: number; // For type="number"
  max?: number; // For type="number"
  step?: number; // For type="number"
  clearErrors?: (name: Path<T>) => void; // Function to clear errors
}

// Static class definitions to prevent re-creation on each render
const sizeClasses = {
  sm: 'text-xs py-1 px-2',
  md: 'text-sm py-2 px-3',
  lg: 'text-md py-3 px-4',
} as const;

const iconPositionClasses = {
  left: 'pl-10',
  right: 'pr-10',
} as const;

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

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
  placeholder,
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
  helperTextClassName,
  min,
  max,
  step,
  clearErrors,
}: InputControllerProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    if (!disabled && !readOnly) {
      setShowPassword((prev) => !prev);
    }
  };

  // Determine effective input type
  const effectiveType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div
      className={cn(fullWidth ? 'w-full' : '', className)}
      data-testid={`input-container-${name}`}
    >
      <label
        htmlFor={name}
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
        render={({ field, fieldState }) => {
          const {
            onChange: fieldOnChange,
            onBlur: fieldOnBlur,
            ref,
            ...restField
          } = field;

          let currentState: InputState = 'default';
          if (disabled) currentState = 'disabled';
          else if (readOnly) currentState = 'readonly';
          else if (fieldState.error) currentState = 'error';
          else if (field.value) currentState = 'filled';

          // Use password toggle icon if type="password" and no custom icon is provided
          const effectiveIcon =
            type === 'password' && !icon ? (
              showPassword ? (
                <Eye />
              ) : (
                <EyeOff />
              )
            ) : (
              icon
            );

          return (
            <>
              <div className='relative'>
                {effectiveIcon && iconPosition === 'left' && (
                  <div
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2',
                      iconSizeClasses[size],
                      currentState === 'disabled'
                        ? 'text-neutral-400'
                        : currentState === 'error'
                        ? 'text-red-500'
                        : 'text-neutral-500',
                      type === 'password' && !icon ? 'cursor-pointer' : ''
                    )}
                    aria-hidden={
                      type !== 'password' || !!icon ? 'true' : undefined
                    }
                    role={type === 'password' && !icon ? 'button' : undefined}
                    tabIndex={type === 'password' && !icon ? 0 : undefined}
                    aria-label={
                      type === 'password' && !icon
                        ? showPassword
                          ? 'Hide password'
                          : 'Show password'
                        : undefined
                    }
                    onClick={
                      type === 'password' && !icon
                        ? togglePasswordVisibility
                        : undefined
                    }
                    onKeyDown={
                      type === 'password' && !icon
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              togglePasswordVisibility();
                            }
                          }
                        : undefined
                    }
                  >
                    {effectiveIcon}
                  </div>
                )}

                <input
                  id={name}
                  type={effectiveType}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  autoFocus={autoFocus}
                  autoComplete={autoComplete}
                  min={min}
                  max={max}
                  step={step}
                  ref={ref}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error
                      ? `${name}-error`
                      : helperText
                      ? `${name}-helper`
                      : undefined
                  }
                  {...restField}
                  onChange={(e) => {
                    fieldOnChange(e); // Update form state
                    clearErrors?.(name as Path<T>); // Clear error for this field
                    onChange?.(e); // Call custom onChange, if provided
                  }}
                  onBlur={(e) => {
                    fieldOnBlur();
                    onBlur?.(e);
                  }}
                  onFocus={(e) => {
                    onFocus?.(e);
                  }}
                  className={cn(
                    'w-full border rounded-md transition-all duration-200 focus:outline-none',
                    sizeClasses[size],
                    effectiveIcon ? iconPositionClasses[iconPosition] : '',
                    currentState === 'default' &&
                      'border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
                    currentState === 'error' &&
                      'border-red-500 bg-white text-neutral-900 focus:border-red-500 focus:ring-2 focus:ring-red-100',
                    currentState === 'disabled' &&
                      'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed',
                    currentState === 'readonly' &&
                      'border-neutral-200 bg-neutral-50 text-neutral-800',
                    inputClassName
                  )}
                  data-testid={`input-${name}`}
                />

                {effectiveIcon && iconPosition === 'right' && (
                  <div
                    className={cn(
                      'absolute right-3 top-1/2 -translate-y-1/2',
                      iconSizeClasses[size],
                      currentState === 'disabled'
                        ? 'text-neutral-400'
                        : currentState === 'error'
                        ? 'text-red-500'
                        : 'text-neutral-500',
                      type === 'password' && !icon ? 'cursor-pointer' : ''
                    )}
                    aria-hidden={
                      type !== 'password' || !!icon ? 'true' : undefined
                    }
                    role={type === 'password' && !icon ? 'button' : undefined}
                    tabIndex={type === 'password' && !icon ? 0 : undefined}
                    aria-label={
                      type === 'password' && !icon
                        ? showPassword
                          ? 'Hide password'
                          : 'Show password'
                        : undefined
                    }
                    onClick={
                      type === 'password' && !icon
                        ? togglePasswordVisibility
                        : undefined
                    }
                    onKeyDown={
                      type === 'password' && !icon
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              togglePasswordVisibility();
                            }
                          }
                        : undefined
                    }
                  >
                    {effectiveIcon}
                  </div>
                )}
              </div>

              {fieldState.error && (
                <p
                  id={`${name}-error`}
                  className={cn('text-sm text-red-500 mt-1', errorClassName)}
                  role='alert'
                  data-testid={`error-${name}`}
                >
                  {fieldState.error.message || 'This field is invalid'}
                </p>
              )}

              {helperText && !fieldState.error && (
                <p
                  id={`${name}-helper`}
                  className={cn(
                    'text-sm text-neutral-500 mt-1',
                    helperTextClassName
                  )}
                  data-testid={`helper-${name}`}
                >
                  {helperText}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
