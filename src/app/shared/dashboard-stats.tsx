'use client';

import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import {
  PiNotePencilBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiUserListBold,
  PiUsersBold,
} from 'react-icons/pi';
import { SiQuantconnect } from 'react-icons/si'
import TransactionCard, {
  TransactionType,
} from '@/components/cards/transaction-card';

type FileStatsType = {
  className?: string;
};

const statData: TransactionType[] = [
  {
    title: 'Total Posts',
    amount: '100',
    increased: true,
    percentage: '32.45',
    icon: PiNotePencilBold,
    iconWrapperFill: '#8A63D2',
  },
  {
    title: 'Total Employees',
    amount: '5',
    increased: false,
    percentage: '32.45',
    icon: PiUserListBold,
    iconWrapperFill: '#00CEC9',
  },
  {
    title: 'Total Clients',
    amount: '10',
    increased: true,
    percentage: '32.45',
    icon: PiUsersBold,
    iconWrapperFill: '#0070F3',
  },
  {
    title: 'Total Connections',
    amount: '50',
    increased: false,
    percentage: '32.45',
    icon: SiQuantconnect,
    iconWrapperFill: '#F5A623',
  },
];

export function StatGrid() {
  return (
    <>
      {statData.map((stat: any, index: number) => {
        return (
          <TransactionCard
            key={'transaction-card-' + index}
            transaction={stat}
            className="min-w-[300px]"
          />
        );
      })}
    </>
  );
}

export default function DashboardStats({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 3xl:hidden dark:from-gray-50 dark:via-gray-50/70"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
        >
          <StatGrid />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 3xl:hidden dark:from-gray-50 dark:via-gray-50/70 "
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
