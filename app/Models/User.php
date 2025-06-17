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
        'role',
        'active',
        'paid_date',
        'plan',
        'expiry_date',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'active' => 'boolean',
        'paid_date' => 'date',
        'expiry_date' => 'date',
    ];

    /**
     * Get the identifier that will be stored in the JWT subject claim.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); 
    }

    /**
     * Return a key-value array containing custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [
            'user_id' => $this->user_id, // Add user_id to the JWT token
            'id' => $this->id, // Add id to the JWT token
        ];
    }
}
