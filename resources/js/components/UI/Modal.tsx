import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // ปิด modal ด้วยปุ่ม ESC
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // กัน scroll พื้นหลังตอนเปิด modal

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-xl transition-all">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-5 py-4">{children}</div>
            </div>
        </div>,
        document.body
    );
}