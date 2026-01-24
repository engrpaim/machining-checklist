<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
abstract class Controller
{
     public function store(Request $request)
    {
       dd($request);
    }
}
