import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function AuthContainer({ children }: IReactChildrenProps) {
  return (
    <div className="mx-auto my-8 w-full max-w-md rounded-md bg-neutral-900 p-10 px-8 shadow-md shadow-neutral-700">
      {children}
    </div>
  );
}
