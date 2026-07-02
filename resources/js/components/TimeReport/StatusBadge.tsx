import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

// TTIME_INOUT: 'I' = เข้างาน, 'O' = ออกงาน (ปรับ mapping ตามค่าจริงในระบบ)
export default function StatusBadge({ status }: { status: string }) {
    const isIn = status === 'I' || status === 'IN';

    const config = isIn
        ? {
              label: 'IN',
              icon: ArrowRightOnRectangleIcon,
              className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
          }
        : {
              label: 'OUT',
              icon: ArrowLeftOnRectangleIcon,
              className: 'bg-rose-50 text-rose-700 ring-rose-600/20',
          };

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {config.label}
        </span>
    );
}