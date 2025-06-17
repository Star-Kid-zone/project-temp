<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class PaymentController extends Controller
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

    // 1. Get all payments
    public function index()
    {
        try {
            $payments = Payment::all();
            return $this->successResponse($payments, "Payments retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve payments", $e->getMessage());
        }
    }

    // 2. Get payments of authenticated user
    public function userPayments(Request $request)
    {
        try {
            $userId = $request->user()->id;
            $payments = Payment::where('user_id', $userId)->get();
            return $this->successResponse($payments, "User's payments retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user's payments", $e->getMessage());
        }
    }

    // 3. Add a new payment
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'payment_link' => 'required|string',
            ]);

            $validatedData['user_id'] = $request->user()->id;

            $payment = Payment::create($validatedData);
            return $this->successResponse($payment, "Payment successfully added");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Adding payment failed", $e->getMessage());
        }
    }

    // 4. Get a specific payment by ID
    public function show($id)
    {
        try {
            $payment = Payment::findOrFail($id);
            return $this->successResponse($payment, "Payment retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Payment not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve payment", $e->getMessage());
        }
    }

    // 5. Update a payment by ID
    public function update(Request $request, $id)
    {
        try {
            $payment = Payment::findOrFail($id);

            if ($payment->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $validatedData = $request->validate([
                'payment_link' => 'sometimes|string',
            ]);

            $payment->update($validatedData);
            return $this->successResponse($payment, "Payment updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Payment not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Updating payment failed", $e->getMessage());
        }
    }

    // 6. Delete a payment by ID
    public function destroy(Request $request, $id)
    {
        try {
            $payment = Payment::findOrFail($id);

            if ($payment->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $payment->delete();
            return $this->successResponse(null, "Payment deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Payment not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Deleting payment failed", $e->getMessage());
        }
    }
}
