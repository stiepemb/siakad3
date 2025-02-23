<?php

namespace App\Http\Controllers\Settings\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Closure;

use App\Models\User;

use Yajra\DataTables\DataTables;

class UsersController extends Controller
{
  /**
   * filter user
   */
  private $filter;
  public function __construct()
  {  
    $this->middleware(['role:superadmin']);

    //load filter
    $this->middleware(function (Request $request, Closure $next) {
      $this->setFilterValue($request);
      return $next($request);
    });    
  }  
  private function setFilterValue($request)
  {
    $filter = $request->session()->get('FILTER_USER_MANAGE');
    
    if(is_null($filter))
    {
      $filter = [
        'FILTER_ROLE' => 'baak',        
      ];
      $request->session()->put('FILTER_USER_MANAGE', $filter);
    }
    else if ($request->isMethod('post'))
    {
      if($request->input('frmname') == 'frmfilter')
      {
        if($request->has('resetfilter'))
        {
          $filter = null;
          $request->session()->forget('FILTER_USER_MANAGE');
        }
        else
        {
          $filterrole = $request->input('filterrole');
          

          $filter = [
            'FILTER_ROLE' => $filterrole,          
          ];
          $request->session()->put('FILTER_USER_MANAGE', $filter);
        }      
      }
    }
    $this->filter = $filter;
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_BROWSE');		
    
    if ($request->wantsJson())
    {
      $data = \DB::table('users');
      
      if(is_null($this->filter['FILTER_ROLE']))
      {
        $data = \DB::table('users');
      }
      else
      {
        $data = User::role($this->filter['FILTER_ROLE']);
      }
      return DataTables::of($data)
      ->addIndexColumn()      
      ->toJson();
    }
    else
    {
      //daftar role
      $daftar_role = Role::select(\DB::raw('
        id,
        name
      '))		
      ->where('guard_name', 'web')      
      ->orderBy('id', 'asc')
      ->get()
      ->pluck('name', 'name')
      ->prepend('- PILIH ROLE -', '')    
      ->toArray();

      return view('/setting/users/user/user-index', [
        'customizer' => 'setting-users-manage.filter',
        'daftar_role' => $daftar_role,
        'filter' => $this->filter,
      ]);
    }
  }
  public function filter(Request $request)
  {
    $this->setFilterValue($request);
    return redirect(route('setting-users-manage.index'));
  }
  public function show(Request $request, $id)
  {    
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_SHOW');	

    $user = User::find($id);

    if (is_null($user))
    {
      flash("ID user ($id) tidak terdaftar.")->error();
      return back();			      
    }
    elseif ($request->wantsJson())
    {
      $permission = $user->permissions;			
      return DataTables::of($permission)
      ->addIndexColumn()
      ->toJson();
    }
    elseif ($user->id == 1) 
    {
      flash("ID user ($id) tidak perlu diberikan permission.")->error();
      return back();			      
    }
    else
    {		
      $role_name = $request->query('role', $user->default_role);

      $daftar_role = $user->getRoleNames()->toArray();

      if (!in_array($role_name, $daftar_role)) 
      {
        flash("ID user ($id) tidak memiliki role ($role_name) sebagai.")->error();
        return redirect(route('setting-users-manage.index'));
      }
        
      $role = Role::findByName($role_name);

      $user_permission = $user->permissions;
      $role_permission = $role->permissions;
      
      $daftar_roles_user = $user->getRoleNames();
      $daftar_role = Role::select(\DB::raw('
        id,
        name
      '))		
      ->where('guard_name', 'web')      
      ->orderBy('id', 'asc')
      ->get()
      ->pluck('name', 'name')
      ->prepend('- PILIH ROLE -', '')    
      ->toArray();
      
      return view('/setting/users/user/user-show', [
        'jumlah_permission' => $user_permission->count(),
        'data' => $user,
        'data_role' => $role,
        'user_permissions' => $user_permission->pluck('name','id')->toArray(),
        'role_permissions' => $role_permission,
        'daftar_role' => $daftar_role,
        'daftar_roles_user' => $daftar_roles_user,
        'route_close' => route('setting-users-manage.index'),
      ]);
    }
  }	
  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_STORE');

    //daftar role
    $daftar_role = Role::select(\DB::raw('
      id,
      name
    '))		
    ->where('guard_name', 'web')
    ->whereNotIn('name',  ['alumni', 'mahasiswabaru', 'mahasiswa', 'dosen', 'dosenwali', 'orangtuawali'])
    ->orderBy('id', 'asc')
    ->get()
    ->pluck('name', 'name')
    ->prepend('- PILIH ROLE -', '')    
    ->toArray();
    
    return view('/setting/users/user/user-create', [
      'daftar_role' => $daftar_role
    ]);
  }	
  /**
   * digunakan untuk membuat token untuk user
   */
  public function createtoken(Request $request, $id)
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_STORE');	

    $user = User::find($id);

    if (is_null($user))
    {
      flash("ID user ($id) tidak terdaftar.")->error();
      return back();			      
    }   
    else
    {		
      $token = $user->createToken('bsi');
      return $token;
    }
  }
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_STORE');

    $this->validate($request, [
      'name' => 'required',
      'email' => 'required|string|email:filter|unique:users',
      'nomor_hp' => 'required|string|unique:users',
      'username' => 'required|string|unique:users',
      'password' => [
        'required',        
        'min:8',        
        'regex:/^(?=.*[A-Z])(?=.*\d|\W).+$/'
      ],
      'default_role' => 'required|string|exists:roles,name',
    ],[
      'password.regex' => 'The password must contain at least one uppercase letter and one numeric or special character.'
    ]);	
    
    $user = \DB::transaction(function () use ($request) {
      $now = \Helper::tanggal('Y-m-d H:i:s');  			
      $user=User::create([					
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'nomor_hp' => $request->input('nomor_hp'),
        'username'=> $request->input('username'),
        'password'=>\Hash::make($request->input('password')),        
        'theme' => 'default',
        'default_role' => $request->input('default_role'),
        'foto'=> 'resources/userimages/no_photo.png',
        'created_at' => $now, 
        'updated_at' => $now
      ]);       			   
      $user->syncRoles([$request->input('default_role')]);          

      $permission=Role::findByName($request->input('default_role'))->permissions;
      $user->givePermissionTo($permission->pluck('name'));
      
      return $user;
    });				
    flash('User dengan role ' . $request->input('default_role'). '  berhasil disimpan.')->success();	
    return redirect(route('setting-users-manage.show', ['id' => $user->id]));
  }	
  public function edit($id)
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_UPDATE');

    $user = User::find($id);
    if (is_null($user))
    {
      flash("User dengan ID ($id) tidak terdaftar.")->error();
      return back();			            
    }
    else
    {
       //daftar role
      $daftar_role = Role::select(\DB::raw('
        id,
        name
      '))		
      ->where('guard_name', 'web')    
      ->orderBy('id', 'asc')
      ->get()
      ->pluck('name', 'name')
      ->prepend('- PILIH ROLE -', '')    
      ->toArray();

      return view('/setting/users/user/user-edit', [
        'daftar_role' => $daftar_role,
        'data' => $user,
      ]);
    }
  }
  public function update(Request $request, $id)
  {
    $this->hasPermissionTo('SYSTEM-SETTING-USERS_UPDATE');

    $user = User::find($id);
    if (is_null($user))
    {
      flash("User dengan ID ($id) tidak terdaftar.")->error();
      return back();			            
    }
    else
    {
      $this->validate($request, [
        'username'=>[
          'required',
          'unique:users,username,' . $user->id
        ],           
        'name' => 'required',
        'email' => 'required|string|email:filter|unique:users,email,' . $user->id,
        'nomor_hp' => 'required|string|unique:users,nomor_hp,' . $user->id,  
        'default_role' => 'required|string|exists:roles,name',     
      ]);

      $user = \DB::transaction(function () use ($request, $user) {				
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->username = $request->input('username');                   
        $user->nomor_hp = $request->input('nomor_hp');                   
        if (!empty(trim($request->input('password')))) {
          $user->password = \Hash::make($request->input('password'));
        }    
        $user->updated_at = \Helper::tanggal('Y-m-d H:i:s');
        $user->default_role = $request->input('default_role');  
        $user->save();           

        $default_role = $request->input('default_role');
        if($default_role != $user->default_role)
        {
          $user->syncPermissions();
          $user->syncRoles([$default_role]);          
  
          $permission = Role::findByName($default_role)->permissions;
          $user->givePermissionTo($default_role);
        }

        return $user;
      });		
      flash('User dengan role ' . $request->input('default_role'). '  berhasil diubah.')->success();	
      return redirect(route('setting-users-manage.show', ['id' => $user->id]));
    }
  }	
  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request, $id)
  {
    $user = User::find($id);
    if (is_null($user))
    {
      flash("User dengan ID ($id) tidak terdaftar.")->error();
      return back();			            
    }
    else if (!$user->isdeleted)
    {
      flash("User dengan ID ($id) tidak terdaftar.")->error();
      return back();			            
    }
    else if ($user->default_role == 'mahasiswa' && $user->mahasiswa->count() > 0)
    {
      flash("User mahasiswa ini tidak bisa dhapus karena memiliki satu atau lebih register mahasiswa")->error();
      return back();			                  
    }
    else if ($user->default_role == 'mahasiswabaru' && $user->mahasiswabaru->count() > 0)
    {
      flash("User mahasiswa baru ini tidak bisa dhapus karena memiliki satu atau lebih formulir pendaftaran")->error();
      return back();			                  
    }
    else if ($user->default_role == 'dosen')
    {
      flash("User dengan default role dosen tidak bisa dhapus melalui halaman ini")->error();
      return back();			                  
    }
    else
    {
      $default_role = $user->default_role;
      $user->delete();
      flash("Data user dengan role $default_role berhasil dihapus.")->success();
      return redirect(route('setting-users-manage.index'));
    }
  }
  /**
	 * Store user permissions resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function storeuserpermissions(Request $request)
	{      
		$this->hasPermissionTo('USER_STOREPERMISSIONS');
    
		$this->validate($request, [
			'user_id' => 'required|exists:users,id'
		]);
		$post = $request->all();		
		$user_id = $post['user_id'];

		$user = User::find($user_id);			

		$permissions = isset($post['chkpermission']) ? $post['chkpermission'] : [];
		$current_permission_role = $user->permissions->pluck('name','id')->toArray();
		
		$permissions = $current_permission_role + $permissions;		
		
		$records = [];
		foreach($permissions as $perm_id=>$v)
		{
			$records[] = $perm_id;
		}
		
		$user->givePermissionTo($records);		
    
    flash('Permission user ' . $user->username . ' berhasil diubah atau ditambah.')->success();
		return back();
	}
	/**
	 * Destroy user permissions resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function revokeuserpermission(Request $request)
	{      
		$this->hasPermissionTo('USER_REVOKEPERMISSIONS');

		$post = $request->all();
		$name = $post['permission_name'];
		$user_id = $post['user_id'];		
		$pid = $post['pid'];		

		$user = User::find($user_id);

		$user->revokePermissionTo($name);
		
    flash('Permission '. $request->input('permission_name'). ' dari user ' . $user->name . ' berhasil dihapus.')->success();
		return redirect(route("$pid.show", ['id' => $request->input('user_id')]));		
	}	
  /**
	 * Create user permissions resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function storeuserrole(Request $request)
  {
    $this->hasPermissionTo('USER_STOREPERMISSIONS');
    
		$this->validate($request, [
			'user_id' => 'required|exists:users,id',
      'role_name' => 'required|exists:roles,name',
		]);
		$post = $request->all();		
		$user_id = $post['user_id'];
		$role_name = $post['role_name'];
    $pid = $post['pid'];		

		$user = User::find($user_id);			

    $daftar_role = $user->getRoleNames()->toArray();
    $daftar_role[] = $role_name;

    $user->syncRoles($daftar_role);

    flash('Role '. $request->input('role_name'). ' dari user ' . $user->name . ' berhasil ditambah.')->success();
		return redirect(route("$pid.show", ['id' => $request->input('user_id')]));		
  }
	/**
	 * Destroy user permissions resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function revokeuserrole(Request $request)
	{      
		$this->hasPermissionTo('USER_REVOKEPERMISSIONS');

    $this->validate($request, [
			'user_id' => 'required|exists:users,id',
      'role_name_delete' => 'required|exists:roles,name',
		]);

		$post = $request->all();
		$name = $post['role_name_delete'];
		$user_id = $post['user_id'];		
		$pid = $post['pid'];		

		$user = User::find($user_id);
    $daftar_role = $user->getRoleNames()->toArray();

    if (in_array($name, $daftar_role)) 
    {
      unset($daftar_role[array_search($name, $daftar_role)]);

      $role = Role::findByName($name);
      $role_permission = $role->permissions->pluck('name')->toArray();

      $user->revokePermissionTo($role_permission);      
    }    
		$user->syncRoles($daftar_role);
		
    flash('Role '. $request->input('role_name'). ' dari user ' . $user->name . ' berhasil dihapus.')->success();
		return redirect(route("$pid.show", ['id' => $request->input('user_id')]));		
	}	

  public function resetpermission(Request $request)
  {
    $this->hasPermissionTo('USER_STOREPERMISSIONS');
    
    flash('Seluruh permission user masing-masing role akan direset sesuai dengan role yang dimilikinya, berhasil ditambah ke queue.')->success();
		return redirect(route('setting-users-manage.index'));
  }
}
