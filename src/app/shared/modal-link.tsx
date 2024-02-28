'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';

interface ModalLinkProps {
    customSize?: string;
    view: React.ReactNode;
    children: React.ReactNode;
}

export default function ModalLink({
    customSize = '500px',
    view,
    children
}: ModalLinkProps) {
    const { openModal } = useModal();
    return (
        <div
            onClick={() =>
                openModal({
                    view,
                    customSize,
                })
            }
        >
            {children}
        </div>
    );
}
