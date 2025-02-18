<?php

namespace App\Http\Controllers\Settings\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class UserPermissionController extends Controller

{

    public function index()
    {
        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_BROWSE');
        return Inertia::render('System/Users/Permissions/permission-index');
    }

    public function store(Request $request)
    {
        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_STORE');
        $validated = $request->validate([
            'name' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->has('group')) {
                        $value = $value . '-GROUP';
                    }
                    $exist = Permission::where('name', 'like', "%$value%")
                        ->where('guard_name', 'web')
                        ->exists();

                    if ($exist) {
                        $fail('Nama Permission telah tersedia, mohon ganti dengan yang lain');
                    }
                }
            ]
        ], [
            'name.required' => 'Nama permission mohon untuk di isi',
        ]);

        $permission = new Permission;
        $now = \Carbon\Carbon::now()->format('Y-m-d H:i:s');
        $nama = strtoupper($request->input('name'));

        if ($request->has('group')) {
            $permission->insert([
                ['name' => "{$nama}-GROUP", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
            ]);

            $exist = Permission::where('name', 'like', "%$nama%")
                ->where('guard_name', 'api')
                ->exists();

            if (!$exist) {
                $permission->insert([
                    ['name' => "{$nama}-GROUP", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                ]);
            }
        } else {
            $permission->insert([
                ['name' => "{$nama}_BROWSE", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
                ['name' => "{$nama}_SHOW", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
                ['name' => "{$nama}_STORE", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
                ['name' => "{$nama}_UPDATE", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
                ['name' => "{$nama}_DESTROY", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
            ]);
            $exist = Permission::where('name', 'like', "%$nama%")
                ->where('guard_name', 'api')
                ->exists();

            if (!$exist) {
                $permission->insert([
                    ['name' => "{$nama}_BROWSE", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                    ['name' => "{$nama}_SHOW", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                    ['name' => "{$nama}_STORE", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                    ['name' => "{$nama}_UPDATE", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                    ['name' => "{$nama}_DESTROY", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                ]);
            }
        }

        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
