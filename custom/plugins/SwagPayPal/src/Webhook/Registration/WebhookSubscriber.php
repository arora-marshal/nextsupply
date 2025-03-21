<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Swag\PayPal\Webhook\Registration;

use Psr\Log\LoggerInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityDeletedEvent;
use Shopware\Core\Framework\Feature;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SalesChannel\SalesChannelEvents;
use Shopware\Core\System\SystemConfig\Event\BeforeSystemConfigMultipleChangedEvent;
use Shopware\Core\System\SystemConfig\Event\SystemConfigMultipleChangedEvent;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Swag\PayPal\Setting\Service\SettingsSaver;
use Swag\PayPal\Setting\Settings;
use Swag\PayPal\Webhook\WebhookServiceInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * @internal
 */
#[Package('checkout')]
class WebhookSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly SystemConfigService $systemConfigService,
        private readonly WebhookServiceInterface $webhookService,
        private readonly WebhookSystemConfigHelper $webhookSystemConfigHelper,
        private readonly RequestStack $requestStack,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            SalesChannelEvents::SALES_CHANNEL_DELETED => 'removeSalesChannelWebhookConfiguration',
            BeforeSystemConfigMultipleChangedEvent::class => 'checkWebhookBefore',
            SystemConfigMultipleChangedEvent::class => 'checkWebhookAfter',
        ];
    }

    public function removeSalesChannelWebhookConfiguration(EntityDeletedEvent $event): void
    {
        $generalWebhookId = $this->systemConfigService->getString(Settings::WEBHOOK_ID);
        foreach ($event->getIds() as $salesChannelId) {
            $webhookId = $this->systemConfigService->getString(Settings::WEBHOOK_ID, $salesChannelId);

            try {
                if ($webhookId !== $generalWebhookId) {
                    $this->webhookService->deregisterWebhook($salesChannelId);
                }
            } catch (\Throwable $e) {
                $this->logger->error($e->getMessage(), ['error' => $e]);
            }
        }
    }

    /**
     * system-config should be written by {@see SettingsSaver} only, which checks the webhook on its own.
     * Just in case new/changed credentials will be saved via the normal system config save route.
     */
    public function checkWebhookBefore(BeforeSystemConfigMultipleChangedEvent $event): void
    {
        $routeName = (string) $this->requestStack->getMainRequest()?->attributes->getString('_route');

        if (!\str_contains($routeName, 'api.action.core.save.system-config')) {
            return;
        }

        if (Feature::isActive('PAYPAL_SETTINGS_TWEAKS')) {
            /** @var array<string, array<string, mixed>> $config */
            $config = $event->getConfig();
            $this->webhookSystemConfigHelper->checkWebhookBefore($config);
        }
    }

    /**
     * system-config should be written by {@see SettingsSaver} only, which checks the webhook on its own.
     * Just in case new/changed credentials will be saved via the normal system config save route.
     */
    public function checkWebhookAfter(SystemConfigMultipleChangedEvent $event): void
    {
        $routeName = (string) $this->requestStack->getMainRequest()?->attributes->getString('_route');

        if (!\str_contains($routeName, 'api.action.core.save.system-config')) {
            return;
        }

        if (Feature::isActive('PAYPAL_SETTINGS_TWEAKS')) {
            $this->webhookSystemConfigHelper->checkWebhookAfter(\array_keys($event->getConfig()));
        }
    }
}
