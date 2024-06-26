<?php

namespace App\Exceptions;

use App\Traits\HttpResponses;
use BadMethodCallException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    use HttpResponses;

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return $this->error('', 'This method is not allowed for the requested route',404);
            }
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return $this->error('', 'This route is unavailable',404);
            }
        });

        $this->renderable(function (BadMethodCallException $e, $request) {
            if ($request->is('api/*')) {
                return $this->error('', 'This request method is not allowed for this route', 404);
            }
        });
    }
}
