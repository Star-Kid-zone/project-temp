<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    // Explicitly define the table name
    protected $table = 'menu'; // Use 'menu' instead of 'menus'

    protected $fillable = [
        'item',
        'price',
        'description',
        'availability',
        'category',
        'type',
        'user_id',
        'popular',
    ];

    protected $casts = [
        'availability' => 'boolean',
        'popular' => 'boolean',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}