<?php

namespace Tests\Feature\System\Users;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Activitylog\Models\Activity;
class PermissionTest extends TestCase
{
    use RefreshDatabase;

    private $pathUrl = '/settings/system/users/permissions';
    /**
     * Indicates whether the default seeder should run before each test.
     *
     * @var bool
     */
    protected $seed = true;

    public function test_user_superadmin_can_access_permission_page()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->get($this->pathUrl);
        $response->assertStatus(200);
    }

    public function test_user_superadmin_can_create_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->post($this->pathUrl, [
            'name' => 'URTES',
            'group' => 0,
        ]);

        $response->assertRedirect(route('system.permissions', absolute: false));
    }

    public function test_user_superadmin_can_delete_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $permission = Permission::latest()->first();

        $response = $this->actingAs($user)->put($this->pathUrl . '/' . $permission->id, []);

        $response->assertRedirect(route('system.permissions', absolute: false));
    }

    public function test_user_insert_new_permission_is_logged()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->post($this->pathUrl, [
            'name' => 'URTES',
            'group' => 0,
        ]);
        
        $user_login_latest = Activity::where('causer_type', 'App\Models\User')
        ->where('causer_id', $user->id)
        ->where('event', 'delete-permission')
        ->latest('created_at')
        ->first();

        $this->assertNotNull($user_login_latest);
    }
}
