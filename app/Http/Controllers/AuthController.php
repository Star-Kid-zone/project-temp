<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use Exception;

class AuthController extends Controller
{
    private function successResponse($data, $message)
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    private function errorResponse($message, $data = null, $statusCode = 400)
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    // Register a new user
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id' => 'required|string|unique:users',
                'password' => 'required|string|min:6',
                'first_name' => 'required|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'role' => 'required|in:admin,superadmin',
                'active' => 'boolean',
                'paid_date' => 'nullable|date',
                'plan' => 'nullable|in:6 month,1 year',
                'expiry_date' => 'nullable|date',
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);
            $validatedData['otp'] = '123456';
            $validatedData['active'] = false;

            $user = User::create($validatedData);
            $token = JWTAuth::fromUser($user);

            return $this->successResponse([
                'user' => $user,
                'token' => $token,
            ], "User registered successfully");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("User registration failed", $e->getMessage());
        }
    }

    // Login a user
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'user_id' => 'required|string',
                'password' => 'required|string',
            ]);

            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->errorResponse("Unauthorized", null, 401);
            }

            $user = JWTAuth::user();

            // Generate new 6-digit OTP if user not yet verified
            if (!$user->active) {
                $user->otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
                $user->save();
            }

            return $this->successResponse([
                'token' => $token,
                'otp_sent' => !$user->active,
                'active' => $user->active,
                'user' => [
                    'id' => $user->id,
                    'user_id' => $user->user_id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'role' => $user->role,
                    'active' => $user->active,
                    'paid_date' => $user->paid_date,
                    'plan' => $user->plan,
                    'expiry_date' => $user->expiry_date,
                ],
            ], "Login " . ($user->active ? "successful" : "OTP required"));
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Login failed", $e->getMessage());
        }
    }

    // Verify OTP
    public function verifyOtp(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|string',
                'otp' => 'required|digits:6',
            ]);

            $user = User::where('id', $validated['user_id'])->first();

            if (!$user) {
                return $this->errorResponse("User not found", null, 404);
            }
            if ($user->otp !== $validated['otp']) {
                return $this->errorResponse("Invalid OTP", null, 401);
            }

            $user->active = true;
        $user->otp = '';
            $user->save();

            return $this->successResponse([
                'user_id' => $user->user_id,
                'active' => $user->active,
            ], "OTP verified successfully. User is now active.");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("OTP verification failed", $e->getMessage());
        }
    }
}
