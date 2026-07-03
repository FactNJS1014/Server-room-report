<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class ServerRoomController extends Controller
{
    private const SESSION_EXPIRE_MINUTES = 60;
    public function getReportData(Request $request)
    {
        // ── มี params → บันทึก session แล้ว redirect ──
        if ($request->filled('username')) {
            $request->session()->put('user_info', [
                'username'       => $request->query('username'),
                'empno'          => $request->query('empno'),
                'department'     => $request->query('department'),
                'use_permission' => $request->query('USE_PERMISSION'),
                'sec'            => $request->query('sec'),
                'msect_id'       => $request->query('MSECT_ID'),
            ]);
            $request->session()->put('user_info_created_at', now()->timestamp);

            return redirect()->route('report');
        }

        // ── ตรวจสอบ session ──
        $userInfo  = $request->session()->get('user_info');
        $createdAt = $request->session()->get('user_info_created_at');

        if (!$userInfo || !$createdAt) {
            abort(403, 'กรุณาเข้าผ่าน URL ที่กำหนดเท่านั้น');
        }

        if (now()->timestamp - $createdAt > (self::SESSION_EXPIRE_MINUTES * 60)) {
            $request->session()->forget(['user_info', 'user_info_created_at']);
            abort(403, 'Session หมดอายุ กรุณาเข้าใหม่อีกครั้ง');
        }
        $query = DB::table('TTIME_TBL as t')
        ->leftJoin('VEmployee as e', 't.TTIME_EMPID', '=', 'e.EmpID')
        ->select(
            't.TTIME_EMPID as emp_id',
            't.TTIME_INOUT as inout',
            't.TTIME_ISUDT as datetime',
            't.TTIME_REMK as remark',
            'e.FNameTh as first_name',
            'e.LNameTh as last_name'
        )
        ->orderByDesc('t.TTIME_ISUDT')
        ->get();
        

       
   
      
        
        
        return Inertia::render('Dashboard/Report', [
            'data' => $query,
            
        ]);
    }

}
