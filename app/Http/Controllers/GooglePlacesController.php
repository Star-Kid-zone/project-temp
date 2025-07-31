<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GooglePlacesController extends Controller
{
public function searchPlace(Request $request)
{
    $request->validate([
        'query' => 'required|string',
    ]);

    $apiKey = config('services.google.api_key');
    $query = $request->input('query');

    // Use textsearch endpoint for broader matching
    $response = Http::get("https://maps.googleapis.com/maps/api/place/textsearch/json", [
        'query' => $query,
            'region' => 'in', // 'us' for USA, 'in' for India, etc.

        'key' => $apiKey,
    ]);

    if ($response->successful()) {
        $data = $response->json();

        if (!empty($data['results'])) {
            // Filter results whose names contain the query term (case-insensitive)
            $filtered = collect($data['results'])->filter(function ($place) use ($query) {
                return stripos($place['name'], $query) !== false;
            })->map(function ($place) {
                return [
                    'place_id' => $place['place_id'],
                    'name' => $place['name'],
                    'formatted_address' => $place['formatted_address'] ?? '',
                ];
            })->values();

            if ($filtered->isNotEmpty()) {
                return response()->json([
                    'status' => true,
                    'message' => 'Places matched by name',
                    'data' => $filtered,
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'No place names matched your query.',
                'data' => [],
            ], 404);
        }

        return response()->json([
            'status' => false,
            'message' => 'No results from Google Places API.',
            'data' => [],
        ], 404);
    }

    return response()->json([
        'status' => false,
        'message' => 'Failed to contact Google Places API',
    ], $response->status());
}


}
