<?php

namespace App\Http\Middleware\UserRequire;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserRequire
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
   public function handle(Request $request, Closure $next)
    {
    
     // มี params → ให้ผ่านไป controller
    if ($request->hasAny(['username', 'empno'])) {
        return $next($request);
    }

    // redirect หลังจาก controller บันทึก session (flash จาก controller)
    if ($request->session()->pull('just_logged_in', false)) {
        return $next($request);
    }

    // ไม่มีทั้ง params และ flash → 403
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    abort(403, 'กรุณาเข้าผ่าน URL ที่กำหนดเท่านั้น');
    }
}
