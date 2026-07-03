// resources/js/Pages/Home.tsx

import MainLayout from '@/layouts/MainLayout';
import ReportTable from '@/components/TimeReport/ReportTable';


export default function Home({ data }: { data: any[] }) {
    

    return (
        <MainLayout title="Report">
            <div className="mx-auto max-w-full space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">รายงานเวลาเข้า-ออกงาน</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-100">แสดงรายการบันทึกเวลาเข้า-ออกงานของพนักงาน</p>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">ทั้งหมด {data.length} รายการ</p>
                </div>

                <ReportTable data={data}  />
            </div>
        </MainLayout>
    );
}