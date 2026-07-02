import { InboxIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <InboxIcon className="h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-900">ไม่พบข้อมูล</p>
            <p className="text-sm text-gray-500">ลองเปลี่ยนคำค้นหา หรือช่วงเวลาที่เลือก</p>
        </div>
    );
}