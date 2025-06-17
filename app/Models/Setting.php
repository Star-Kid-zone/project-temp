<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme_colour',
        'menubtn_status',
        'paybtn_status',
        'reviewbtn_status',
        'special_offerstatus',
        'menu_theme',
    ];

    protected $casts = [
        'menubtn_status' => 'boolean',
        'paybtn_status' => 'boolean',
        'reviewbtn_status' => 'boolean',
        'special_offerstatus' => 'boolean',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}