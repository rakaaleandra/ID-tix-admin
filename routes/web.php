<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FilmController;

Route::middleware(['auth', IsAdmin::class,])->group(function () {
    Route::get('dashboard', [MainController::class, 'dashboard'])->name('dashboard');

    Route::get('orderlist', [MainController::class, 'Index'])->name('orderlist');
    Route::patch('/orderlist/update', [MainController::class, 'update'])->name('orderlistupdate');

    Route::resource('userlist', UserController::class);
    Route::resource('filmlist', FilmController::class);
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
