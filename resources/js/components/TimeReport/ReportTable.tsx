import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import ReportTableRow from './ReportTableRow';
import SearchInput from './SearchInput';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

const columns = [
    { key: 'emp_id', label: 'รหัสพนักงาน' },
    { key: 'first_name', label: 'ชื่อ-สกุล' },
    { key: 'inout', label: 'สถานะ' },
    { key: 'datetime', label: 'วันที่/เวลา' },
    { key: 'remark', label: 'หมายเหตุ' },
];

export default function ReportTable({ data }: { data: any}) {
    const rows = data.data; // array ของรายการในหน้านี้
    const [search, setSearch] = useState(filters?.search ?? '');

    // ค้นหาแบบ server-side: ยิง request ใหม่ทุกครั้งที่พิมพ์ (debounce)
    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('report'), // เปลี่ยนเป็นชื่อ route จริงของหน้านี้
            { search: value },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-4">
                <h2 className="text-base font-semibold text-gray-900">รายงานเวลาเข้า-ออกงาน</h2>
                <SearchInput value={search} onChange={handleSearch} />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.label}
                                        <ArrowsUpDownIcon className="h-3.5 w-3.5 text-gray-300" />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {rows.map((record: any, idx: number) => (
                            <ReportTableRow key={`${record.emp_id}-${idx}`} record={record} />
                        ))}
                    </tbody>
                </table>

                {rows.length === 0 && <EmptyState />}
            </div>

            <Pagination meta={data} />
        </div>
    );
}