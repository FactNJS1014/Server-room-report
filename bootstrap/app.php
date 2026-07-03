<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\UserRequire\UserRequire;
use Inertia\Inertia;  // ← ขาดตัวนี้
use Symfony\Component\HttpKernel\Exception\HttpException;  // ← ขาดตัวนี้
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            UserRequire::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->respond(function (Response $response, \Throwable $e, Request $request) {
        
        // ถ้าเป็น redirect → ให้ผ่านเลย ห้าม intercept
        if ($response instanceof RedirectResponse) {
            return $response;
        }

        $status = $response->getStatusCode();
        $pages  = [403, 404, 500, 503];

        if (in_array($status, $pages)) {
            return \Inertia\Inertia::render("Error/{$status}", [
                'status'  => $status,
                'message' => $e->getMessage() ?: null,
            ])
            ->toResponse($request)
            ->setStatusCode($status);
        }

        return $response;
    });
})->create();
