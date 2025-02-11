<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class appname extends Controller
{
    public function show()
    {
        $title = 'Sternenzelt';
        return view('Soluciones en Ingeniería y Software', compact('title'));
    }
}