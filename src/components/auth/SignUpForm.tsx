import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { getSignUpSchema } from './schemas/sign-up.schema';

import { useTranslation } from '@/hooks/translation/useTranslation';

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
  const { t } = useTranslation();
  const signUpSchema = getSignUpSchema();

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={({ username, password }) => handleSubmit(username, password)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{t('auth.signUp')}</AuthTitle>
            <AuthInput
              name="dniType"
              label={t('auth.forms.labels.dniType')}
              type="text"
              placeholder="DNI"
              error={!!errors.dniType}
              touched={touched.dniType}
              data-test="sign-up-dni-type"
            />
            <AuthInput
              name="dniNumber"
              label={t('auth.forms.labels.dniNumber')}
              type="text"
              placeholder="32567932"
              error={!!errors.dniNumber}
              touched={touched.dniNumber}
              data-test="sign-up-dni-number"
            />
            <AuthInput
              name="gender"
              label={t('auth.forms.labels.gender')}
              type="text"
              placeholder="M/F"
              error={!!errors.gender}
              touched={touched.gender}
              data-test="sign-up-gender"
            />
            <AuthInput
              name="username"
              label={t('auth.forms.labels.username')}
              type="email"
              placeholder={t('auth.forms.placeholders.username')}
              error={!!errors.username}
              touched={touched.username}
              data-test="sign-up-username"
            />
            <AuthInput
              name="password"
              label={t('auth.forms.labels.newPassword')}
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
          {t('auth.forms.links.alreadyHaveAccount')}{' '}
          <Link
            className="font-medium text-cyan-500"
            to="/auth/sign-in"
            data-test="link-sign-in"
          >
            {t('auth.signIn')}
          </Link>
        </p>
      </AuthSub>
    </AuthContainer>
  );
}
