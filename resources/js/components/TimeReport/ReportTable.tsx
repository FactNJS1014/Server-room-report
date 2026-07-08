import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import ReportTableRow from './ReportTableRow';
import SearchInput from './SearchInput';
import EmptyState from './EmptyState';
import RemarkModal from './RemarkModal';
import Pagination from './Pagination';
import PerPageSelect from './PerPageSelect';
import type { PaginatedData, Filters, TimeRecord} from '@/types/report';

const columns = [
    { key: 'first_name', label: 'ชื่อ-สกุล' },
    { key: 'inout', label: 'สถานะ' },
    { key: 'datetime', label: 'วันที่/เวลา' },
    { key: 'remark', label: 'หมายเหตุ' },
];

export default function ReportTable({
    paginatedData,
    filters,
}: {
    paginatedData: PaginatedData<TimeRecord>;
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [loading, setLoading] = useState(false);
    const isFirstRender = useRef(true);

    const [selectedRecord, setSelectedRecord] = useState<TimeRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemarkClick = (record: TimeRecord) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    const request = (params: Record<string, any>) => {
        setLoading(true);
        router.get(
            window.location.pathname,
            {
                search: search || undefined,
                per_page: filters.per_page,
                sort: filters.sort,
                direction: filters.direction,
                ...params,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onFinish: () => setLoading(false),
            }
        );
    };

    // debounce search -> ยิง request ใหม่ (reset ไปหน้า 1 เสมอ)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timeout = setTimeout(() => request({ page: 1 }), 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const toggleSort = (key: string) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        request({ sort: key, direction, page: 1 });
    };

    const handlePerPageChange = (perPage: number) => {
        request({ per_page: perPage, page: 1 });
    };

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        setLoading(true);
        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold text-gray-900">รายงานเวลาเข้า-ออกงาน</h2>
                <div className="flex items-center gap-3">
                    <PerPageSelect value={filters.per_page} onChange={handlePerPageChange} />
                    <SearchInput value={search} onChange={setSearch} />
                </div>
            </div>

            <div className="relative max-h-[70vh] overflow-auto">
                {loading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60">
                        <span className="text-sm text-gray-500">กำลังโหลด...</span>
                    </div>
                )}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => toggleSort(col.key)}
                                    className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-gray-700"
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.label}
                                        <ArrowsUpDownIcon
                                            className={`h-3.5 w-3.5 ${
                                                filters.sort === col.key ? 'text-indigo-500' : 'text-gray-300'
                                            }`}
                                        />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.data.map((record: TimeRecord, idx: number) => (
                            <ReportTableRow
                                key={`${record.emp_id}-${idx}`}
                                record={record}
                                onRemarkClick={handleRemarkClick}
                            />
                        ))}
                    </tbody>
                </table>

                {paginatedData.data.length === 0 && <EmptyState />}
            </div>

            <Pagination paginatedData={paginatedData} onPageChange={handlePageChange} />

            <RemarkModal record={selectedRecord} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}