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


Route::group(['prefix' => 'settings', 'middleware' => ['web', 'auth']], function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //pengguna - role
    Route::middleware(['role:superadmin'])->get('/system/users/role', [UsersRoleController::class, 'index'])->name('system.roles.index');
    Route::middleware(['role:superadmin'])->get('/system/users/role/create', [UsersRoleController::class, 'create'])->name('system.roles.create');
    Route::middleware(['role:superadmin'])->get('/system/users/role/{id}', [UsersRoleController::class, 'show'])->name('system.roles.show');
    Route::middleware(['role:superadmin'])->post('/system/users/role', [UsersRoleController::class, 'store'])->name('system.roles.store');
    Route::middleware(['role:superadmin'])->get('/system/users/role/{id}/edit', [UsersRoleController::class, 'edit'])->name('system.roles.edit');
    Route::middleware(['role:superadmin'])->put('/system/users/role/{id}', [UsersRoleController::class, 'update'])->name('system.roles.update');
    Route::middleware(['role:superadmin'])->delete('/system/users/role/{id}', [UsersRoleController::class, 'destroy'])->name('system.roles.destroy');
    Route::middleware(['role:superadmin'])->post('/system/users/role/storerolepermissions', [UsersRoleController::class, 'storerolepermissions'])->name('system.roles.storerolepermissions');
    Route::middleware(['role:superadmin'])->post('/system/users/role/revokerolepermission', [UsersRoleController::class, 'revokerolepermission'])->name('system.roles.revokerolepermission');
    // pengguna - sync role secara keseluruhan berdasarkan role id
    Route::middleware(['role:superadmin'])->get('/system/users/role/{id}/syncallrolepermissions', [UsersRoleController::class, 'syncallrolepermissions'])->name('system.roles.syncallrolepermissions');
    Route::middleware(['role:superadmin'])->get('/system/users/role/{id}/syncrevokeuserroledefault', [UsersRoleController::class, 'syncrevokeuserroledefault'])->name('system.roles.syncrevokeuserroledefault');

    //pengguna - permission
    Route::middleware(['role:superadmin'])->get('/system/users/permissions', [UserPermissionController::class, 'index'])->name('system.permissions.index');
    Route::middleware(['role:superadmin'])->post('/system/users/permissions', [UserPermissionController::class, 'store'])->name('system.permissions.store');
    Route::middleware(['role:superadmin'])->get('/system/users/permissions/create', [UserPermissionController::class, 'create'])->name('system.permissions.create');
    Route::middleware(['role:superadmin'])->delete('/system/users/permissions/{id}', [UserPermissionController::class, 'destroy'])->name('system.permissions.destroy');
});

require __DIR__ . '/auth.php';
