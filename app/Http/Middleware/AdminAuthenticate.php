<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class AdminAuthenticate // <- Change this from Authenticate to AdminAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Ensure the user is authenticated via JWT
            $user = JWTAuth::parseToken()->authenticate();

            // Check if the user has the 'admin' role
            if ($user->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized. Admin access required.'], 401);
            }


            // Attach user_id and id to the request for controller access
            $request->merge([
                'auth_id' => $user->id,
                'auth_user_id' => $user->user_id,
            ]);


        } catch (Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
