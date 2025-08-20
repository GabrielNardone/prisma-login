import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { signUpSchema } from './schemas/sign-up.schema';

type PropTypes = {
  handleSubmit: (username: string, password: string) => Promise<void>;
  loading: boolean;
};
export default function SignUpForm({ handleSubmit, loading }: PropTypes) {
  const initialValues = {
    dniType: '',
    dniNumber: '',
    gender: '',
    username: '',
    password: '',
  };

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={({ username, password }) => handleSubmit(username, password)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>Sign up</AuthTitle>
            <AuthInput
              name="dniType"
              label="DNI Type"
              type="text"
              placeholder="DNI"
              error={!!errors.dniType}
              touched={touched.dniType}
              data-test="sign-up-dni-type"
            />
            <AuthInput
              name="dniNumber"
              label="DNI Number"
              type="text"
              placeholder="32567932"
              error={!!errors.dniNumber}
              touched={touched.dniNumber}
              data-test="sign-up-dni-number"
            />
            <AuthInput
              name="gender"
              label="Gender"
              type="text"
              placeholder="M/F"
              error={!!errors.gender}
              touched={touched.gender}
              data-test="sign-up-gender"
            />
            <AuthInput
              name="username"
              label="Username"
              type="email"
              placeholder="user@example.com"
              error={!!errors.username}
              touched={touched.username}
              data-test="sign-up-username"
            />
            <AuthInput
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              error={!!errors.password}
              touched={touched.password}
              data-test="sign-up-password"
            />
            <AuthSubmit loading={loading} data-test="sign-up-submit" />
          </AuthForm>
        )}
      </Formik>
      <AuthOr />
      <AuthSub>
        <p>
          Already have an account?{' '}
          <Link
            className="font-medium text-cyan-500"
            to="/auth/sign-in"
            data-test="link-sign-in"
          >
            Sign in
          </Link>
        </p>
      </AuthSub>
    </AuthContainer>
  );
}
