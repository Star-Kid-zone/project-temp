<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class MenuController extends Controller
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

    // 1. Get all menus
    public function index()
    {
        try {
            $menuItems = Menu::all();
            return $this->successResponse($menuItems, "Menus retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve menus", $e->getMessage());
        }
    }

    // 2. Get menus of authenticated user
    public function userMenus(Request $request)
    {
        try {
            $userId = $request->user()->id;
            $menus = Menu::where('user_id', $userId)->get();
            return $this->successResponse($menus, "User menus retrieved successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve user menus", $e->getMessage());
        }
    }

    // 3. Add new menu
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'item' => 'required|string',
                'price' => 'required|numeric',
                'description' => 'required|string',
                'availability' => 'boolean',
                'category' => 'required|string',
                'type' => 'required|string',
                'popular' => 'boolean',
            ]);

            $validatedData['user_id'] = $request->user()->id;

            $menu = Menu::create($validatedData);
            return $this->successResponse($menu, "Menu successfully added");
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Adding menu failed", $e->getMessage());
        }
    }

    // 4. Get specific menu item by ID
    public function show($id)
    {
        try {
            $menu = Menu::findOrFail($id);
            return $this->successResponse($menu, "Menu retrieved successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Menu not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve menu", $e->getMessage());
        }
    }

    // 5. Update menu by ID
    public function update(Request $request, $id)
    {
        try {
            $menu = Menu::findOrFail($id);

            if ($menu->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $validatedData = $request->validate([
                'item' => 'sometimes|string',
                'price' => 'sometimes|numeric',
                'description' => 'sometimes|string',
                'availability' => 'sometimes|boolean',
                'category' => 'sometimes|string',
                'type' => 'sometimes|string',
                'popular' => 'sometimes|boolean',
            ]);

            $menu->update($validatedData);
            return $this->successResponse($menu, "Menu updated successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Menu not found", null, 404);
        } catch (ValidationException $e) {
            return $this->errorResponse("Validation failed", $e->errors(), 422);
        } catch (Exception $e) {
            return $this->errorResponse("Updating menu failed", $e->getMessage());
        }
    }

    // 6. Delete menu by ID
    public function destroy(Request $request, $id)
    {
        try {
            $menu = Menu::findOrFail($id);

            if ($menu->user_id !== $request->user()->id) {
                return $this->errorResponse("Unauthorized access", null, 403);
            }

            $menu->delete();
            return $this->successResponse(null, "Menu deleted successfully");
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Menu not found", null, 404);
        } catch (Exception $e) {
            return $this->errorResponse("Deleting menu failed", $e->getMessage());
        }
    }

    //7) . list menu
public function Listusermenu(Request $request, $id)
{
    try {        

        // Get all menu items created by the user
        $menus = Menu::where('user_id', $id)->get();

        return $this->successResponse($menus, "Menu items fetched successfully");
    } catch (Exception $e) {
        return $this->errorResponse("Fetching menu failed", $e->getMessage());
    }
}

}
