import { Link } from 'react-router-dom';

type PropTypes = {
  to: string;
  innerText: string;
};
export default function Button({ to, innerText, ...props }: PropTypes) {
  return (
    <Link
      to={to}
      className="m-2 flex h-8 w-24 items-center justify-center rounded-md bg-cyan-800 px-2 font-bold text-white shadow hover:bg-cyan-500"
      {...props}
    >
      <p className="pointer-events-none">{innerText}</p>
    </Link>
  );
}
