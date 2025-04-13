/** @format */

import { InputType } from '@/components/useForm/InputController';
import { EqualApproximatelyIcon } from 'lucide-react';
import { Control } from 'react-hook-form';

const formConfig = (control: Control) => {
  return [
    {
      type: 'email' as InputType,
      name: 'emailBasic',
      label: 'Email',
      control,
      placeholder: 'Enter your email',
      rules: { required: 'Email is required' },
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailDisabled',
      label: 'Email (Disabled)',
      placeholder: 'Email is disabled',
      disabled: true,
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailReadonly',
      label: 'Email (Readonly)',
      placeholder: 'Readonly email',
      readOnly: true,
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailWithHelper',
      label: 'Email',
      placeholder: 'you@example.com',
      helperText: 'We’ll never share your email.',
      rules: { required: 'Email is required' },
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailWithIconLeft',
      label: 'Email',
      placeholder: 'Enter your email',
      icon: <EqualApproximatelyIcon className='h-4 w-4' />,
      iconPosition: 'left' as 'left' | 'right',
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailWithIconRight',
      label: 'Email',
      placeholder: 'Enter your email',
      icon: <EqualApproximatelyIcon className='h-4 w-4' />,
      iconPosition: 'right' as 'left' | 'right',
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailLarge',
      label: 'Email (Large)',
      placeholder: 'large@example.com',
      size: 'lg' as 'sm' | 'md' | 'lg',
      fullWidth: true,
    },
    {
      type: 'email' as InputType,
      control,
      name: 'emailSmall',
      label: 'Email (Small)',
      placeholder: 'small@example.com',
      size: 'sm' as 'sm' | 'md' | 'lg',
      fullWidth: true,
    },
  ];
};

export default formConfig;
