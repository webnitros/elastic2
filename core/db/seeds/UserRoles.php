<?php

use Phinx\Seed\AbstractSeed;
use Vesp\Models\UserRole;

class UserRoles extends AbstractSeed
{
    public function run(): void
    {
        $roles = [
            'Administrator' => [
                'scope' => ['profile', 'users'],
            ],
            'User' => [
                'scope' => ['profile'],
            ],
        ];

        foreach ($roles as $title => $data) {
            if (!$group = UserRole::query()->where('title', $title)->first()) {
                $group = new UserRole(['title' => $title]);
            }
            $group->fill($data);
            $group->save();
        }
    }
}
