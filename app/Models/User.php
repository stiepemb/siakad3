<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Spatie\Permission\Traits\HasRoles;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, InteractsWithMedia;
    
    protected static $logName = 'system';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'username_old',
        'password',
        'name',
        'email',
        'nomor_hp',
        'nomor_hp2',
        'email_verified_at',
        'about',
        'default_role',
        'theme',
        'avatar',
        'status',
        'status_login',
        'isdeleted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function registerMediaConversions(Media $media = null): void
    {
        if (function_exists('proc_open'))
        {
            $this->addMediaConversion('thumb')
                ->width(350)
                ->height(350);
        }
        else
        {
            $this->addMediaConversion('thumb')
                ->width(350)
                ->height(350)
                ->quality(70);
        }
    }
}
