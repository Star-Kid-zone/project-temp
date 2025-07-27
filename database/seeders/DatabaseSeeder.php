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
                'first_name' => 'Admin', // required
    'last_name' => 'User', // optional
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
                'first_name' => 'Admin', // required
    'last_name' => 'User', // optional
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
            'user_id' => $superadmin->id,
            'active' => true,
        ]);

        // Seed 20 Menu Items for Admin
        $menuItems = [
            ['Cheeseburger', 9.99, 'A delicious cheeseburger with cheddar cheese.', 'Burgers', 'Non-Veg', true],
            ['Veggie Burger', 8.49, 'A tasty vegetarian burger.', 'Burgers', 'Veg', false],
            ['Chicken Wrap', 7.99, 'Grilled chicken in a tortilla wrap.', 'Wraps', 'Non-Veg', true],
            ['Paneer Wrap', 7.49, 'Paneer tikka in a wrap.', 'Wraps', 'Veg', false],
            ['French Fries', 3.99, 'Crispy golden fries.', 'Sides', 'Veg', true],
            ['Chicken Nuggets', 5.49, 'Crunchy chicken nuggets.', 'Sides', 'Non-Veg', true],
            ['Veg Salad', 4.99, 'Fresh green salad.', 'Salads', 'Veg', false],
            ['Chicken Salad', 6.99, 'Salad with grilled chicken.', 'Salads', 'Non-Veg', false],
            ['Margarita Pizza', 10.49, 'Classic cheese pizza.', 'Pizza', 'Veg', true],
            ['Pepperoni Pizza', 12.99, 'Pepperoni and cheese.', 'Pizza', 'Non-Veg', true],
            ['Fish & Chips', 11.99, 'Fried fish and fries.', 'Mains', 'Non-Veg', false],
            ['Alfredo Pasta', 9.99, 'Creamy Alfredo pasta.', 'Pastas', 'Veg', true],
            ['Chicken Pasta', 10.99, 'Grilled chicken pasta.', 'Pastas', 'Non-Veg', true],
            ['Chocolate Shake', 4.49, 'Thick chocolate shake.', 'Beverages', 'Veg', true],
            ['Strawberry Smoothie', 4.99, 'Fresh strawberry smoothie.', 'Beverages', 'Veg', false],
            ['Iced Coffee', 3.99, 'Cold iced coffee.', 'Beverages', 'Veg', false],
            ['Tandoori Chicken', 13.99, 'Spicy tandoori chicken.', 'Grill', 'Non-Veg', true],
            ['Falafel Wrap', 6.99, 'Falafel with hummus.', 'Wraps', 'Veg', false],
            ['Egg Sandwich', 5.49, 'Boiled egg sandwich.', 'Sandwiches', 'Non-Veg', false],
            ['Veg Sandwich', 5.29, 'Grilled veg sandwich.', 'Sandwiches', 'Veg', true],
        ];

        foreach ($menuItems as $item) {
            Menu::create([
                'item' => $item[0],
                'price' => $item[1],
                'description' => $item[2],
                'category' => $item[3],
                'type' => $item[4],
                'availability' => true,
                'popular' => $item[5],
                'user_id' => $admin->id,
            ]);
        }

        // Create Dummy Menu for Superadmin
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

        $this->command->info('Database seeded successfully with 20 menu items!');
    }
}
