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
        // Allow the first hit (URL has params) to pass through
        if ($request->hasAny(['username', 'empno'])) {
            return $next($request);
        }

        if (!$request->session()->has('user_info')) {
            abort(403, 'Session expired or invalid.');
        }

        return $next($request);
    }
}
