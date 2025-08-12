import { Link } from 'react-router-dom';

import reactSvg from '../../assets/react.svg';

type PropTypes = {
  width: number;
  height: number;
};
export default function Logo({ width, height }: PropTypes) {
  return (
    <Link to="/">
      <img
        className={`bg-black p-2`}
        src={reactSvg}
        width={width}
        height={height}
        alt="React Logo"
      />
    </Link>
  );
}
