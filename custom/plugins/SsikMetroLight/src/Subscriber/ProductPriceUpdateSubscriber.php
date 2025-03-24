<?php

namespace SsikMetroLight\Subscriber;

use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use SsikMetroLight\service\GoogleSheetPriceUpdater;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductPriceUpdateSubscriber implements EventSubscriberInterface
{
    private GoogleSheetPriceUpdater $priceUpdater;
    private bool $isProcessing = false;
    private bool $isListProcessing = false;

    public function __construct(GoogleSheetPriceUpdater $priceUpdater)
    {
        $this->priceUpdater = $priceUpdater;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoaded',
            ProductEvents::PRODUCT_LOADED_EVENT => 'onProductLoaded',
        ];
    }

    private function getCurrentRuleId(Context $context): ?string
    {
        $activeRuleIds = $context->getRuleIds(); // Get all active rule IDs

        // Check for known rule IDs in the active rule list
        $ruleMap = [
            '0195b81721a9716b9c37f53a52ab460a', // Alberta Rule ID
            '0195bde192ed708398de9cb6e904a11d', // BC Rule ID
        ];

        // Find the first matching rule
        foreach ($activeRuleIds as $ruleId) {
            if (in_array($ruleId, $ruleMap)) {
                return $ruleId;
            }
        }

        return null; // No matching rule found
    }

    public function updateProduct($salesChannelContext, $product)
    {
        $prices = $product->getPrices()?->getElements();
        $filteredPrices = [];
        $context = $salesChannelContext->getContext();
        $currentRuleId = $this->getCurrentRuleId($context);
        $customer = $salesChannelContext->getCustomer();

        if ($prices) {
            foreach ($prices as $price) {
                // Filter the price for the current rule
                if ($price->getRuleId() === $currentRuleId) {
                    $filteredPrices[] = $price;
                }
            }
        }
        //  Hide product if no price exists for the current rule
        if (empty($filteredPrices) && !empty($customer)) {
            $data['customFields']['hide_product'] = true;

            $this->priceUpdater->updateProductDetails($context, $product, $data);

            throw new NotFoundHttpException('This product is not available for the selected conditions.');
        } else {
            $data['customFields']['hide_product'] = false;

            $this->priceUpdater->updateProductDetails($context, $product, $data);
        }
    }

    public function onProductPageLoaded(ProductPageLoadedEvent $event): void
    {
        if ($this->isProcessing) {
            return; // Exit to prevent recursion
        }
        $salesChannelContext = $event->getSalesChannelContext();
        $this->isProcessing = true;
        $product = $event->getPage()->getProduct(); // Correct product

        $this->updateProduct($salesChannelContext, $product);

        $this->isProcessing = false; // Reset the guard
    }

    public function onProductLoaded(EntityLoadedEvent $event): void
    {
        if ($this->isListProcessing) {
            return; // Exit to prevent recursion
        }
        $this->isListProcessing = true;

        $context = $event->getContext();
        $currentRuleId = $this->getCurrentRuleId($context);

        // read sheet to update prices
        $this->priceUpdater->updatePrices($context);

        // update once have updated prices from sheet
        foreach ($event->getEntities() as $product) {
            $prices = $product->getPrices()?->getElements();
            $filteredPrices = [];

            if ($prices) {
                foreach ($prices as $price) {
                    // Filter the price for the current rule
                    if ($price->getRuleId() === $currentRuleId) {
                        $filteredPrices[] = $price;
                    }
                }
            }
            //  Hide product if no price exists for the current rule
            if (empty($filteredPrices)) {
                $data['customFields']['hide_product'] = true;
                $this->priceUpdater->updateProductDetails($context, $product, $data);
            } else {
                $data['customFields']['hide_product'] = false;
                $this->priceUpdater->updateProductDetails($context, $product, $data);
            }
        }

        $this->isListProcessing = false; // Reset the guard

    }
}
