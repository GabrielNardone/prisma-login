import { Form } from 'formik';

import type { IReactChildrenProps } from '@/interfaces/components/IReactChildren';

export default function AuthForm({ children }: IReactChildrenProps) {
  return <Form className="mx-auto w-full max-w-md">{children}</Form>;
}
