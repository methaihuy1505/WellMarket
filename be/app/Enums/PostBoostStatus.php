<?php
namespace App\Enums;

enum PostBoostStatus: string {
case PENDING   = 'pending';
case ACTIVE    = 'active';
case EXPIRED   = 'expired';
case CANCELLED = 'canceled';
}
