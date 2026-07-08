import type { PaginatedData } from '@/types/report';

export default function Pagination({
    paginatedData,
    onPageChange,
}: {
    paginatedData: PaginatedData<any>;
    onPageChange: (url: string | null) => void;
}) {
    const { from, to, total, links, last_page } = paginatedData;

    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row">
            <p className="text-sm text-gray-500">
                แสดง {from ?? 0}-{to ?? 0} จาก {total} รายการ
            </p>

            {last_page > 1 && (
                <div className="flex flex-wrap items-center gap-1">
                    {links.map((link, idx) => (
                        <button
                            key={idx}
                            type="button"
                            disabled={!link.url}
                            onClick={() => onPageChange(link.url)}
                            dangerouslySetInnerHTML={{
                                __html: link.label
                                    .replace('&laquo; Previous', 'ก่อนหน้า')
                                    .replace('Next &raquo;', 'ถัดไป'),
                            }}
                            className={`min-w-[2.25rem] rounded-md px-3 py-1.5 text-sm font-medium transition ${
                                link.active
                                    ? 'bg-indigo-600 text-white'
                                    : link.url
                                      ? 'text-gray-600 hover:bg-gray-100'
                                      : 'cursor-not-allowed text-gray-300'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}