import { metaObject } from '@/config/site.config';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  ...metaObject('Posts'),
};

export default function ClientLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
