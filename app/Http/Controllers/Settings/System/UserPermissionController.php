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
            'name' => [
                'required',
                'string',
                'max:255',
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
            ],
            'group' => 'required|in:0,1',
        ], [
            'name.required' => 'Nama permission mohon untuk di isi',
            'group.required' => 'Group permission mohon untuk di isi',
            'group.in' => 'Group permission hanya boleh diisi dengan 0 atau 1',
        ]);
        try {


            DB::beginTransaction();

            $permission = new Permission;
            $now = \Carbon\Carbon::now()->format('Y-m-d H:i:s');
            $nama = strtoupper($validated['name']);
            $group = strtoupper($validated['group']);

            if ($group == 1) {
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
            activity()
                ->event('store-permission')
                ->withProperties([
                    'ip' => $request->ip(),
                ])
                ->tap(function(Activity $activity) {
                    $activity->log_name = 'system-user';
                })
                ->log("Nama permission {$nama} berhasil disimpan");

            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
            DB::commit();
            return redirect()->route('system.permissions.index')->with('success', 'Permission berhasil dibuat');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Permission gagal dibuat');
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
                ->tap(function(Activity $activity) {
                    $activity->log_name = 'system-user';
                })
                ->log("Nama permission {$permission->name} berhasil dihapus");

            app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
            return redirect()->back()->with('success', 'Permission berhasil dihapus');
        }
    }
}
