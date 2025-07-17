<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;

    // Explicitly define the table name
    protected $table = 'business';

    protected $fillable = [
        'business_name',
        'phone',
        'social_media',
        // 'merchant_id',
        'user_id',
        'active',
    ];

    protected $casts = [
        'social_media' => 'array',
        'active' => 'boolean',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Format social media for display
    public function getSocialMediaAttribute($value)
    {
        return is_array($value) ? $value : json_decode($value, true) ?? [];
    }

    // Set social media
    public function setSocialMediaAttribute($value)
    {
        $this->attributes['social_media'] = json_encode($value);
    }
}