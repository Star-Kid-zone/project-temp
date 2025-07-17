<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class ReviewController extends Controller
{
    // Standardized success response
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

    // 1. Get all reviews
    public function index()
    {
        try {
            $reviews = Review::all();
            return $this->successResponse($reviews, "Reviews retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve reviews", $e->getMessage());
        }
    }

    // 2. Get reviews of authenticated user
    public function userReviews(Request $request)
    {
        try {
            $userId = $request->user()->id;
            $reviews = Review::where('user_id', $userId)->get();
            return $this->successResponse($reviews, "User's reviews retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user's reviews", $e->getMessage());
        }
    }

    // 3. Add a new review
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'review_link' => 'required|url',
            ]);

            $validatedData['user_id'] = $request->user()->id;

            $review = Review::create($validatedData);
            return $this->successResponse($review, "Review link added successfully");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to add review link", $e->getMessage(), 500);
        }
    }

    // 4. Get a specific review by ID
    public function show($id)
    {
        try {
            $review = Review::findOrFail($id);
            return $this->successResponse($review, "Review retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Review not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve review", $e->getMessage());
        }
    }

    // 5. Update a review by ID
    public function update(Request $request, $id)
    {
        try {
            $review = Review::findOrFail($id);

            if ($review->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $validatedData = $request->validate([
                'review_link' => 'sometimes|string',
            ]);

            $review->update($validatedData);
            return $this->successResponse($review, "Review updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Review not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Updating review failed", $e->getMessage());
        }
    }

    // 6. Delete a review by ID
    public function destroy(Request $request, $id)
    {
        try {
            $review = Review::findOrFail($id);

            if ($review->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $review->delete();
            return $this->successResponse(null, "Review deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Review not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Deleting review failed", $e->getMessage());
        }
    }
}
