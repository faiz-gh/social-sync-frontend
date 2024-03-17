import { metaObject } from '@/config/site.config';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  ...metaObject('Employees'),
};

export default function EmployeeLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
