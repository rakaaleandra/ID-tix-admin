<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\MainController;

Route::middleware(['auth', IsAdmin::class,])->group(function () {
    Route::get('dashboard', [MainController::class, 'Index'])->name('dashboard');
    Route::patch('/dashboard/update', [MainController::class, 'update'])->name('update');
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
