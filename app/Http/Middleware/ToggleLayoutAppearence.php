<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class ToggleLayoutAppearence
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}