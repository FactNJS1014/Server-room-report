import { UserIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import StatusBadge from './StatusBadge';
import { useForm } from '@inertiajs/react';


export default function ReportTableRow({ record, onRemarkClick }: { record: any, onRemarkClick: (record: any) => void }) {
    const fullName = `${record.first_name ?? ''} ${record.last_name ?? ''}`.trim() || '-';

    const { get } = useForm();

    const handleRemarkClick = (timeId: string) => {
        get(`/time-report/${timeId}`);
    };

    return (
        <tr className="hover:bg-gray-50">
           

            <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
                        <UserIcon className="h-4 w-4 text-indigo-500" />
                    </span>
                    <span className="text-sm font-medium text-gray-900">{fullName}</span>
                </div>
            </td>

            <td className="whitespace-nowrap px-4 py-4">
                <StatusBadge status={record.inout} />
            </td>

            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {record.datetime
                    ? new Date(record.datetime).toLocaleString('th-TH', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                      })
                    : '-'}
            </td>

            <td className="px-4 py-3 text-sm text-gray-500">
                {record.remark ? (
                    <button className="hover:text-indigo-600 cursor-pointer" onClick={() => onRemarkClick(record)}>
                        <span className="inline-flex items-center gap-1">
                            <ChatBubbleLeftEllipsisIcon className="h-4 w-4 shrink-0 text-gray-400" />
                            {record.remark}
                        </span>
                    </button>
                ) : (
                    <span className="text-gray-300">-</span>
                )}
            </td>
        </tr>
       
    );
}