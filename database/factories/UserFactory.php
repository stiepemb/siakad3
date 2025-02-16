<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'username' => fake()->userName(),
			'username_old' => null,
			'password' => static::$password ??= Hash::make('password'),                          
			'name' => fake()->name(),
			'email' => fake()->unique()->safeEmail(),             
			'nomor_hp' => '+612345678',
			'nomor_hp2' => '+612345678',
			'email_verified_at' => now(),
            'remember_token' => Str::random(10),
			'about' => 'i am a superman',
			'default_role' => 'superadmin',
			'theme' => 'default',
			'avatar' => null,
			'status' => 'active',
			'status_login' => 'offline',
			'isdeleted' => false,
			'created_at' => now(),
			'updated_at' => now()
        ];
	
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
