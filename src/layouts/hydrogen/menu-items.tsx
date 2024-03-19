import { routes } from '@/config/routes';
import {
  PiCalendarPlusDuotone,
  PiFolderNotchDuotone, PiNoteDuotone,
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
export const companyMenuItems: MenuItems[] = [
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
    name: 'Posts',
    href: routes.sidebar.posts,
    icon: <PiNoteDuotone />,
  },
  {
    name: 'Events',
    href: routes.sidebar.events,
    icon: <PiCalendarPlusDuotone />,
  },
];

export const employeeMenuItems: MenuItems[] = [
  {
    name: 'Dashboard',
    href: routes.sidebar.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Clients',
    href: routes.sidebar.clients,
    icon: <PiUsersDuotone />,
  },
  {
    name: 'Posts',
    href: routes.sidebar.posts,
    icon: <PiNoteDuotone />,
  },
  {
    name: 'Events',
    href: routes.sidebar.events,
    icon: <PiCalendarPlusDuotone />,
  },
];


