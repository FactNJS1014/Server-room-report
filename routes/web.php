<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\ServerRoomController;

// Route::get('/', function () {
//     return Inertia::render('Dashboard/Report');
// })->name('home');

Route::get('/', [ServerRoomController::class, 'getReportData'])->name('report');
Route::get('/back-menu', [ServerRoomController::class, 'backMenu'])->name('back-menu');
