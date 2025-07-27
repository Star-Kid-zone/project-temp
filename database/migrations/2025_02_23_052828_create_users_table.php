<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->unique();
            $table->string('password');
            $table->string('first_name'); // NEW
            $table->string('last_name')->nullable(); // NEW
            $table->string('otp')->default('123456'); // NEW
            $table->enum('role', ['admin', 'superadmin'])->default('admin');
            $table->boolean('active')->default(false); // Default to false
            $table->date('paid_date')->nullable();
            $table->enum('plan', ['6 month', '1 year'])->nullable();
            $table->date('expiry_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
