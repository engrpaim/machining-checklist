<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('models', function (Blueprint $table) {
            $table->json('slicing_om_specs')->nullable();
            $table->json('lapping_om_specs')->nullable();
            $table->json('barelling_om_specs')->nullable();
            $table->json('cghl_om_specs')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('models', function (Blueprint $table) {
            $table->dropColumn(['cghl_om_specs','barelling_om_specs','lapping_om_specs','slicing_om_specs']);
        });
    }
};
