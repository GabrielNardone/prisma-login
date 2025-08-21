import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthContainer from './AuthContainer';
import AuthForm from './AuthForm';
import AuthInput from './AuthInput';
import AuthOr from './AuthOr';
import AuthSub from './AuthSub';
import AuthSubmit from './AuthSubmit';
import AuthTitle from './AuthTitle';
import { getConfirmUserSchema } from './schemas/confirm-user.schema';

import { useConfirmationLink } from '@/hooks/auth/useConfirmationLink';
import { useTranslation } from '@/hooks/translation/useTranslation';

type PropTypes = {
  handleSubmit: (username: string, code: string) => Promise<void>;
  loading: boolean;
};
export default function ConfirmUserForm({ handleSubmit, loading }: PropTypes) {
  useConfirmationLink();
  const initialValues = {
    username: '',
    code: '',
  };
  const { t } = useTranslation();
  const confirmUserSchema = getConfirmUserSchema();

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={confirmUserSchema}
        onSubmit={({ username, code }) =>
          handleSubmit(username, code.toString())
        }
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{t('auth.forms.titles.confirmUser')}</AuthTitle>
            <AuthInput
              name="username"
              label={t('auth.forms.labels.username')}
              type="email"
              placeholder={t('auth.forms.placeholders.username')}
              error={!!errors.username}
              touched={touched.username}
              data-test="confirm-user-username"
            />
            <AuthInput
              name="code"
              label={t('auth.forms.labels.code')}
              type="tel"
              placeholder="hD123#4L56*c"
              error={!!errors.code}
              touched={touched.code}
              data-test="confirm-user-code"
            />
            <AuthSubmit loading={loading} data-test="confirm-user-submit" />
            <AuthOr />
            <AuthSub>
              <p>
                {t('auth.forms.links.didntReceive')}{' '}
                <Link
                  className="font-medium text-cyan-500"
                  to="/auth/resend-confirmation-code"
                  data-test="link-resend-confirmation-code"
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
