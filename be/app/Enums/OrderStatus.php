<?php
namespace App\Enums;

enum OrderStatus: string {
case CREATED   = 'created';
case COMPLETED = 'completed';
case CANCELED  = 'canceled';
}
