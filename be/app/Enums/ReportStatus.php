<?php
namespace App\Enums;

enum ReportStatus: string {
case PENDING     = 'pending';
case IN_PROGRESS = 'in_progress';
case REVIEWED    = 'reviewed';
case DISMISSED   = 'dismissed';
}
