<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $fillable = [
        'full_name',
        'email_address',
        'phone_number',
    ];
}
