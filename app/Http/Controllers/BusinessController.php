<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class BusinessController extends Controller
{
    // Standardized response format
    private function successResponse($data, $message)
    {
        return response()->json([
            'data' => $data,
            'status' => true,
            'message' => $message,
        ]);
    }

    private function errorResponse($message, $data = null, $statusCode = 400)
    {
        return response()->json([
            'data' => $data,
            'status' => false,
            'message' => $message,
        ], $statusCode);
    }

    // 1. Get all businesses
    public function index()
    {
        try {
            $businesses = Business::all();
            return $this->successResponse($businesses, "Businesses retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve businesses", $e->getMessage());
        }
    }

    // 2. Get businesses of authenticated user
    public function userBusinesses(Request $request)
    {
        try {
            $userId = $request->user()->id;
            $businesses = Business::where('user_id', $userId)->get();
            return $this->successResponse($businesses, "User's businesses retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user's businesses", $e->getMessage());
        }
    }

    // 3. Add new business
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'business_name' => 'required|string',
                'phone' => 'required|string',
                'social_media' => 'required|array',
                'active' => 'boolean',
            ]);

            // Format social media data
            $socialMedia = [];
            foreach ($validatedData['social_media'] as $platform => $link) {
                if (!empty($link)) {
                    $socialMedia[$platform] = $link;
                }
            }
            $validatedData['social_media'] = $socialMedia;

            $validatedData['user_id'] = $request->user()->id;

            $business = Business::create($validatedData);
            return $this->successResponse($business, "Business successfully added");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Adding business failed", $e->getMessage(), 500);
        }
    }

    // 4. Get specific business by ID
    public function show($id)
    {
        try {
            $business = Business::findOrFail($id);
            return $this->successResponse($business, "Business retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Business not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve business", $e->getMessage());
        }
    }

    // 5. Update business by ID
    public function update(Request $request, $id)
    {
        try {
            $business = Business::findOrFail($id);

            if ($business->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $validatedData = $request->validate([
                'business_name' => 'sometimes|string',
                'phone' => 'sometimes|string',
                'social_media' => 'sometimes|array',
                'active' => 'sometimes|boolean',
            ]);

            $business->update($validatedData);
            return $this->successResponse($business, "Business updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Business not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Updating business failed", $e->getMessage());
        }
    }

    // 6. Delete business by ID
    public function destroy(Request $request, $id)
    {
        try {
            $business = Business::findOrFail($id);

            if ($business->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $business->delete();
            return $this->successResponse(null, "Business deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Business not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Deleting business failed", $e->getMessage());
        }
    }
}
