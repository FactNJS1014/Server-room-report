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
    
        // มี params → ให้ผ่าน
    if ($request->hasAny(['username', 'empno'])) {
        return $next($request);
    }

    // ไม่มี params → ต้องมี flag ว่าเคยเข้าผ่าน params มาก่อน
    if (!$request->session()->get('entered_via_params')) {
        // ล้าง session แล้ว 403
        $request->session()->invalidate();
        abort(403, 'กรุณาเข้าผ่าน URL ที่กำหนดเท่านั้น');
    }

    return $next($request);
    }
}
