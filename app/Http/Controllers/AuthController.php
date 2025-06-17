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
    // Standardized success response
    private function successResponse($data, $message)
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    // Standardized error response
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
                'role' => 'required|in:admin,superadmin',
                'active' => 'boolean',
                'paid_date' => 'nullable|date',
                'plan' => 'nullable|in:6 month,1 year',
                'expiry_date' => 'nullable|date',
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);

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

            return $this->successResponse([
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'user_id' => $user->user_id,
                    'role' => $user->role,
                    'active' => $user->active,
                    'paid_date' => $user->paid_date,
                    'plan' => $user->plan,
                    'expiry_date' => $user->expiry_date,
                ],
            ], "Login successful");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Login failed", $e->getMessage());
        }
    }
}
