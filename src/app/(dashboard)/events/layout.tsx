import { metaObject } from '@/config/site.config';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  ...metaObject('Events'),
};

export default function EventLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
