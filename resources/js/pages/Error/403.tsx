import { Link } from "@inertiajs/react";

interface Props {
    status?: number;
    message?: string;
}

export default function Error403({ message = "ไม่พบ session หรือ session หมดอายุแล้ว" }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-10 text-center">

                {/* Icon */}
                <div className="w-18 h-18 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6"
                     style={{ width: 72, height: 72 }}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A32D2D"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8"
                        aria-hidden
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Badge */}
                <span className="inline-block text-xs font-medium tracking-widest text-red-800 bg-red-50 rounded-full px-3 py-1 mb-4">
                    403 Forbidden
                </span>

                {/* Heading */}
                <h1 className="text-xl font-semibold text-slate-800 mb-3 leading-snug">
                    ไม่มีสิทธิ์เข้าถึงหน้านี้
                </h1>
               

                {/* Buttons */}
                <div className="space-y-2.5">
                    <button
                        onClick={() => window.location.href = "http://172.22.64.11/menu.php"}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        Go Back to Menu
                    </button>

                   
                </div>

                {/* Footer meta */}
                <p className="text-xs text-slate-400 mt-6">
                    รหัสข้อผิดพลาด{" "}
                    <code className="font-mono bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
                        HTTP 403
                    </code>{" "}
                    · กรุณาติดต่อผู้ดูแลระบบหากปัญหายังคงอยู่
                </p>
            </div>
        </div>
    );
}