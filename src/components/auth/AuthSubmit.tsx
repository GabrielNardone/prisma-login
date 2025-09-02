import { Spinner } from '../common/Spinner';

import { useTranslation } from '@/hooks/translation/useTranslation';

type PropTypes = {
  loading?: boolean;
};
export default function AuthSubmit({ loading, ...props }: PropTypes) {
  const { t } = useTranslation();

  if (loading)
    return (
      <div className="flex h-10 flex-1 items-start justify-center">
        <div className="flex w-full justify-center rounded-sm bg-cyan-600 px-4 py-1 font-medium text-white">
          <Spinner size="sm" />
        </div>
      </div>
    );
  return (
    <div className="flex h-10 flex-1 items-start justify-center">
      <button
        type="submit"
        className="w-full cursor-pointer rounded-sm bg-cyan-600 px-4 py-1 font-medium text-white hover:bg-cyan-400"
        {...props}
      >
        {t('auth.submit')}
      </button>
    </div>
  );
}
