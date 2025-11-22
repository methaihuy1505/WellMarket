<?php
namespace App\Enums;

enum PostStatus: string {
case ACTIVE           = 'active';
case HIDDEN           = 'hidden';
case WAITING_APPROVAL = 'waiting_approval';
case REJECTED         = 'rejected';
case NEED_TO_EXTEND   = 'need_to_extend';
}
