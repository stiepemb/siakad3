<?php

namespace Tests\Feature\FrontEnd;

use App\Models\User;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class PermissionPageTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling();
        $this->withoutMiddleware(VerifyCsrfToken::class);

        // Buat permissions yang diperlukan
        Permission::create(['name' => 'SYSTEM-SETTING-PERMISSIONS_BROWSE']);
        Permission::create(['name' => 'SYSTEM-SETTING-PERMISSIONS_STORE']);
        Permission::create(['name' => 'SYSTEM-SETTING-PERMISSIONS_DESTROY']);

        // Buat user dan berikan permissions
        $this->user = User::factory()->create();
        $this->user->givePermissionTo([
            'SYSTEM-SETTING-PERMISSIONS_BROWSE',
            'SYSTEM-SETTING-PERMISSIONS_STORE',
            'SYSTEM-SETTING-PERMISSIONS_DESTROY'
        ]);
    }

    public function test_dapat_menampilkan_halaman_index_permissions()
    {
        $response = $this->actingAs($this->user)
            ->get(route('system.permissions'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('System/Users/Permissions/permission-index')
                ->has('dataPermissions')
                ->has('meta')
                ->has('search')
        );
    }

    public function test_dapat_menampilkan_halaman_create_permission()
    {
        $response = $this->actingAs($this->user)
            ->get(route('system.permissions.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('System/Users/Permissions/permission-create')
        );
    }

    public function test_dapat_membuat_permission_baru()
    {
        $permissionData = [
            'name' => 'TEST-PERMISSION',
            'group' => '0'
        ];

        $response = $this->actingAs($this->user)
            ->post(route('system.permissions.store'), $permissionData);

        $response->assertStatus(302);
        $response->assertRedirect(route('system.permissions'));

        // Cek apakah permission CRUD dibuat
        $this->assertDatabaseHas('permissions', ['name' => 'TEST-PERMISSION_BROWSE']);
        $this->assertDatabaseHas('permissions', ['name' => 'TEST-PERMISSION_SHOW']);
        $this->assertDatabaseHas('permissions', ['name' => 'TEST-PERMISSION_STORE']);
        $this->assertDatabaseHas('permissions', ['name' => 'TEST-PERMISSION_UPDATE']);
        $this->assertDatabaseHas('permissions', ['name' => 'TEST-PERMISSION_DESTROY']);
    }

    public function test_dapat_membuat_permission_group()
    {
        $permissionData = [
            'name' => 'TEST-PERMISSION',
            'group' => '1'
        ];

        $response = $this->actingAs($this->user)
            ->post(route('system.permissions.store'), $permissionData);

        $response->assertStatus(302);
        $response->assertRedirect(route('system.permissions'));

        $this->assertDatabaseHas('permissions', [
            'name' => 'TEST-PERMISSION-GROUP'
        ]);
    }

    public function test_dapat_menghapus_permission()
    {
        $permission = Permission::create([
            'name' => 'TEST-DELETE-PERMISSION_BROWSE',
            'guard_name' => 'web'
        ]);

        $response = $this->actingAs($this->user)
            ->delete(route('system.permissions.destroy', $permission->id));

        $response->assertStatus(302);
        $response->assertSessionHas('success', 'Permission berhasil dihapus');

        $this->assertDatabaseMissing('permissions', [
            'id' => $permission->id
        ]);
    }

    public function test_nama_permission_wajib_diisi()
    {
        $response = $this->actingAs($this->user)
            ->from(route('system.permissions.create'))
            ->post(route('system.permissions.store'), [
                'name' => '',
                'group' => '0'
            ]);

        $response->assertStatus(302);
        $response->assertSessionHasErrors('name');
    }
}
