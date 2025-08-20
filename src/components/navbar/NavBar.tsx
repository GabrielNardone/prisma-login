import { useCookies } from 'react-cookie';

import Action from './Action';

import { StoredCookies } from '@/interfaces/auth/cookies.enum';

export default function NavBar() {
  const [cookies] = useCookies([
    StoredCookies.USERNAME,
    StoredCookies.REFRESH_TOKEN,
  ]);
  const connected =
    !!cookies[StoredCookies.REFRESH_TOKEN] && !!cookies[StoredCookies.USERNAME];
  return (
    <div className="flex justify-end gap-4 p-2">
      {connected && (
        <a
          data-test="admin-panel"
          href={import.meta.env.VITE_ADMIN_URL}
          target="_blank"
          className={`m-2 flex h-8 w-fit items-center justify-center rounded-full bg-cyan-600 px-2 font-bold text-white shadow hover:bg-cyan-500`}
        >
          Admin Panel
        </a>
      )}
      <Action connected={connected} />
    </div>
  );
}
