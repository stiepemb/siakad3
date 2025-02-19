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

    /**
     * Functional Requirement: FR-001
     * Document Name: srs_permission.docx    
    */
    public function test_user_superadmin_can_access_permission_page()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->get($this->pathUrl);
        $response->assertStatus(200);
    }

    /**
     * Functional Requirement: FR-001
     * Document Name: srs_permission.docx    
    */
    public function test_user_superadmin_can_access_create_permission_page()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->get($this->pathUrl . '/create');
        $response->assertStatus(200);
    }

    /**
     * Functional Requirement: FR-001
     * Document Name: srs_permission.docx    
    */
    public function test_user_superadmin_can_store_new_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->post($this->pathUrl, [
            'name' => 'TEST_PERMISSION',
            'group' => 0,
        ]);

        $response->assertRedirect(route('system.permissions', absolute: false));

        $permission = Permission::latest()->first();

        return $permission;
    }

    /**
     * Functional Requirement: FR-001
     * Document Name: srs_permission.docx    
    */
    public function test_user_superadmin_can_store_new_group_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->post($this->pathUrl, [
            'name' => 'TEST',
            'group' => 1,
        ]);

        $response->assertRedirect(route('system.permissions', absolute: false));

        $permission = Permission::latest()->first();

        return $user;
    }

    /**
     * Functional Requirement: FR-002
     * Document Name: srs_permission.docx    
    */
    public function test_user_superadmin_can_delete_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $permission = Permission::latest()->first();

        $response = $this->actingAs($user)->put($this->pathUrl . '/' . $permission->id, []);

        $response->assertRedirect(route('system.permissions', absolute: false));

        return $permission;
    }

    /**
     * Functional Requirement: FR-004
     * Document Name: srs_permission.docx    
     * 
     * @depends test_user_superadmin_can_store_new_permission
    */
    public function test_user_insert_new_permission_is_logged(User $user)
    {
        $user_login_latest = Activity::where('causer_type', 'App\Models\User')
        ->where('causer_id', $user->id)
        ->where('event', 'store-permission')
        ->latest('created_at')
        ->first();


        $this->assertNotNull($user_login_latest);
    }
    
    /**
     * Functional Requirement: FR-004
     * Document Name: srs_permission.docx    
     * 
     * @depends test_user_superadmin_can_store_new_permission
    */
    public function test_user_destroy_permission_is_logged(User $user)
    {
        $user_login_latest = Activity::where('causer_type', 'App\Models\User')
        ->where('causer_id', $user->id)
        ->where('event', 'destroy-permission')
        ->latest('created_at')
        ->first();


        $this->assertNotNull($user_login_latest);
    }
}
