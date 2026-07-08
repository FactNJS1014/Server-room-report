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

        // มี params → เข้ามาใหม่จาก URL ที่กำหนด ให้ผ่านไป controller เพื่อสร้าง/ต่ออายุ session
        if ($request->hasAny(['username', 'empno'])) {
            return $next($request);
        }

        // มี session ที่ login ไว้แล้ว (ไม่ว่าจะ navigate/paginate/sort กี่ครั้งก็ตาม) → ให้ผ่าน
        if ($request->session()->has('user_session')) {
            return $next($request);
        }

        // ไม่มีทั้ง params และ session → 403
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        abort(403, 'กรุณาเข้าผ่าน URL ที่กำหนดเท่านั้น');
    }
}
