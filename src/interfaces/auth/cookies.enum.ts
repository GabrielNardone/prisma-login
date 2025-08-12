export const StoredCookies = {
  ACCESS_TOKEN: 'accessToken',
  USERNAME: 'username',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export type StoredCookies = (typeof StoredCookies)[keyof typeof StoredCookies];
