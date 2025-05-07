// components/form/BaseInput.tsx
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

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

export interface BaseInputProps {
  type: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  size?: 'sm' | 'md' | 'lg';
  currentState: 'default' | 'filled' | 'error' | 'disabled' | 'readonly';
  inputClassName?: string;
  min?: number;
  max?: number;
  step?: number;
  textarea?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  clearableIcon?: React.ReactNode;
  name: string;
}

export function BaseInput({
  type,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  readOnly,
  autoFocus,
  autoComplete,
  placeholder,
  icon,
  iconPosition = 'left',
  showPasswordToggle,
  showPassword,
  togglePasswordVisibility,
  size = 'md',
  currentState,
  inputClassName,
  min,
  max,
  step,
  textarea = false,
  clearable = false,
  onClear,
  clearableIcon,
  name,
}: BaseInputProps) {
  const effectiveType = type === 'password' && showPassword ? 'text' : type;

  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled,
    readOnly,
    autoFocus,
    autoComplete,
    placeholder,
    className: cn(
      'w-full border rounded-md transition-all duration-200 focus:outline-none',
      sizeClasses[size],
      icon ? iconPositionClasses[iconPosition] : '',
      currentState === 'default' &&
        'border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
      currentState === 'error' &&
        'border-red-500 bg-white text-neutral-900 focus:border-red-500 focus:ring-2 focus:ring-red-100',
      currentState === 'disabled' &&
        'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed',
      currentState === 'readonly' &&
        'border-neutral-200 bg-neutral-50 text-neutral-800',
      inputClassName
    ),
    min,
    max,
    step,
  };

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2',
            iconSizeClasses[size],
            currentState === 'disabled'
              ? 'text-neutral-400'
              : currentState === 'error'
              ? 'text-red-500'
              : 'text-neutral-500',
            showPasswordToggle ? 'cursor-pointer' : ''
          )}
          role={showPasswordToggle ? 'button' : undefined}
          tabIndex={showPasswordToggle ? 0 : undefined}
          aria-label={
            showPasswordToggle
              ? showPassword
                ? 'Hide password'
                : 'Show password'
              : undefined
          }
          onClick={showPasswordToggle ? togglePasswordVisibility : undefined}
          onKeyDown={
            showPasswordToggle
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePasswordVisibility?.();
                  }
                }
              : undefined
          }
        >
          {icon}
        </div>
      )}

      {textarea ? (
        <textarea {...commonProps as any} />
      ) : (
        <input type={effectiveType} {...commonProps} />
      )}

      {clearable && value && (
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
          onClick={onClear}
        >
          {clearableIcon ?? <X size={16} />}
        </div>
      )}

      {icon && iconPosition === 'right' && (
        <div
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            iconSizeClasses[size],
            currentState === 'disabled'
              ? 'text-neutral-400'
              : currentState === 'error'
              ? 'text-red-500'
              : 'text-neutral-500'
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
