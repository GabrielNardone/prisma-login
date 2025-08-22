import { useEffect } from 'react';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import type { IReactChildrenProps } from '@/interfaces/components/IReactChildren';

export default function RequireAuth({ children }: IReactChildrenProps) {
  const { handleRefreshSession, loadingState } = useAuthProvider();

  useEffect(() => {
    handleRefreshSession();
  }, [handleRefreshSession]);

  if (loadingState.refreshSession)
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-1 items-center justify-center">
          <span className="material-symbols-outlined pointer-events-none animate-spin">
            progress_activity
          </span>
        </div>
      </div>
    );
  else return <>{children}</>;
}
