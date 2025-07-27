<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'password',
        'first_name',
        'last_name',
        'otp',
        'role',
        'active',
        'paid_date',
        'plan',
        'expiry_date',
    ];

    protected $hidden = [
        'password',
        'otp',
    ];

    protected $casts = [
        'active' => 'boolean',
        'paid_date' => 'date',
        'expiry_date' => 'date',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey(); 
    }

    public function getJWTCustomClaims()
    {
        return [
            'user_id' => $this->user_id,
            'id' => $this->id,
        ];
    }
}
