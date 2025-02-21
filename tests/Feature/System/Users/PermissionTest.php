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

    private $routeName = 'system.permissions';
    /**
     * Indicates whether the default seeder should run before each test.
     *
     * @var bool
     */
    protected $seed = true;

    /**
     * [Functional Requirement: FR-001]
     * [Document Name: srs_permission.docx]    
    */
    public function test_user_superadmin_can_access_permission_page()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->get(route("{$this->routeName}.index"));
        $response->assertStatus(200);
    }

    /**
     * [Functional Requirement: FR-001]
     * [Document Name: srs_permission.docx]    
    */
    public function test_user_superadmin_can_access_create_permission_page()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)->get(route("{$this->routeName}.create"));
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

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->post(route("{$this->routeName}.store"), [
            'name' => 'TEST_PERMISSION',
            'group' => 0,
        ]);

        $response->assertRedirect(route('system.permissions.index', absolute: false));
    }

    /**
     * [Functional Requirement: FR-001]
     * [Document Name: srs_permission.docx]    
    */
    public function test_user_superadmin_can_store_new_group_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->post(route("{$this->routeName}.store"), [
            'name' => 'TEST',
            'group' => 1,
        ]);

        $response->assertRedirect(route("{$this->routeName}.index", absolute: false));
    }

    /**
     * [Functional Requirement: FR-002]
     * [Document Name: srs_permission.docx]    
    */
    public function test_user_superadmin_can_delete_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $permission = Permission::latest()->first();

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->delete(route("{$this->routeName}.destroy", ['id' => $permission->id]), []);

        $response->assertRedirect(route("{$this->routeName}.index", absolute: false));

    }

    /**
     * [Functional Requirement: FR-003]
     * [Document Name: srs_permission.docx]    
    */
    public function test_user_non_superadmin_can_access()
    {
        $user = User::factory()->create();
        $user->assignRole('baak');
        
        $response = $this->actingAs($user)->get(route("{$this->routeName}.create"));
        $response->assertStatus(403);

        $response = $this->actingAs($user)->post(route("{$this->routeName}.store"), [
            'name' => 'TEST_PERMISSION',
            'group' => 0,
        ]);
        
        $response->assertStatus(403);

        $permission = Permission::latest()->first();

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->delete(route("{$this->routeName}.destroy", ['id' => $permission->id]), []);

        $response->assertStatus(403);
    }

    /**
     * [Functional Requirement: FR-004]
     * [Document Name: srs_permission.docx] 
     *
    */
    public function test_user_insert_new_permission_is_logged()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->post(route("{$this->routeName}.store"), [
            'name' => 'TEST_PERMISSION',
            'group' => 0,
        ]);

        $user_login_latest = Activity::where('causer_type', 'App\Models\User')
        ->where('causer_id', $user->id)
        ->where('event', 'store-permission')
        ->latest('created_at')
        ->first();

        $this->assertNotNull($user_login_latest);
    }
    
    /**
     * [Functional Requirement: FR-004]
     * [Document Name: srs_permission.docx]
     *      
    */
    public function test_user_destroy_permission_is_logged()
    {
        $user = User::factory()->create();
        $user->assignRole('superadmin');
        
        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->post(route("{$this->routeName}.store"), [
            'name' => 'TEST_PERMISSION',
            'group' => 0,
        ]);
        
        $permission = Permission::latest()->first();

        $response = $this->actingAs($user)
        ->from(route("{$this->routeName}.index", absolute: false))
        ->delete(route("{$this->routeName}.destroy", ['id' => $permission->id]), []);
        
        $user_login_latest = Activity::where('causer_type', 'App\Models\User')
        ->where('causer_id', $user->id)
        ->where('event', 'destroy-permission')
        ->latest('created_at')
        ->first();


        $this->assertNotNull($user_login_latest);
    }

}
