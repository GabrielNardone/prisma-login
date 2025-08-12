import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function AuthSub({ children }: IReactChildrenProps) {
  return (
    <div className="py-1 text-center text-xs text-gray-500">{children}</div>
  );
}
