/** @format */

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

interface TextareaControllerProps<T extends FieldValues> {
  name: keyof T & string;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
  clearErrors?: (name: Path<T>) => void;
}

export function TextareaController<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  placeholder,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  rows = 4,
  fullWidth = true,
  className,
  textareaClassName,
  labelClassName,
  errorClassName,
  helperTextClassName,
  clearErrors,
}: TextareaControllerProps<T>) {
  return (
    <div className={cn(fullWidth ? 'w-full' : '', className)}>
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

          const currentState = disabled
            ? 'disabled'
            : readOnly
            ? 'readonly'
            : fieldState.error
            ? 'error'
            : field.value
            ? 'filled'
            : 'default';

          return (
            <>
              <textarea
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                rows={rows}
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
                  fieldOnChange(e);
                  clearErrors?.(name as Path<T>);
                }}
                onBlur={(e) => {
                  fieldOnBlur();
                }}
                className={cn(
                  'w-full border rounded-md transition-all duration-200 focus:outline-none resize-none',
                  currentState === 'default' &&
                    'border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
                  currentState === 'error' &&
                    'border-red-500 bg-white text-neutral-900 focus:border-red-500 focus:ring-2 focus:ring-red-100',
                  currentState === 'disabled' &&
                    'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed',
                  currentState === 'readonly' &&
                    'border-neutral-200 bg-neutral-50 text-neutral-800',
                  textareaClassName
                )}
              />

              {fieldState.error && (
                <p
                  id={`${name}-error`}
                  className={cn('text-sm text-red-500 mt-1', errorClassName)}
                  role='alert'
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
