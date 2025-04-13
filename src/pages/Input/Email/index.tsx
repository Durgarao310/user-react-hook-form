/** @format */

import FormGenerator from '@/components/useForm/FormGenerator';
import { useForm } from 'react-hook-form';
import formConfig from './formConfig';

const Email = () => {
  const methods = useForm();
  return (
    <div>
      <FormGenerator
        fields={formConfig(methods.control)}
        form={{ ...methods }}
      />
    </div>
  );
};
export default Email;
