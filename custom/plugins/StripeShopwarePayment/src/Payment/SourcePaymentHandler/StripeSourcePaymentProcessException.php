<?php
/*
 * Copyright (c) Pickware GmbH. All rights reserved.
 * This file is part of software that is released under a proprietary license.
 * You must not copy, modify, distribute, make publicly available, or execute
 * its contents or parts thereof without express permission by the copyright
 * holder, unless otherwise permitted by law.
 */

declare(strict_types=1);

namespace Stripe\ShopwarePayment\Payment\SourcePaymentHandler;

use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionEntity;
use Shopware\Core\Checkout\Payment\PaymentException;
use Stripe\Exception\ApiErrorException;
use Stripe\Source;

class StripeSourcePaymentProcessException
{
    public static function sourceCreationFailed(
        OrderTransactionEntity $orderTransaction,
        ApiErrorException $apiException
    ) {
        return PaymentException::asyncProcessInterrupted(
            $orderTransaction->getId(),
            sprintf(
                "The Stripe source could not be created. Additional information:\n%s",
                $apiException->getMessage(),
            ),
        );
    }

    public static function invalidSourceRedirect(OrderTransactionEntity $orderTransaction, Source $source)
    {
        return PaymentException::asyncProcessInterrupted(
            $orderTransaction->getId(),
            sprintf(
                'The redirect for Stripe source %s is invalid (redirect status: "%s").',
                $source->id,
                $source->redirect->status,
            ),
        );
    }
}
