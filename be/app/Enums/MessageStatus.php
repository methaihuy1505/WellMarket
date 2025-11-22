<?php
namespace App\Enums;

enum MessageStatus: string {
case SENDING = 'sending';
case SENT    = 'sent';
case FAILED  = 'failed';
case DELETED = 'deleted';
}
