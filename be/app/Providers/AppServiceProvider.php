<?php
namespace App\Providers;

use App\Services\FileService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Post;
use App\Models\User;
use App\Models\Message;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //File Service Binding
        $this->app->singleton(FileService::class, function ($app) {
            return new FileService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Relation::morphMap([
            'post'    => Post::class,
            'user'    => User::class,
            'message' => Message::class,
            
        ]);
    }
}