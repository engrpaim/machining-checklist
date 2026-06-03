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
        Schema::create('slicing',function(Blueprint $table){
            $table->unsignedBigInteger('datalist_id')->nullable();
            $table->string('datalist_lot_number')->nullable();
            $table->string('model')->nullable();
            $table->string('operator_name')->nullable();
            $table->string('checker')->nullable();
            $table->string('shift')->nullable();
            $table->string('staff_engineer')->nullable();
            $table->integer('batch_number')->nullable(); 
            $table->string('machine_number')->nullable();
            $table->string('pattern')->nullable();
            $table->string('cutting_speed')->nullable();
            $table->string('no_of_pass')->nullable();
            $table->string('motor_load')->nullable();
            $table->string('micrometer_serial_number')->nullable();
            $table->string('checking_condition')->nullable();
            $table->string('no_of_tb_cycle')->nullable();
            $table->string('perpern_serial_number')->nullable();
            $table->string('comparator_serial_number')->nullable();
            $table->json('perpendicularity')->nullable();
            $table->json('parallelism')->nullable();
            $table->enum('status', ['preparing', 'prepared', 'measuring', 'measured', 'approved'])->default('preparing');
            $table->timestamps();
            $table->index(['datalist_lot_number', 'updated_at','model']);

            //Composite Foreign Key
            $table->foreign(['datalist_id'])
                ->references(['id'])
                ->on('datalists')
                ->onDelete('cascade'); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('slicing');
    }
};
