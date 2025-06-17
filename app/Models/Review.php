<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_link',
        'user_id',
        'business_id',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Business model
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    // Format review link for display
    public function getReviewLinkAttribute($value)
    {
        return filter_var($value, FILTER_VALIDATE_URL) ? $value : null;
    }
}