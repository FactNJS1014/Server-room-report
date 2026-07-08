<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ServerRoomController extends Controller
{
    private const SESSION_EXPIRE_MINUTES = 60;
    // private const MAX_RECORDS = 100; // ← เปลี่ยนจาก 50 เป็น 100

    public function getReportData(Request $request)
    {
        if ($request->filled('username')) {
            $existing = $request->session()->get('user_session');

            $isSameUser = $existing
                && ($existing['empno'] ?? null) === $request->query('empno')
                && (now()->timestamp - $existing['created_at']) <= (self::SESSION_EXPIRE_MINUTES * 60);

            if (!$isSameUser) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                $request->session()->put('user_session', [
                    'username'       => $request->query('username'),
                    'empno'          => $request->query('empno'),
                    'department'     => $request->query('department'),
                    'use_permission' => $request->query('USE_PERMISSION'),
                    'sec'            => $request->query('sec'),
                    'msect_id'       => $request->query('MSECT_ID'),
                    'created_at'     => now()->timestamp,
                ]);

                $request->session()->flash('just_logged_in', true);
            }

            return redirect()->route('report');
        }

        $userSession = $request->session()->get('user_session');

        if (!$userSession) {
            abort(403, 'กรุณาเข้าผ่าน URL ที่กำหนดเท่านั้น');
        }

        if (now()->timestamp - $userSession['created_at'] > (self::SESSION_EXPIRE_MINUTES * 60)) {
            $request->session()->forget('user_session');
            abort(403, 'Session หมดอายุ กรุณาเข้าใหม่อีกครั้ง');
        }

        $allowedPerPage = [10, 25, 50, 100];
        $perPage = (int) $request->input('per_page', 10);
        if (!in_array($perPage, $allowedPerPage, true)) {
            $perPage = 10;
        }

        $page = max(1, (int) $request->input('page', 1));
        $offset = ($page - 1) * $perPage;

        $search = trim((string) $request->input('search', ''));

        $sortable = [
            'first_name' => 'e.FNameTh',
            'inout'      => 't.TTIME_INOUT',
            'datetime'   => 't.TTIME_ISUDT',
            'remark'     => 't.TTIME_REMK',
        ];
        $sortKey    = $request->input('sort', 'datetime');
        $sortColumn = $sortable[$sortKey] ?? 't.TTIME_ISUDT';
        $sortDir    = strtoupper($request->input('direction')) === 'ASC' ? 'ASC' : 'DESC';

        $baseQuery = DB::table('TTIME_TBL as t')
            ->leftJoin('VEmployee as e', 't.TTIME_EMPID', '=', 'e.EmpID');

        if ($search !== '') {
            $baseQuery->where(function ($q) use ($search) {
                $q->where('e.FNameTh', 'like', "%{$search}%")
                    ->orWhere('e.LNameTh', 'like', "%{$search}%")
                    ->orWhere('t.TTIME_REMK', 'like', "%{$search}%")
                    ->orWhere('t.TTIME_ID', 'like', "%{$search}%");
            });
        }

        // ── ดึงข้อมูลที่ผ่าน search filter มาแค่ MAX_RECORDS แถวล่าสุด (ตัดที่ database) ──
        $limitedQuery = (clone $baseQuery)
            ->select(
                't.TTIME_EMPID as emp_id',
                't.TTIME_INOUT as inout',
                't.TTIME_ISUDT as datetime',
                't.TTIME_REMK as remark',
                'e.FNameTh as first_name',
                'e.LNameTh as last_name',
                't.TTIME_ID as time_id'
            )
            ->orderByDesc('t.TTIME_ISUDT'); // เอาแถวล่าสุดก่อนเสมอ ไม่ว่าจะ sort คอลัมน์ไหนทีหลัง
            // ->limit(self::MAX_RECORDS);

        $records = collect(DB::select($limitedQuery->toSql(), $limitedQuery->getBindings()));

        // ── total ต้องนับจากจำนวนที่ได้มาจริง (≤ MAX_RECORDS) ไม่ใช่ทั้งตาราง ──
        $total = $records->count();

        // ── เรียงลำดับใหม่ตามที่ผู้ใช้เลือก (ทำบน collection ที่ได้มาแล้ว) ──
        $sortField = match ($sortKey) {
            'first_name' => 'first_name',
            'inout'      => 'inout',
            'remark'     => 'remark',
            default      => 'datetime',
        };

        $records = $sortDir === 'ASC'
            ? $records->sortBy($sortField)->values()
            : $records->sortByDesc($sortField)->values();

        // ── pagination ภายใน collection ที่มีอยู่ (≤ MAX_RECORDS) ──
        $pagedData = $records->slice($offset, $perPage)->values();

        $result = new \Illuminate\Pagination\LengthAwarePaginator(
            $pagedData,
            $total,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Dashboard/Report', [
            'data' => $result,
            'filters' => [
                'search'    => $search ?: null,
                'per_page'  => $perPage,
                'sort'      => $sortKey,
                'direction' => strtolower($sortDir),
            ],
        ]);
    }

    public function updateRemark(Request $request, $timeId)
    {
        $validated = $request->validate([
            'remark' => 'nullable|string|max:500',
        ]);

        DB::table('TTIME_TBL')
            ->where('TTIME_ID', $timeId) // ปรับชื่อ column ให้ตรงกับ primary key จริงของตาราง
            ->update(['TTIME_REMK' => $validated['remark']]);

        return back();
    }
}
