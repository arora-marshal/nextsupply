<?php

namespace SsikMetroLight\service;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\Context;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use League\Csv\Reader;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;

class GoogleSheetPriceUpdater
{
    private EntityRepository $productRepository;
    private EntityRepository $productPriceRepository;
    private HttpClientInterface $httpClient;

    private string $googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1miV10l5ap6PPyk0nBvcW1LecVpJqoN9OtihhL0zNcZA/export?format=csv&id=1miV10l5ap6PPyk0nBvcW1LecVpJqoN9OtihhL0zNcZA&gid=0';

    public function __construct(EntityRepository $productRepository,     EntityRepository $productPriceRepository, HttpClientInterface $httpClient)
    {
        $this->productRepository = $productRepository;
        $this->productPriceRepository = $productPriceRepository;
        $this->httpClient = $httpClient;
    }

    public function updatePrices(Context $context): void
    {
        $response = $this->httpClient->request('GET', $this->googleSheetUrl);
        $csvData = str_getcsv($response->getContent(), "\n");
        $data = [];

        foreach ($csvData as $row) {
            $data[] = str_getcsv($row);
        }

        // Skip the header row
        unset($data[0]);

        $updates = [];

        $albertaRuleId = '0195b81721a9716b9c37f53a52ab460a';
        $bcRuleId = '0195bde192ed708398de9cb6e904a11d';
        $otherRuleId = '0195b8194100747681209d5406c354e9';

        foreach ($data as $row) {
            $productNumber = trim($row[0]); // SKU
            $albertaPrice = trim($row[1]);  // Alberta price
            $bcPrice = trim($row[2]);       // British Columbia price

            $product = $this->getProductBySku($productNumber, $context);

            if (!$product) {
                // Skip if product not found
                continue;
            }

            $productId = $product->getId();
            $existingPrices = $product->getPrices()->getElements();

            // Track existing prices by ruleId
            $priceMap = [];
            foreach ($existingPrices as $existingPrice) {
                $priceMap[$existingPrice->getRuleId()] = $existingPrice;
            }

            $priceUpdates = [];

            //  Case 1: Alberta Price
            if (strtoupper($albertaPrice) !== 'NA') {
                if (isset($priceMap[$albertaRuleId])) {
                    // Update existing Alberta price
                    $priceUpdates[] = [
                        'id' => $priceMap[$albertaRuleId]->getId(),
                        "ruleId" => $albertaRuleId,
                        'price' => [
                            [
                                'currencyId' => 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
                                'net' => (float) $albertaPrice,
                                'gross' => (float) $albertaPrice,
                                'linked' => false,
                            ],
                        ],
                    ];
                } else {
                    // Create new Alberta price
                    $priceUpdates[] = [
                        'productId' => $productId,
                        'ruleId' => $albertaRuleId,
                        'price' => [
                            [
                                'currencyId' => 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
                                'net' => (float) $albertaPrice,
                                'gross' => (float) $albertaPrice,
                                'linked' => false,
                            ],
                        ],
                    ];
                }
            } else {
                // If Alberta price is 'NA', remove price if it exists
                if (isset($priceMap[$albertaRuleId])) {

                    $this->productPriceRepository->delete([
                        ['id' => $priceMap[$albertaRuleId]->getId()],
                    ], $context);
                }
            }

            //  Case 2: BC Price
            if (strtoupper($bcPrice) !== 'NA') {
                if (isset($priceMap[$bcRuleId])) {
                    // Update existing BC price
                    $priceUpdates[] = [
                        'id' => $priceMap[$bcRuleId]->getId(),
                        "ruleId" => $bcRuleId,
                        'price' => [
                            [
                                'currencyId' => 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
                                'net' => (float) $bcPrice,
                                'gross' => (float) $bcPrice,
                                'linked' => false,
                            ],
                        ],
                    ];
                } else {
                    // Create new BC price
                    $priceUpdates[] = [
                        'productId' => $productId,
                        'ruleId' => $bcRuleId,
                        'price' => [
                            [
                                'currencyId' => 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
                                'net' => (float) $bcPrice,
                                'gross' => (float) $bcPrice,
                                'linked' => false,
                            ],
                        ],
                    ];
                }
            } else {
                // If BC price is 'NA', remove price if it exists
                if (isset($priceMap[$bcRuleId])) {
                    $this->productPriceRepository->delete([
                        ['id' => $priceMap[$bcRuleId]->getId()],
                    ], $context);
                }
            }

            //  Case 3: Handle Other Rule (optional, if needed)
            if (isset($priceMap[$otherRuleId])) {
                $priceUpdates[] = [
                    'id' => $priceMap[$otherRuleId]->getId(),
                    "ruleId" => $otherRuleId,
                    'price' => [
                        [
                            'currencyId' => 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
                            'net' => strtoupper($albertaPrice) === 'NA' ? (float)$bcPrice : (float) $albertaPrice,
                            'gross' => strtoupper($albertaPrice) === 'NA' ? (float)$bcPrice : (float) $albertaPrice,
                            'linked' => false,
                        ],
                    ],
                ];
            }

            //  Add updates to the list
            if (!empty($priceUpdates)) {
                $updates[] = [
                    'id' => $productId,
                    'prices' => $priceUpdates,
                ];
            }
        }
        //  Apply updates to product prices
        if (!empty($updates)) {
            $this->productRepository->update($updates, $context);
        }
    }

    private function getProductBySku(string $sku, Context $context)
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productNumber', $sku));
        $criteria->addAssociation('prices');
        return $this->productRepository->search($criteria, $context)->first();
    }

    public function updateProductDetails($context, $product, $data)
    {
        $updates[] = [
            'id' => $product->getId(),
            'customFields' => [
                'hide_product' => isset($data['customFields']['hide_product']) ? $data['customFields']['hide_product'] : false
            ]
        ];

        $this->productRepository->update($updates, $context);
    }
}
