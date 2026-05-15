import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import CenterWrapper from '@/components/atoms/CenterWrapper';
import Link from '@/components/atoms/Link';
import Text from '@/components/atoms/Text';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

/* eslint-disable-next-line react-refresh/only-export-components */
const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
const NotFound = () => {
  return (
    <CenterWrapper className="flex-col gap-6">
      <Text as="h1" variant="heading">
        404 Page not found!
      </Text>
      <Link to="/">Take me to HOME PAGE</Link>
    </CenterWrapper>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
const ErrorOccured = () => {
  return (
    <CenterWrapper className="flex-col gap-6">
      <Text as="h1" variant="heading">
        Something went wrong!
      </Text>
      <Link to="/">Take me to HOME PAGE</Link>
    </CenterWrapper>
  );
};

export const Route = createRootRoute({
  component: () => <Root />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorOccured />,
});
