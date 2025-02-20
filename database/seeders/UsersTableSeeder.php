<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use Carbon\Carbon;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::statement('TRUNCATE users');
		\DB::statement('ALTER TABLE users AUTO_INCREMENT = 1;');

		$user = User::create([
			'username' => 'admin',
			'username_old' => null,
			'password' => Hash::make('12345678'),
			'name' => 'admin',
			'email' => 'admin@yacanet.com',
			'nomor_hp' => '+612345678',
			'nomor_hp2' => '+612345678',
			'email_verified_at' => Carbon::now(),
			'about' => 'i am a superman',
			'default_role' => 'superadmin',
			'theme' => 'default',
			'avatar' => null,
			'status' => 'active',
			'status_login' => 'offline',
			'isdeleted' => false,
			'created_at' => Carbon::now(),
			'updated_at' => Carbon::now()
		]);

		$userDua = User::create([
			'username' => 'user',
			'username_old' => null,
			'password' => Hash::make('12345678'),
			'name' => 'user',
			'email' => 'zaka@gmail.com',
			'nomor_hp' => '+61234567324328',
			'nomor_hp2' => '+6123234245678',
			'email_verified_at' => Carbon::now(),
			'about' => 'i am a superman',
			'default_role' => 'pmb',
			'theme' => 'default',
			'avatar' => null,
			'status' => 'active',
			'status_login' => 'offline',
			'isdeleted' => false,
			'created_at' => Carbon::now(),
			'updated_at' => Carbon::now()
		]);

		$userDua->syncRoles(['pmb']);

		$user->syncRoles(['superadmin']);
	}
}
