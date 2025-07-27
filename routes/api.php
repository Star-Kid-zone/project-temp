<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SettingController;

Route::middleware(['api'])->group(function () {
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/otp', [AuthController::class, 'verifyOtp']);

});

Route::middleware('adminauth')->group(function () {
    Route::get('/menu', [MenuController::class, 'index']); // Get all menus
    Route::get('/menu/user', [MenuController::class, 'userMenus']); // Get menus for authenticated user
    Route::post('/menu', [MenuController::class, 'store']); // Add new menu
    Route::get('/menu/{id}', [MenuController::class, 'show']); // Get menu by ID
    Route::put('/menu/{id}', [MenuController::class, 'update']); // Update menu by ID
    Route::delete('/menu/{id}', [MenuController::class, 'destroy']); // Delete menu by ID
});

Route::middleware('adminauth')->group(function () {
    Route::get('/business', [BusinessController::class, 'index']); // Get all businesses
    Route::get('/business/user', [BusinessController::class, 'userBusinesses']); // Get businesses for authenticated user
    Route::post('/business', [BusinessController::class, 'store']); // Add new business
    Route::get('/business/{id}', [BusinessController::class, 'show']); // Get business by ID
    Route::put('/business/{id}', [BusinessController::class, 'update']); // Update business by ID
    Route::delete('/business/{id}', [BusinessController::class, 'destroy']); // Delete business by ID
});

Route::middleware('superadminauth')->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Get all users
    Route::get('/users/me', [UserController::class, 'me']); // Get authenticated user
    Route::post('/users', [UserController::class, 'store']); // Create a user
    Route::get('/users/{id}', [UserController::class, 'show']); // Get a user by ID
    Route::put('/users/{id}', [UserController::class, 'update']); // Update a user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete a user
});







Route::middleware('adminauth')->group(function () {
    Route::get('/reviews', [ReviewController::class, 'index']); // Get all reviews
    Route::get('/reviews/user', [ReviewController::class, 'userReviews']); // Get reviews of authenticated user
    Route::post('/reviews', [ReviewController::class, 'store']); // Add new review
    Route::get('/reviews/{id}', [ReviewController::class, 'show']); // Get review by ID
    Route::put('/reviews/{id}', [ReviewController::class, 'update']); // Update review by ID
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']); // Delete review by ID
});



Route::middleware('adminauth')->group(function () {
    Route::get('/payments', [PaymentController::class, 'index']); // Get all payments
    Route::get('/payments/user', [PaymentController::class, 'userPayments']); // Get payments of authenticated user
    Route::post('/payments', [PaymentController::class, 'store']); // Add new payment
    Route::get('/payments/{id}', [PaymentController::class, 'show']); // Get payment by ID
    Route::put('/payments/{id}', [PaymentController::class, 'update']); // Update payment by ID
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy']); // Delete payment by ID
});

Route::middleware('adminauth')->group(function () {
    Route::get('/settings', [SettingController::class, 'index']); // Get all settings
    Route::get('/settings/user', [SettingController::class, 'userSettings']); // Get authenticated user's settings
    Route::post('/settings', [SettingController::class, 'store']); // Create a new setting
    Route::get('/settings/{id}', [SettingController::class, 'show']); // Get a setting by ID
    Route::put('/settings/{id}', [SettingController::class, 'update']); // Update a setting by ID
    Route::delete('/settings/{id}', [SettingController::class, 'destroy']); // Delete a setting by ID
});

    Route::get('/settings/user/{id}', [SettingController::class, 'userdetails']); // Get authenticated user's details
    Route::get('/menu/user/{id}', [MenuController::class, 'Listusermenu']); // Get authenticated user's details
