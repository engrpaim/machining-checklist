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
         Schema::table('cgh_models', function (Blueprint $table) {
            $table->string('process_number')->nullable();
            $table->string('om_specs')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cgh_models', function (Blueprint $table) {
             $table->dropColumn(['process_number', 'om_specs']);
        });
    }
};
