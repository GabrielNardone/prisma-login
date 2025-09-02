import type { IReactChildrenProps } from '@/interfaces/components/IReactChildren';

export default function AuthContainer({ children }: IReactChildrenProps) {
  return (
    <div className="mx-auto my-8 w-full max-w-md bg-neutral-900 p-10 px-8 shadow-lg shadow-sky-500">
      {children}
    </div>
  );
}
