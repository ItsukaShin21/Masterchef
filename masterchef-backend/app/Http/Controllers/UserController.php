<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function add(Request $request) {
        $credentials = $request->validate([
            'username' => 'required|max:16|min:5',
            'password' => 'required|max:16|min:8',
            'email' => 'required|email|unique:users',
        ]);

        $user = User::create([
            'username' => $credentials['username'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
        ]);

        return response()->json(['status' => 'success'], 201);
    }
}
