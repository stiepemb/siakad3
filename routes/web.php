<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\System\UserPermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'settings', 'middleware' => ['web', 'auth']], function () {
    Route::get('/system/users/permissions', [UserPermissionController::class, 'index'])->name('system.permissions');
    Route::post('/system/users/permissions', [UserPermissionController::class, 'store'])->name('system.permissions.store');
    Route::get('/system/users/permissions/create', [UserPermissionController::class, 'create'])->name('system.permissions.create');
});

require __DIR__ . '/auth.php';
