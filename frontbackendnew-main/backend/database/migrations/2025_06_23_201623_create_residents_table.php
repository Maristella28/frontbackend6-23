<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residents', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('profile_id')->constrained()->onDelete('cascade');
    $table->string('resident_id')->unique();
    $table->string('household_number')->nullable();
    $table->string('first_name');
    $table->string('middle_name')->nullable();
    $table->string('last_name');
    $table->string('name_suffix')->nullable();
    $table->date('birth_date');
    $table->string('birth_place');
    $table->integer('age');
    $table->string('email')->nullable();
    $table->string('contact_number')->nullable();
    $table->enum('sex', ['Male', 'Female']);
    $table->string('civil_status');
    $table->string('religion')->nullable();
    $table->string('full_address');
    $table->integer('years_in_barangay')->nullable();
    $table->string('voter_status')->nullable();
    $table->string('avatar')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('residents');
    }
};
