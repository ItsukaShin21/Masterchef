<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CreateUserCommand extends Command
{
    protected $signature = 'user:create {username} {email} {password} {role}';

    protected $description = 'Create a new user with the given details';

    public function handle()
    {
        $username = $this->argument('username');
        $email = $this->argument('email');
        $password = Hash::make($this->argument('password'));
        $role = $this->argument('role');

        $user = new User([
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'role' => $role,
        ]);

        $user->save();

        $this->info("User {$username} created successfully!");
    }
}
