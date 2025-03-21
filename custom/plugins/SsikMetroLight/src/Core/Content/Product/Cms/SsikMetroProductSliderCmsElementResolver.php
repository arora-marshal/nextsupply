<?php declare(strict_types=1);

namespace SsikMetroLight\Core\Content\Product\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Product\Cms\ProductSliderCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\DataResolver\Element\CmsElementResolverInterface;

class SsikMetroProductSliderCmsElementResolver implements CmsElementResolverInterface {

  public function __construct(
    private readonly CmsElementResolverInterface $elementResolver
  ) {
  }

  public function getType(): string
  {
    return $this->elementResolver->getType();
  }

  public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
  {
    $criteriaCollection = $this->elementResolver->collect($slot, $resolverContext);
    foreach ($criteriaCollection as $productCriteria) {
        foreach ($productCriteria as $criteria) {
            $criteria->addAssociation('media');
            $criteria->addAssociation('manufacturer');
        }
    }
    return $criteriaCollection;
  }

  public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
  {
    $this->elementResolver->enrich($slot, $resolverContext, $result);
  }

}
