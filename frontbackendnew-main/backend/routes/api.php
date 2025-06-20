<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Public API Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']); // returns Bearer token

/*
|--------------------------------------------------------------------------
| Protected API Routes (Require Sanctum Bearer Token Authentication)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // ✅ Logout (Revoke Token or delete current access token)
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ Get authenticated user info
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // ✅ Admin dashboard data
    Route::get('/admin/dashboard', [AdminController::class, 'index']);

    // ✅ Delete a specific user
    Route::delete('/user/{id}', [AuthController::class, 'deleteUser']);

    // ✅ Add more authenticated API routes here
});
