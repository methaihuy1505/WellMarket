<?php
namespace App\Enums;

enum TargetType: string {
case POST    = 'post';
case MESSAGE = 'message';
case USER    = 'user';
case OTHER   = 'other';
}
