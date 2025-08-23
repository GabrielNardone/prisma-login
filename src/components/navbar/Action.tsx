import LinkButton from '../common/LinkButton';

type PropTypes = {
  connected: boolean;
};
export default function Action({ connected }: PropTypes) {
  if (connected) {
    return (
      <LinkButton data-test="sign-out" to="/auth/sign-out">
        Sign Out
      </LinkButton>
    );
  }
  return (
    <LinkButton data-test="sign-in" to="/auth/sign-in">
      Sign In
    </LinkButton>
  );
}
