<?php

namespace App\Http\Controllers\Settings\System;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

use Yajra\DataTables\DataTables;

use App\Models\User;

class UsersRoleController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request): Response
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_BROWSE');
    
    if ($request->wantsJson())
    {
      $data = Role::where('guard_name', 'web');
      
      return DataTables::of($data)
      ->addIndexColumn()
      ->addColumn('jumlah_user', function($item) {
        $jumlah_user = User::with('roles')->get()->filter(
          fn ($user) => $user->roles->where('name', $item->name)->toArray()
        )->count();       
        return $jumlah_user;
      })
      ->addColumn('jumlah_user_default', function($item) {
        $jumlah_user = User::where('default_role', $item->name)->count('id');       
        return $jumlah_user;
      })
      ->toJson();
    }
    else
    {			
      return view('/setting/users/roles/roles-index', [
        'page_active'=>'setting-users-role',				
      ]);
    }		
  }
  public function create(Request $request): Response
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_STORE');	
    
    return view('/setting/users/roles/roles-create', [
      'page_active'=>'setting-users-role',				
    ]);				
  }
  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Request $request, $id): Response
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_SHOW');

    $role = Role::find($id);
    
    if (is_null($role))
    {
      flash("ID role ($id) tidak terdaftar.")->error();
      return back();			                  
      
    }
    elseif ($request->wantsJson())
    {
      $permission = $role->permissions;
      return DataTables::of($permission)
      ->addIndexColumn()
      ->toJson();
    }
    elseif ($role->id == 1) 
    {
      flash("ID role ($id) tidak perlu diberikan permission.")->error();
      return back();			                  			
    }
    else
    {				
      $permission = $role->permissions;

      return view('/setting/users/roles/roles-show', [
        'page_active'=>'setting-users-role',				
        'data'=>$role,
        'jumlah_permission'=>$permission->count(),
        'role_permissions'=>$permission->pluck('name','id')->toJson(),
      ]);
    }		
  }
  public function store(Request $request): RedirectResponse
  { 
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_STORE');

    $this->validate($request, [
      'name'=>'required|string|unique:roles,name'
    ]);

    $role = Role::create([
      'name' => $request->input('name'),
      'guard_name' => 'web',
    ]);
    Role::create([
      'name' => $request->input('name'),
      'guard_name' => 'api',
    ]);

    flash('Permission role ' . $role->name . ' berhasil ditambah.')->success();
    return redirect(route('setting-users-role.show', ['id'=>$role->id]));
  }
  /**
   * Store a roles resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function storerolepermissions(Request $request): RedirectResponse
  {      
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_STORE');

    $this->validate($request, [
      'role_id'=>'required|exists:roles,id'
    ]);
    $post = $request->all();

    $role_id = $post['role_id'];
    $role = Role::find($role_id);			
    $current_permission_role = $role->permissions->pluck('name','id')->toArray();

    $permissions = isset($post['chkpermission']) ? $post['chkpermission'] : [];			
    
    $permissions = $current_permission_role + $permissions;			

    $records = [];
    foreach($permissions as $perm_id=>$v)
    {
      $records[] = $perm_id;
    }     
    $role->syncPermissions($records);
    
    flash('Permission role ' . $role->name . ' berhasil diubah atau ditambah.')->success();
    return redirect(route('setting-users-role.show', ['id' => $role_id]));

  }

  /**
   * Store user permissions resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function revokerolepermission(Request $request): RedirectResponse
  {      
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_DESTROY');
    
    $role = DB::transaction(function () use ($request) {
      $post = $request->all();
      $name = $post['permission_name'];
      $role_id = $post['role_id'];   
      
      $role = Role::find($role_id);
      $role->revokePermissionTo($name);

      return $role;
    });
    flash('Permission '. $request->input('permission_name'). ' dari role ' . $role->name . ' berhasil di hapus.')->success();
    return redirect(route('setting-users-role.show', ['id' => $role->id]));
  }
  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id): Response
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_UPDATE');
    
    $role = Role::find($id);
    
    if (is_null($role))
    {
      flash("ID role ($id) tidak terdaftar.")->error();
      return back();			                  
    }
    else if ($role->id == 1)
    {
      flash("Role dengan id ($id) tidak bisa diubah")->error();
      return back();			                  			
    }
    else
    {
      return view('/setting/users/roles/roles-edit', [
        'page_active'=>'setting-users-role',
        'data'=>$role,
      ]);				
    }		
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id): RedirectResponse
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_UPDATE');
    
    $role = Role::find($id);

    if (is_null($role))
    {
      flash("ID role ($id) tidak terdaftar.")->error();
      return back();			                  
    }
    else
    {
      $validation = $this->validate($request, [                                
        'name'=>[
            'required',
            Rule::unique('roles')->ignore($role->name, 'name')
        ],         
      ],[
          'name.required'=>'Nama role mohon untuk di isi',
      ]);
      
      $role->name = $request->input('name');
      $role->save();
      
      flash('Nama role berhasil diubah.')->success();
      return redirect(route('setting-users-role.index'));
    }
  }
  public function destroy($id): RedirectResponse
  {
    $this->hasPermissionTo('SYSTEM-SETTING-ROLES_DESTROY');
    
    $role = Role::find($id);
    if(is_null($role))
    {
      flash("ID role ($id) tidak terdaftar.")->error();
      return back();			                  
    }
    else if ($role->id == 1)
    {
      flash("Role dengan id ($id) tidak bisa dihapus")->error();
      return back();			                  			
    }
    else
    {
      $nama_role = $role->name;
      $role->delete();
      
      flash("Nama Role ($nama_role) berhasil dihapus")->success();
      return redirect()->route('setting-users-role.index');
    }
  }	
  /**
   * Sinkron seluru user permissions di role ini
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function syncallrolepermissions(Request $request, $id): RedirectResponse
  {      
    $this->hasPermissionTo('USER_STOREPERMISSIONS');

    $role = Role::find($id);
    if (is_null($role))
    {
      flash("Role dengan ID ($id) tidak terdaftar di database")->error();
      return back();			                  			
    }
    else if ($role->id == 1)
    {
      flash("Role ($role->name) tidak perlu di sinkronkan")->error();
      return back();			                  						
    }
    else
    {
      \DB::table('system_job')->where('pid', 100)->delete();

      $permission = $role->permissions;
      $permissions=$permission->pluck('name');

      $data = \DB::table('users')          
      ->where('default_role', $role->name)          
      ->orderBy('id', 'ASC')
      ->chunk(500, function($result) use ($role, $permissions) {            
        foreach($result as $user) 
        {
          $tanggal = \Helper::tanggal('Y-m-d H:i:s');              
          $data_job[] = [
            'id' => uniqid('uid'),
            'pid' => 100,
            'pname' => 'syncrolepermissions',
            'data_id' => $user->id,
            'isi_data' => json_encode([
              'user_id' => $user->id, 
              'user_name' => $user->username, 
              'role_id' => $role->id,                 
              'role_name' => $role->name,                 
              'permissions' => $permissions,                 
            ]),
            'desc' => "sync permission seluruh user dengan role {$role->name}",
            'status' => 0,                
            'created_at' => $tanggal,
            'updated_at' => $tanggal,
          ];              
        }
        \DB::table('system_job')->insert($data_job);
      });	
      flash("Sync permission user dengan role ({$role->name}) berhasil ditambah ke queue")->success();
      return back();
    }
  }     
  
  /**
   * Sinkron seluruh user ke defaultnya
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function syncrevokeuserroledefault(Request $request, $id): RedirectResponse
  { 
    $this->hasPermissionTo('USER_STOREPERMISSIONS');

    $role = Role::find($id);
    if (is_null($role))
    {
      flash("Role dengan ID ($id) tidak terdaftar di database")->error();
      return back();			                  			
    }
    else if ($role->id == 1)
    {
      flash("Role ($role->name) tidak perlu di sinkronkan")->error();
      return back();			                  						
    }
    else
    {
      \DB::table('system_job')->where('pid', 101)->delete();

      $data = \DB::table('users')          
      ->where('default_role', $role->name)          
      ->orderBy('id', 'ASC')
      ->chunk(500, function($result) use ($role) {         
        foreach($result as $user) 
        {
          $tanggal = \Helper::tanggal('Y-m-d H:i:s');              
          $data_job[] = [
            'id' => uniqid('uid'),
            'pid' => 101,
            'pname' => 'syncrevokeuserroledefault',
            'data_id' => $user->id,
            'isi_data' => json_encode([
              'user_id' => $user->id, 
              'user_name' => $user->username, 
              'role_id' => $role->id,                 
              'role_name' => $role->name,
            ]),
            'desc' => "sync revoke user yang memiliki role selain {$role->name} ke default",
            'status' => 0,                
            'created_at' => $tanggal,
            'updated_at' => $tanggal,
          ];              
        }        
        \DB::table('system_job')->insert($data_job);
      });	
      flash("sync revoke user yang memiliki role selain {$role->name} ke default  berhasil ditambah ke queue")->success();
      return back();
    }
  }
}
