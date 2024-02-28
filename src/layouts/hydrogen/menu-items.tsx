import { routes } from '@/config/routes';
import {
  PiCalendarPlusDuotone,
  PiFolderNotchDuotone,
  PiUserListDuotone,
  PiUsersDuotone,
} from 'react-icons/pi';

type MenuItems = {
  name: string;
  href: string;
  icon: JSX.Element;
  badge?: string;
  shortcut?: {
    modifiers: string;
    key: string;
  };
  dropdownItems?: {
    name: string;
    href: string;
    badge?: string;
  }[];
};

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItems[] = [
  {
    name: 'Dashboard',
    href: routes.sidebar.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Employees',
    href: routes.sidebar.employees,
    icon: <PiUserListDuotone />,
  },
  {
    name: 'Clients',
    href: routes.sidebar.clients,
    icon: <PiUsersDuotone />,
  },
  {
    name: 'Events',
    href: routes.sidebar.events,
    icon: <PiCalendarPlusDuotone />,
  },
];
