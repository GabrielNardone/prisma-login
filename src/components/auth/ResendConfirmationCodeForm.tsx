import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { getUsernameOnlySchema } from './schemas/username-only.schema';

import { useTranslation } from '@/hooks/translation/useTranslation';

type PropTypes = {
  handleSubmit: (username: string) => Promise<void>;
  loading: boolean;
};
export default function ResendConfirmationCodeForm({
  handleSubmit,
  loading,
}: PropTypes) {
  const initialValues = {
    username: '',
  };
  const { t } = useTranslation();
  const usernameOnlySchema = getUsernameOnlySchema();

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={usernameOnlySchema}
        onSubmit={({ username }) => handleSubmit(username)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{t('auth.forms.titles.resendCode')}</AuthTitle>
            <AuthInput
              name="username"
              label={t('auth.forms.labels.username')}
              type="email"
              placeholder={t('auth.forms.placeholders.username')}
              error={!!errors.username}
              touched={touched.username}
              data-test="resend-confirmation-code-username"
            />
            <AuthSubmit
              loading={loading}
              data-test="resend-confirmation-code-submit"
            />
            <AuthOr />
            <AuthSub>
              <p>
                {t('auth.forms.links.alreadyHaveCode')}{' '}
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
