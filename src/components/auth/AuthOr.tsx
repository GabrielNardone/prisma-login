import { useTranslation } from '@/hooks/translation/useTranslation';

export default function AuthOr() {
  const { t } = useTranslation();
  return (
    <div className="relative flex w-full items-center py-5">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="mx-4 flex-shrink text-xs text-gray-400">
        {t('auth.or')}
      </span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}
