<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Carbon;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('adjustment', function (Blueprint $table) {
            $table->unsignedBigInteger('datalist_id');
            $table->unsignedBigInteger('adjustment');
            $table->date('date');
            $table->integer('batch_number')->require();
            $table->string('process_number')->require();
            $table->string('process')->require();
            $table->string('machine')->require();
            $table->string('model_name')->require();
            $table->string('lot_number')->require();
            $table->string('operator')->require();
            $table->string('checked_by')->require();
            $table->string('width')->nullable();
            $table->string('length')->nullable();
            $table->string('thickness')->nullable();
            $table->string('height')->nullable();
            $table->string('chamfer')->nullable();
            $table->string('center_off')->nullable();
            $table->string('angularity')->nullable();
            $table->string('perpen')->nullable();
            $table->string('flatness')->nullable();
            $table->string('deffect')->require();
            $table->string('adjustment_made')->require();
            $table->string('tb_no')->require();
            $table->double('pt_1')->require();
            $table->double('pt_2')->require();
            $table->double('pt_3')->require();
            $table->double('pt_4')->require();
            $table->double('pt_5')->require();
            $table->double('chamfer_point')->nullable();
            $table->double('center_off_point')->nullable();
            $table->double('angularity_point')->nullable();
            $table->double('perpen_point')->nullable();
            $table->double('flatness_point')->nullable();
            $table->string('appearance_checking')->require();
            $table->string('final_result')->require();
            $table->timestamps();

            $table->index(['lot_number']);
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
        Schema::dropIfExists('adjustment');
    }
};