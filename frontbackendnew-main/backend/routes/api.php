<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ResidentProfileController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ResidentController;
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

    // 🔐 Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::middleware('auth:sanctum')->patch('/user/update-login-status', function (Request $request) {
        $user = $request->user();
        $user->has_logged_in = true;
        $user->save();

        return response()->json(['message' => 'Login status updated']);
    });
    // 🧾 Admin Routes
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::delete('/user/{id}', [AuthController::class, 'deleteUser']);

    // 👤 Resident Profile Setup (First-Time Login)
    Route::post('/residents/complete-profile', [ResidentProfileController::class, 'store']);    

    // Get profile of authenticated user
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return $request->user()->profile;
});

// Update profile
Route::put('/profile/update', [ResidentProfileController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('profile'); // 🛠 Load the related profile
});

Route::middleware(['auth:sanctum', 'admin'])->post('/admin/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('announcements', AnnouncementController::class);
});

Route::patch('announcements/{announcement}/toggle', [AnnouncementController::class, 'toggleStatus']);

Route::get('/admin/residents', [ResidentProfileController::class, 'index']);

});
