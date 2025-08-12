import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function AuthContainer({ children }: IReactChildrenProps) {
  return (
    <div className="mx-auto my-8 w-full max-w-md p-10 px-8 shadow-none sm:shadow-md">
      {children}
    </div>
  );
}
