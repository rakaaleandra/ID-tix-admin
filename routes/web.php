<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\MainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FilmController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

Route::middleware(['auth', IsAdmin::class,])->group(function () {
    Route::get('dashboard', [MainController::class, 'dashboard'])->name('dashboard');

    Route::get('orderlist', [MainController::class, 'Index'])->name('orderlist');
    Route::patch('/orderlist/update', [MainController::class, 'update'])->name('orderlistupdate');

    Route::get('qrscan', [MainController::class, 'qrscan'])->name('qrscan');
    Route::post('/qrscan/update-status', [MainController::class, 'updateStatus']);

    Route::resource('userlist', UserController::class);
    Route::resource('filmlist', FilmController::class);

    Route::get('/external-images/{path}', function ($path) {
        $path = str_replace('..', '', $path); // keamanan

        $file = Storage::disk('external_images')->path($path);

        if (!file_exists($file)) {
            abort(404);
        }

        return response()->file($file);
    })->where('path', '.*');
});

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
