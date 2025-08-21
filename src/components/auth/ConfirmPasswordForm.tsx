import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { getConfirmPasswordSchema } from './schemas/confirm-password.schema';

import { useTranslation } from '@/hooks/translation/useTranslation';

type PropTypes = {
  handleSubmit: (
    username: string,
    newPassword: string,
    code: string
  ) => Promise<void>;
  loading: boolean;
};
export default function ConfirmPasswordForm({
  handleSubmit,
  loading,
}: PropTypes) {
  const initialValues = {
    username: '',
    code: '',
    password: '',
  };
  const { t } = useTranslation();
  const passwordSchema = getConfirmPasswordSchema();

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordSchema}
        onSubmit={({ username, password, code }) =>
          handleSubmit(username, password, code.toString())
        }
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{t('auth.forms.titles.confirmPassword')}</AuthTitle>
            <AuthInput
              name="username"
              label={t('auth.forms.labels.username')}
              type="email"
              placeholder={t('auth.forms.placeholders.username')}
              error={!!errors.username}
              touched={touched.username}
              data-test="confirm-password-username"
            />
            <AuthInput
              name="password"
              label={t('auth.forms.labels.newPassword')}
              type="password"
              placeholder="********"
              error={!!errors.password}
              touched={touched.password}
              data-test="confirm-password-password"
            />
            <AuthInput
              name="code"
              label={t('auth.forms.labels.code')}
              type="tel"
              placeholder="hD123#4L56*c"
              error={!!errors.code}
              touched={touched.code}
              data-test="confirm-password-code"
            />
            <AuthSubmit loading={loading} data-test="confirm-password-submit" />
            <AuthOr />
            <AuthSub>
              <p>
                {t('auth.forms.links.dontHaveCode')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/forgot-password"
                  data-test="link-forgot-password"
                >
                  {t('auth.forms.links.clickHere')}
                </Link>
              </p>
              <p>
                {t('auth.forms.links.alreadyConfirmed')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/sign-in"
                  data-test="link-sign-in"
                >
                  {t('auth.signIn')}
                </Link>
              </p>
            </AuthSub>
          </AuthForm>
        )}
      </Formik>
    </AuthContainer>
  );
}
