<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Business;
use App\Models\Menu;
use App\Models\Review;
use App\Models\Payment;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'user_id' => 'admin123',
            'password' => Hash::make('adminpassword'),
            'role' => 'admin',
            'active' => true,
            'paid_date' => now(),
            'plan' => '1 year',
            'expiry_date' => now()->addYear(),
        ]);

        // Create Superadmin User
        $superadmin = User::create([
            'user_id' => 'superadmin123',
            'password' => Hash::make('superadminpassword'),
            'role' => 'superadmin',
            'active' => true,
            'paid_date' => now(),
            'plan' => '1 year',
            'expiry_date' => now()->addYear(),
        ]);

        // Create Dummy Business Data
        Business::create([
            'business_name' => 'Admin Business',
            'phone' => '1234567890',
            'social_media' => [
                ['platform' => 'Facebook', 'url' => 'https://facebook.com/admin'],
                ['platform' => 'Twitter', 'url' => 'https://twitter.com/admin'],
            ],
            'merchant_id' => 'merchant_admin',
            'user_id' => $admin->id,
            'active' => true,
        ]);

        Business::create([
            'business_name' => 'Superadmin Business',
            'phone' => '0987654321',
            'social_media' => [
                ['platform' => 'Facebook', 'url' => 'https://facebook.com/superadmin'],
                ['platform' => 'Twitter', 'url' => 'https://twitter.com/superadmin'],
            ],
            'merchant_id' => 'merchant_superadmin',
            'user_id' => $superadmin->id,
            'active' => true,
        ]);

        // Create Dummy Menu Data
        Menu::create([
            'item' => 'Cheeseburger',
            'price' => 9.99,
            'description' => 'A delicious cheeseburger with cheddar cheese.',
            'availability' => true,
            'category' => 'Burgers',
            'type' => 'Non-Veg',
            'user_id' => $admin->id,
            'popular' => true,
        ]);

        Menu::create([
            'item' => 'Veg Pizza',
            'price' => 12.99,
            'description' => 'A vegetarian pizza with fresh vegetables.',
            'availability' => true,
            'category' => 'Pizza',
            'type' => 'Veg',
            'user_id' => $superadmin->id,
            'popular' => false,
        ]);

        // Create Dummy Review Data
        Review::create([
            'review_link' => 'https://example.com/review/admin',
            'user_id' => $admin->id,
        ]);

        Review::create([
            'review_link' => 'https://example.com/review/superadmin',
            'user_id' => $superadmin->id,
        ]);

        // Create Dummy Payment Data
        Payment::create([
            'payment_link' => 'https://example.com/payment/admin',
            'user_id' => $admin->id,
        ]);

        Payment::create([
            'payment_link' => 'https://example.com/payment/superadmin',
            'user_id' => $superadmin->id,
        ]);

        // Create Dummy Setting Data
        Setting::create([
            'user_id' => $admin->id,
            'theme_colour' => '#3498db',
            'menubtn_status' => true,
            'paybtn_status' => true,
            'reviewbtn_status' => true,
            'special_offerstatus' => false,
            'menu_theme' => 1,
        ]);

        Setting::create([
            'user_id' => $superadmin->id,
            'theme_colour' => '#e74c3c',
            'menubtn_status' => true,
            'paybtn_status' => true,
            'reviewbtn_status' => true,
            'special_offerstatus' => true,
            'menu_theme' => 2,
        ]);

        $this->command->info('Database seeded successfully!');
    }
}