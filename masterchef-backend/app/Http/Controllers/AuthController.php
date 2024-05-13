<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
    
        if (Auth::attempt($credentials)) {
            // Create a token for the authenticated user
            $user = Auth::user();
            $tokenResult = $user->createToken('Personal Access Token');

            return response()->json([
                'status' => 'success',
                'token' => $tokenResult->plainTextToken,
                'username' => $user->username,
                'id' => $user->id,
            ]);
        } else {
            return response()->json(['status' => 'failed']);
        }
    }

    public function logout(Request $request) {
        $user = Auth::user();
    
        if ($user) {
            $user->tokens()->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No user is currently authenticated',
            ], 401);
        }
    }
}
