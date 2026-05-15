import Link from '@/components/atoms/Link';
import BackIcon from '@/components/atoms/icons/BackIcon';

const BackNavigationButton = () => {
  return (
    <Link to="..">
      <span className="flex items-center gap-2">
        <BackIcon className="size-6!" />
        Go back to HOME PAGE
      </span>
    </Link>
  );
};

export default BackNavigationButton;
