<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}/{test?}', function () {
    return view('welcome');
});
