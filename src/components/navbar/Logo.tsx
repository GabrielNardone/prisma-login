import { Link } from 'react-router-dom';

import prismaLogo from '@assets/prisma-logo-nav.png';

type PropTypes = {
  width: number;
  height: number;
};
export default function Logo({ width, height }: PropTypes) {
  return (
    <Link to="/">
      <img
        className="rounded-[4px] bg-stone-200 p-1"
        src={prismaLogo}
        width={width}
        height={height}
        alt="React Logo"
      />
    </Link>
  );
}
