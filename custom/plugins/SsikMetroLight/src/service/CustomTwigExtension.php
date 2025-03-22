<?php

namespace SsikMetroLight\service;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CustomTwigExtension extends AbstractExtension
{
    private EntityRepository $addressRepository;

    public function __construct(EntityRepository $addressRepository)
    {
        $this->addressRepository = $addressRepository;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('get_customer_addresses', [$this, 'getCustomerAddresses'], ['needs_context' => true]),
        ];
    }

    public function getCustomerAddresses(array $context)
    {
        /** @var SalesChannelContext $salesChannelContext */
        $salesChannelContext = $context['context'] ?? null;
        if (!$salesChannelContext || !$salesChannelContext->getCustomer()) {
            return [];
        }

        $customerId = $salesChannelContext->getCustomer()->getId();

        // Get customer addresses
        $criteria = new \Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria();
        $criteria->addFilter(new \Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter('customerId', $customerId));

        $criteria->addAssociation('country');
        $criteria->addAssociation('countryState');
        $result = $this->addressRepository->search($criteria, $salesChannelContext->getContext());

        return $result->getEntities();
    }
}
