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
    <div className="group my-4 flex min-h-14 w-full flex-col font-mono autofill:font-mono">
      <label
        className="mb-1 px-2 text-sm font-light text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-500 data-[error=true]:text-rose-400"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className="focus:shadow-outline w-full rounded-sm border-[1px] border-gray-400 px-5 py-2 text-sm outline-none focus:border-cyan-500 focus:shadow-cyan-500/30 data-[error=true]:border-rose-400"
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
          className="w-full text-xs text-rose-400"
          name={name}
          component="p"
        />
      </div>
    </div>
  );
}
