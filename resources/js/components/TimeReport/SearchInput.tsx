import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchInput({ value, onChange, placeholder = 'ค้นหาชื่อพนักงาน หรือรหัส...' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    return (
        <div className="relative w-full sm:max-w-xs">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    );
}