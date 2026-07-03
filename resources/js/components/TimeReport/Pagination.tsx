import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ meta }: { meta: any }) {
    const { current_page, last_page, links, from, to, total } = meta;

    if (last_page <= 1) return null;

    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row">
            <p className="text-sm text-gray-500">
                แสดง <span className="font-medium text-gray-900">{from}</span>–
                <span className="font-medium text-gray-900">{to}</span> จาก{' '}
                <span className="font-medium text-gray-900">{total}</span> รายการ
            </p>

            <nav className="flex items-center gap-1">
                {links.map((link: any, idx: number) => {
                    // ปุ่ม "Previous"
                    if (idx === 0) {
                        return (
                            <PageButton key={idx} link={link} disabled={!link.url}>
                                <ChevronLeftIcon className="h-4 w-4" />
                            </PageButton>
                        );
                    }
                    // ปุ่ม "Next"
                    if (idx === links.length - 1) {
                        return (
                            <PageButton key={idx} link={link} disabled={!link.url}>
                                <ChevronRightIcon className="h-4 w-4" />
                            </PageButton>
                        );
                    }
                    // เลขหน้า / "..."
                    return (
                        <PageButton key={idx} link={link} disabled={false}>
                            {link.label}
                        </PageButton>
                    );
                })}
            </nav>
        </div>
    );
}

function PageButton({ link, children, disabled }: { link: any; children: any; disabled: any }) {
    const base =
        'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors';

    if (disabled) {
        return <span className={`${base} cursor-not-allowed text-gray-300`}>{children}</span>;
    }

    if (!link.url) {
        // "..." ที่ไม่มี url ให้กด
        return <span className={`${base} text-gray-400`}>{children}</span>;
    }

    return (
        <Link
            href={link.url}
            preserveScroll
            className={`${base} ${
                link.active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {children}
        </Link>
    );
}