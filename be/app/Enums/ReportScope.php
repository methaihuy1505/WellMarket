<?php
namespace App\Enums;

enum ReportScope: string {
case POST    = 'post';
case MESSAGE = 'message';
case USER    = 'user';
case BOTH    = 'both';
}
