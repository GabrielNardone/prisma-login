import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function AuthTitle({ children }: IReactChildrenProps) {
  return <h1 className="py-4 font-sans text-3xl font-bold">{children}</h1>;
}
