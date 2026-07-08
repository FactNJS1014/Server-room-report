const OPTIONS = [10, 25, 50, 100];

export default function PerPageSelect({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="per_page" className="whitespace-nowrap text-sm text-gray-500">
                แสดง
            </label>
            <select
                id="per_page"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="rounded-md border border-gray-300 py-1.5 pl-2 pr-7 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                {OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <span className="whitespace-nowrap text-sm text-gray-500">รายการ/หน้า</span>
        </div>
    );
}