<?php

namespace App\Http\Controllers\Settings\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Activitylog\Models\Activity;

class UserPermissionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Permission::query();

        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_BROWSE');
        if ($this->hasRole('superadmin')) {
            $query->where('guard_name', 'web');
        }

        $perPage = $request->input('per_page', 5);
        $sortField = $request->input('sort_field', 'id');
        $sortDirection = $request->input('sort_direction', 'asc');

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        if (in_array($sortField, ['id', 'name', 'guard_name'])) {
            $query->orderBy($sortField, $sortDirection);
        }

        $permissionsData = $query->select('id', 'name', 'guard_name')
            ->paginate($perPage)
            ->appends([
                'search' => $search,
                'per_page' => $perPage,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ]);

        return Inertia::render('System/Users/Permissions/permission-index', [
            'dataPermissions' => $permissionsData->items(),
            'search' => $search,
            'meta' => [
                'total' => $permissionsData->total(),
                'current_page' => $permissionsData->currentPage(),
                'last_page' => $permissionsData->lastPage(),
                'per_page' => $permissionsData->perPage(),
                'from' => $permissionsData->firstItem(),
                'to' => $permissionsData->lastItem(),
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ]
        ]);
    }

    public function create()
    {
        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_STORE');
        return Inertia::render('System/Users/Permissions/permission-create');
    }

    public function store(Request $request)
    {
        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_STORE');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|in:0,1',
        ], [
            'name.required' => 'Nama permission mohon untuk diisi',
            'group.required' => 'Group permission mohon untuk diisi',
            'group.in' => 'Group permission hanya boleh diisi dengan 0 atau 1',
        ]);

        $nama = strtoupper($validated['name']);
        $group = $validated['group'];
        $permissionName = ($group == 1) ? "{$nama}-GROUP" : "{$nama}_BROWSE";

        // 🔍 Cek apakah permission sudah ada di database (web atau api)
        $exists = Permission::where('name', $permissionName)->exists();

        if ($exists) {
            return redirect()->back()->withErrors([
                'name' => 'Nama Permission sudah digunakan, mohon pilih nama lain.',
            ])->withInput();
        }

        try {
            DB::beginTransaction();
            $now = \Carbon\Carbon::now()->format('Y-m-d H:i:s');

            if ($group == 1) {
                Permission::insert([
                    ['name' => $permissionName, 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now],
                    ['name' => $permissionName, 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now],
                ]);
            } else {
                $permissions = ['BROWSE', 'SHOW', 'STORE', 'UPDATE', 'DESTROY'];
                $data = [];
                foreach ($permissions as $perm) {
                    $data[] = ['name' => "{$nama}_{$perm}", 'guard_name' => 'web', 'created_at' => $now, 'updated_at' => $now];
                    $data[] = ['name' => "{$nama}_{$perm}", 'guard_name' => 'api', 'created_at' => $now, 'updated_at' => $now];
                }
                Permission::insert($data);
            }

            activity()
                ->event('store-permission')
                ->withProperties(['ip' => $request->ip()])
                ->tap(function (Activity $activity) {
                    $activity->log_name = 'system-user';
                })
                ->log("Nama permission {$nama} berhasil disimpan");

            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
            DB::commit();
            return redirect()->route('system.permissions.index')->with('success', 'Permission berhasil dibuat');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withErrors(['general' => 'Terjadi kesalahan, silakan coba lagi.']);
        }
    }


    public function destroy(Request $request, $id)
    {
        $this->hasPermissionTo('SYSTEM-SETTING-PERMISSIONS_DESTROY');

        $permission = Permission::find($id);
        if (is_null($permission)) {
            return back();
        } else {
            DB::table('permissions')
                ->where('name', $permission->name)
                ->delete();

            activity()
                ->event('destroy-permission')
                ->withProperties([
                    'ip' => $request->ip(),
                ])
                ->tap(function (Activity $activity) {
                    $activity->log_name = 'system-user';
                })
                ->log("Nama permission {$permission->name} berhasil dihapus");

            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
            return redirect()->back()->with('success', 'Permission berhasil dihapus');
        }
    }
}
