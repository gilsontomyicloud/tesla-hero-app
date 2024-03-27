<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    use HttpResponses, HasApiTokens;

    public function login(LoginUserRequest $request){
        $request->validated($request->all());

        if(Auth::attempt($request->only(['email', 'password']))){
            return $this->error('','Invalid credentails.',404);
        }

        try {
            $user = User::where('email', $request->username)->first();

            return $this->success([
                'user' => $user,
                'token' => $user->createToken('API Token '.$user->name)->plainTextToken
            ]);
        } catch(Throwable $ex) {
            return $this->error('', $ex->getMessage(), 404);
        }
    }
}
