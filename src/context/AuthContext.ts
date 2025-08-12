import { createContext } from 'react';

import type { IAuthenticationContext } from '@/interfaces/auth/IAuthenticationContext';

export const AuthContext = createContext<IAuthenticationContext | null>(null);
