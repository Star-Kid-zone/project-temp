<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('user_id')->unique(); // User ID as a string
            $table->string('password'); // Password field
            $table->enum('role', ['admin', 'superadmin'])->default('admin'); // Role field
            $table->boolean('active')->default(true); // Active status
            $table->date('paid_date')->nullable(); // Paid date
            $table->enum('plan', ['6 month', '1 year'])->nullable(); // Plan duration
            $table->date('expiry_date')->nullable(); // Expiry date
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};