import { useState, useMemo } from 'react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import ReportTableRow from './ReportTableRow';
import SearchInput from './SearchInput';
import EmptyState from './EmptyState';

const columns = [
    { key: 'emp_id', label: 'รหัสพนักงาน' },
    { key: 'first_name', label: 'ชื่อ-สกุล' },
    { key: 'inout', label: 'สถานะ' },
    { key: 'datetime', label: 'วันที่/เวลา' },
    { key: 'remark', label: 'หมายเหตุ' },
];

export default function ReportTable({ data }) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('datetime');
    const [sortDir, setSortDir] = useState('desc');

    const filtered = useMemo(() => {
        let rows = data;

        if (search.trim()) {
            const q = search.toLowerCase();
            rows = rows.filter((r) =>
                [r.emp_id, r.first_name, r.last_name, r.remark]
                    .filter(Boolean)
                    .some((field) => String(field).toLowerCase().includes(q))
            );
        }

        rows = [...rows].sort((a, b) => {
            const av = a[sortKey] ?? '';
            const bv = b[sortKey] ?? '';
            if (av < bv) return sortDir === 'asc' ? -1 : 1;
            if (av > bv) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });

        return rows;
    }, [data, search, sortKey, sortDir]);

    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-4">
                <h2 className="text-base font-semibold text-gray-900">รายงานเวลาเข้า-ออกงาน</h2>
                <SearchInput value={search} onChange={setSearch} />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                                                sortKey === col.key ? 'text-indigo-500' : 'text-gray-300'
                                            }`}
                                        />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((record, idx) => (
                            <ReportTableRow key={`${record.emp_id}-${idx}`} record={record} />
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && <EmptyState />}
            </div>

           
        </div>
    );
}