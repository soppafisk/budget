<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use Auth;

class UserController extends Controller
{
    public function setColor(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        if ($user == Auth::user()) {
            $color = $request->input('user_color');
            $user->color = $color;
            $user->save();
        }

        return back();
    }
}
