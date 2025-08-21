import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { getSignInSchema } from './schemas/sign-in.schema';

import { useTranslation } from '@/hooks/translation/useTranslation';

type PropTypes = {
  handleSubmit: (username: string, password: string) => Promise<void>;
  loading: boolean;
};
export default function SignInForm({ handleSubmit, loading }: PropTypes) {
  const initialValues = {
    username: '',
    password: '',
  };
  const { t } = useTranslation();
  const signInSchema = getSignInSchema();

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={({ username, password }) => handleSubmit(username, password)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{t('auth.signIn')}</AuthTitle>
            <AuthInput
              name="username"
              label={t('auth.forms.labels.username')}
              type="email"
              placeholder={t('auth.forms.placeholders.username')}
              error={!!errors.username}
              touched={touched.username}
              data-test="sign-in-username"
            />
            <AuthInput
              name="password"
              label={t('auth.forms.labels.newPassword')}
              type="password"
              placeholder="********"
              error={!!errors.password}
              touched={touched.password}
              data-test="sign-in-password"
            />
            <AuthSubmit loading={loading} data-test="sign-in-submit" />
            <AuthOr />
            <AuthSub>
              <p>
                {t('auth.forms.links.forgotPassword')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/forgot-password"
                  data-test="link-forgot-password"
                >
                  {t('auth.forms.links.clickHere')}
                </Link>
              </p>
              <p>
                {t('auth.forms.links.noAccount')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/sign-up"
                  data-test="link-sign-up"
                >
                  {t('auth.signUp')}
                </Link>
              </p>
              <p>
                {t('auth.forms.links.accountNotConfirmed')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/confirm-user"
                  data-test="link-confirm-user"
                >
                  {t('auth.forms.links.clickHere')}
                </Link>
              </p>
            </AuthSub>
          </AuthForm>
        )}
      </Formik>
    </AuthContainer>
  );
}
