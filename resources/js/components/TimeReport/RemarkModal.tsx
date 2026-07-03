import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Modal from '@/components/UI/Modal';
import { UserIcon, CalendarIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import StatusBadge from './StatusBadge';

interface RemarkModalProps {
    record: {
        time_id: string | number;
        emp_id: string;
        first_name?: string;
        last_name?: string;
        inout: string;
        datetime: string;
        remark: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function RemarkModal({ record, isOpen, onClose }: RemarkModalProps) {
    const [remarkText, setRemarkText] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // sync ค่าใน textarea ทุกครั้งที่เปิด record ใหม่
    useEffect(() => {
        if (record) {
            setRemarkText(record.remark ?? '');
        }
    }, [record]);

    if (!record) return null;

    const fullName = `${record.first_name ?? ''} ${record.last_name ?? ''}`.trim() || '-';
    const isDirty = remarkText !== (record.remark ?? '');

    const handleSave = () => {
        setIsSaving(true);

        router.patch(
            route('time-records.update-remark', record.time_id),
            { remark: remarkText },
            {
                preserveScroll: true,
                onSuccess: () => onClose(),
                onFinish: () => setIsSaving(false),
            }
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="รายละเอียดหมายเหตุ">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                        <UserIcon className="h-5 w-5 text-indigo-500" />
                    </span>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{fullName}</p>
                        <p className="text-xs text-gray-500">รหัส {record.emp_id}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <StatusBadge status={record.inout} />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 shrink-0 text-gray-400" />
                    {record.datetime
                        ? new Date(record.datetime).toLocaleString('th-TH', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                          })
                        : '-'}
                </div>

                <div>
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                        หมายเหตุ
                    </label>
                    <textarea
                        value={remarkText}
                        onChange={(e) => setRemarkText(e.target.value)}
                        rows={4}
                        maxLength={500}
                        placeholder="เพิ่มหมายเหตุ..."
                        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <p className="mt-1 text-right text-xs text-gray-400">{remarkText.length}/500</p>
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                        {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}