<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Swag\PayPal\RestApi\V1\Api\Payment\Transaction\ItemList;

use OpenApi\Attributes as OA;
use Shopware\Core\Framework\Log\Package;
use Swag\PayPal\RestApi\PayPalApiStruct;

#[OA\Schema(
    schema: 'swag_paypal_v1_payment_transaction_item_list_shipping_option',
    properties: [], // so an empty object will be generated
)]
#[Package('checkout')]
class ShippingOption extends PayPalApiStruct
{
}
