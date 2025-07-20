<?php
namespace App\Http\Controllers;
use App\Models\Business;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class SettingController extends Controller
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

    // 1. Get all settings
    public function index()
    {
        try {
            $settings = Setting::all();
            return $this->successResponse($settings, "Settings retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve settings", $e->getMessage());
        }
    }

    // 2. Get authenticated user's settings
    public function userSettings(Request $request)
    {
        try {
            $userId = $request->user()->id;
            $settings = Setting::where('user_id', $userId)->get();
            return $this->successResponse($settings, "User's settings retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user's settings", $e->getMessage());
        }
    }

    // 3. Create a new setting
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'theme_colour' => 'sometimes|string',
                'menubtn_status' => 'sometimes|boolean',
                'paybtn_status' => 'sometimes|boolean',
                'reviewbtn_status' => 'sometimes|boolean',
                'special_offerstatus' => 'sometimes|boolean',
                'menu_theme' => 'sometimes|integer',
            ]);

            $validatedData['user_id'] = $request->user()->id;

            $setting = Setting::create($validatedData);
            return $this->successResponse($setting, "Setting successfully added");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Adding setting failed", $e->getMessage());
        }
    }

    // 4. Get a specific setting by ID
    public function show($id)
    {
        try {
            $setting = Setting::findOrFail($id);
            return $this->successResponse($setting, "Setting retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Setting not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve setting", $e->getMessage());
        }
    }

    // 5. Update a setting by ID
    public function update(Request $request, $id)
    {
        try {
            $setting = Setting::findOrFail($id);

            if ($setting->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $validatedData = $request->validate([
                'theme_colour' => 'sometimes|string',
                'menubtn_status' => 'sometimes|boolean',
                'paybtn_status' => 'sometimes|boolean',
                'reviewbtn_status' => 'sometimes|boolean',
                'special_offerstatus' => 'sometimes|boolean',
                'menu_theme' => 'sometimes|integer',
            ]);

            $setting->update($validatedData);
            return $this->successResponse($setting, "Setting updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Setting not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Updating setting failed", $e->getMessage());
        }
    }

    // 6. Delete a setting by ID
    public function destroy(Request $request, $id)
    {
        try {
            $setting = Setting::findOrFail($id);

            if ($setting->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $setting->delete();
            return $this->successResponse(null, "Setting deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Setting not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Deleting setting failed", $e->getMessage());
        }
    }

    public function userdetails($id)
{
    try {
        // Retrieve settings using the user_id passed in the function parameter
        $settings = Setting::where('user_id', $id)->first();



        // Get the business associated with the user
        $business = Business::where('user_id', $id)->first();

        return $this->successResponse([
            'settings' => $settings,
            'business' => $business
        ], "User's settings and business data retrieved successfully");
    } catch (Exception $e) {
        return $this->errorResponse("Failed to retrieve user's settings", $e->getMessage());
    }
}
}
