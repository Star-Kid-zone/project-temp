<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key to users table
            $table->string('theme_colour')->default('#FFFFFF'); // Default theme colour
            $table->boolean('menubtn_status')->default(true); // Menu button status
            $table->boolean('paybtn_status')->default(true); // Pay button status
            $table->boolean('reviewbtn_status')->default(true); // Review button status
            $table->boolean('special_offerstatus')->default(false); // Special offer status
            $table->integer('menu_theme')->default(1); // Menu theme (e.g., 1, 2, 3, etc.)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
