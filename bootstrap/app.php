<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            //routing data master
			Route::middleware(['web', 'auth'])			    
            ->prefix('dmaster')
            ->group(base_path('routes/r_dmaster.php'));

            //routing penerimaan mahasiswa baru
			Route::middleware(['web', 'auth'])			    
			    ->prefix('spmb')
			    ->group(base_path('routes/r_spmb.php'));

            //routing perkuliahan
            Route::middleware(['web', 'auth'])
                ->prefix('perkuliahan')
                ->group(base_path('routes/r_perkuliahan.php'));

            //routing keuangan
            Route::middleware(['web', 'auth'])
                ->prefix('keuangan')
                ->group(base_path('routes/r_keuangan.php'));

            //routing kemahasiswaan
            Route::middleware(['web', 'auth'])
                ->prefix('kemahasiswaan')
                ->group(base_path('routes/r_kemahasiswaan.php'));   

            //routing feeder
            Route::middleware(['web', 'auth'])
                ->prefix('feeder')
                ->group(base_path('routes/r_feeder.php'));

        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
