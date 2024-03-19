import HydrogenLayout from '@/layouts/hydrogen/layout';
import {metaObject} from "@/config/site.config";

type LayoutProps = {
    children: React.ReactNode;
};

export const metadata = {
    ...metaObject('Dashboard'),
};

export default function DefaultLayout({ children }: LayoutProps) {
    return <HydrogenLayout>{children}</HydrogenLayout>;
}
