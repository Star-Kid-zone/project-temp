<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class UserController extends Controller
{
    // Standardized success 
    private function successResponse($data, $message)
    {
        return response()->json([
            'data' => $data,
            'status' => true,
            'message' => $message,
        ]);
    }

    // Standardized error response
    private function errorResponse($message, $data = null, $statusCode = 400)
    {
        return response()->json([
            'data' => $data,
            'status' => false,
            'message' => $message,
        ], $statusCode);
    }

    // 1️⃣ Get all users (Admin only)
    public function index(Request $request)
    {
        if ($request->user()->role !== 'superadmin') {
            return $this->errorResponse("Unauthorized access", null, 403);
        }

        try {
            $users = User::all();
            return $this->successResponse($users, "Users retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve users", $e->getMessage());
        }
    }

    // 2️⃣ Get authenticated user details
    public function me(Request $request)
    {
        return $this->successResponse($request->user(), "Authenticated user retrieved successfully");
    }

    // 3️⃣ Create a new user (Admin only)
    public function store(Request $request)
    {
        if ($request->user()->role !== 'superadmin') {
            return $this->errorResponse("Unauthorized access", null, 403);
        }

        try {
            $validatedData = $request->validate([
                'user_id' => 'required|string|unique:users,user_id',
                'password' => 'required|string|min:6',
                'role' => 'required|in:admin,superadmin',
                'active' => 'boolean',
                'paid_date' => 'nullable|date',
                'plan' => 'nullable|in:6 month,1 year',
                'expiry_date' => 'nullable|date',
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);

            $user = User::create($validatedData);
            return $this->successResponse($user, "User successfully created");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("User creation failed", $e->getMessage());
        }
    }

    // 4️⃣ Get a specific user (Admin only)
    public function show(Request $request, $id)
    {
        if ($request->user()->role !== 'superadmin') {
            return $this->errorResponse("Unauthorized access", null, 403);
        }

        try {
            $user = User::findOrFail($id);
            return $this->successResponse($user, "User retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("User not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user", $e->getMessage());
        }
    }

    // 5️⃣ Update a user (Admin only)
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'superadmin') {
            return $this->errorResponse("Unauthorized access", null, 403);
        }

        try {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'user_id' => 'sometimes|string|unique:users,user_id,' . $user->id,
                'password' => 'sometimes|string|min:6',
                'role' => 'sometimes|in:admin,superadmin',
                'active' => 'sometimes|boolean',
                'paid_date' => 'nullable|date',
                'plan' => 'nullable|in:6 month,1 year',
                'expiry_date' => 'nullable|date',
            ]);

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);
            return $this->successResponse($user, "User updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("User not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("User update failed", $e->getMessage());
        }
    }

    // 6️⃣ Delete a user (Superadmin only)
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'superadmin') {
            return $this->errorResponse("Unauthorized access", null, 403);
        }

        try {
            $user = User::findOrFail($id);
            $user->delete();
            return $this->successResponse(null, "User deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("User not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("User deletion failed", $e->getMessage());
        }
    }
}
