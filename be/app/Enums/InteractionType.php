<?php
namespace App\Enums;

enum InteractionType: string {
case FAVORITE = 'favorite';
case REPORT   = 'report';
case FEEDBACK = 'feedback';
}
