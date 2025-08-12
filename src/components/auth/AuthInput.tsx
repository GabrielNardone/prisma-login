import { ErrorMessage, Field } from 'formik';

type PropTypes = {
  name: string;
  label: string;
  type: 'email' | 'password' | 'text' | 'tel';
  placeholder?: string;
  error?: boolean;
  touched?: boolean;
};
export default function AuthInput({
  name,
  label,
  type,
  placeholder,
  error,
  touched,
  ...props
}: PropTypes) {
  return (
    <div className="relative my-4 flex min-h-14 w-full flex-col font-mono autofill:font-mono">
      <label
        className="absolute top-[-8px] left-[16px] rounded-full bg-white px-1 text-xs font-light text-gray-400"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className="focus:shadow-outline rounded-md border-[1px] border-gray-400 px-5 py-2 text-sm outline-none focus:border-blue-500 focus:shadow-blue-500/30 data-[error=true]:border-red-500"
        type={type}
        id={name}
        name={name}
        maxLength={(type === 'tel' && 6) || 'false'}
        placeholder={placeholder || ''}
        data-error={error && touched}
        {...props}
      />
      <div className="h-3 w-full" data-test={`form-input-error-${name}`}>
        <ErrorMessage
          className="w-full text-xs text-red-500"
          name={name}
          component="p"
        />
      </div>
    </div>
  );
}
