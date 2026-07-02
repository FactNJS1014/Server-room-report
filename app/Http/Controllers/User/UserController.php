<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // If URL has query params, store them in session
        if ($request->hasAny(['username', 'empno', 'department', 'USE_PERMISSION', 'sec', 'MSECT_ID'])) {
            $request->session()->put('user_info', [
                'username'       => $request->query('username'),
                'empno'          => $request->query('empno'),
                'department'     => $request->query('department'),
                'use_permission' => $request->query('USE_PERMISSION'),
                'sec'            => $request->query('sec'),
                'msect_id'       => $request->query('MSECT_ID'),
            ]);
        }

        // Read from session (works even after redirect, no params in URL)
        $userInfo = $request->session()->get('user_info');

        // Guard: no session = unauthorized
        if (!$userInfo) {
            abort(403, 'Unauthorized – no session found.');
        }

        return Inertia::render('Home', [
            'userInfo' => $userInfo,
        ]);
    }
}
