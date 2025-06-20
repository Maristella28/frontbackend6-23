<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized, your role is ' . $user->role], 403);
        }

        $users = User::all();

        return response()->json([
            'message' => 'Welcome, Admin!',
            'users' => $users,
            'current_user' => $user,
        ]);
    }
}


