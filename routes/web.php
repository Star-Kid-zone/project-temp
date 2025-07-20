<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}/{test?}/{again?}', function () {
    return view('welcome');
});
