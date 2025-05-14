import React, { forwardRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils"; // Classnames utility (e.g., clsx or tailwind-merge)
import { FieldError } from "react-hook-form";
import { BaseInputProps } from "./types";

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      id,
      name,
      type = "text",
      label,
      value,
      onChange,
      onBlur,
      required,
      readOnly,
      disabled,
      error,
      placeholder,
      autoFocus,
      autoComplete,
      hidden,
      minLength,
      maxLength,
      min,
      max,
      pattern,
      step,
      inputMode,
      autoCapitalize,
      spellCheck,
      ariaLabel,
      ariaDescribedBy,
      ariaInvalid,
      role,
      className,
      prefixIcon,
      suffixIcon,
      prefixIconClassName,
      suffixIconClassName,
      requiredIndicator = "*",
      size = "md",
      variant = "outline",
      clearable = false,
      onClear,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Normalize error messages
    const normalizeError = useCallback(
      (err: string | FieldError | string[] | undefined): string[] => {
        if (!err) return [];
        if (typeof err === "string") return [err];
        if (Array.isArray(err)) return err;
        return err.message ? [err.message] : [];
      },
      []
    );

    // Handle blur
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    // Handle clear
    const handleClear = useCallback(() => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }, [onChange, onClear]);

    // Combine errors
    const errorMessages = normalizeError(error);

    // Size and variant styles
    const sizeStyles = {
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2.5 px-4",
    };

    const variantStyles = {
      outline: "border border-gray-300 rounded-md",
      filled: "bg-gray-50 border border-transparent rounded-md",
      underline: "border-b-2 border-gray-300 rounded-none",
    };

    return (
      <div className={cn("relative w-full", hidden && "hidden")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium mb-1.5 transition-colors",
              errorMessages.length > 0 ? "text-red-600" : "text-gray-900",
              disabled && "text-gray-400 cursor-not-allowed",
              readOnly && "text-gray-500 cursor-default",
              required &&
                !disabled &&
                !readOnly &&
                `after:content-['${requiredIndicator}'] after:text-red-600 after:ml-0.5 after:text-sm`
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative flex items-center">
          {/* Prefix Icon */}
          {prefixIcon && (
            <div
              className={cn(
                "absolute left-3 flex items-center pointer-events-none text-gray-400",
                size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
                prefixIconClassName
              )}
            >
              {prefixIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            required={required}
            aria-required={required}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={max}
            pattern={pattern}
            step={step}
            inputMode={inputMode}
            autoCapitalize={autoCapitalize}
            spellCheck={spellCheck}
            aria-label={ariaLabel || label}
            aria-describedby={
              errorMessages.length > 0 ? `${id}-error` : ariaDescribedBy
            }
            aria-invalid={ariaInvalid ?? errorMessages.length > 0}
            role={role}
            className={cn(
              "w-full transition-all duration-200",
              sizeStyles[size],
              variantStyles[variant],
              "focus:outline-none focus:ring-2 focus:ring-blue-200",
              errorMessages.length > 0
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : isFocused
                ? "border-blue-500"
                : "border-gray-300",
              disabled && "bg-gray-100 cursor-not-allowed opacity-50",
              readOnly && "bg-gray-50 text-gray-500 cursor-default",
              prefixIcon && size === "sm" ? "pl-8" : prefixIcon ? "pl-10" : "",
              (suffixIcon || (clearable && value)) &&
                (size === "sm" ? "pr-8" : "pr-10"),
              className
            )}
          />

          {/* Suffix Icon or Clear Button */}
          {clearable && value && !suffixIcon && !disabled && !readOnly ? (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "absolute right-3 flex items-center text-gray-400 hover:text-gray-600",
                size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
              )}
              aria-label="Clear input"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            suffixIcon && (
              <div
                className={cn(
                  "absolute right-3 flex items-center pointer-events-none text-gray-400",
                  size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
                  suffixIconClassName
                )}
              >
                {suffixIcon}
              </div>
            )
          )}
        </div>

        {/* Error Messages */}
        {errorMessages.length > 0 && (
          <div id={`${id}-error`} className="mt-1 space-y-1" role="alert">
            {errorMessages.map((msg, index) => (
              <p key={index} className="text-sm text-red-600">
                {msg}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";