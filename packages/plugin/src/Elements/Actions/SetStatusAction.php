<?php

namespace Solspace\Calendar\Elements\Actions;

use craft\base\Element;
use Solspace\Calendar\Calendar;
use craft\elements\actions\SetStatus;
use Solspace\Calendar\Elements\Event;
use craft\elements\db\ElementQueryInterface;
use Solspace\Calendar\Library\CalendarPermissionHelper;

class SetStatusAction extends SetStatus
{
	/**
	 * Performs the action on any elements that match the given criteria.
	 */
	public function performAction(ElementQueryInterface $query): bool
	{
		$failCount = 0;

		$totalElements = $query->count();

		$isLocalized = Event::isLocalized() && \Craft::$app->getIsMultiSite();

		/** @var Event $element */
		foreach ($query->all() as $element) {
			if (CalendarPermissionHelper::canEditEvent($element)) {
				switch ($this->status) {
					case self::ENABLED:
						// Skip if there's nothing to change
						if ($element->enabled && $element->getEnabledForSite()) {
							continue 2;
						}

						$element->enabled = true;
						$element->setEnabledForSite(true);
						$element->setScenario(Element::SCENARIO_LIVE);
						break;

					case self::DISABLED:
						// Is this a multi-site element?
						if ($isLocalized && count($element->getSupportedSites()) !== 1) {
							// Skip if there's nothing to change
							if (! $element->getEnabledForSite()) {
								continue 2;
							}

							$element->setEnabledForSite(false);
						} else {
							// Skip if there's nothing to change
							if (! $element->enabled) {
								continue 2;
							}

							$element->enabled = false;
						}
						break;
				}

				if (Calendar::getInstance()->events->saveEvent($element) === false) {
					// Validation error
					$failCount++;
				}

			// If we wanted to inform the user, some elements were not updated due to permissions, we could uncomment the following lines
			//} else {
			//	$failCount++;
			}
		}

		// Did all of them fail?
		if ($failCount === $totalElements) {
			if ($totalElements === 1) {
				$this->setMessage(\Craft::t('app', 'Could not update status due to a validation error.'));
			} else {
				$this->setMessage(\Craft::t('app', 'Could not update statuses due to validation errors.'));
			}

			return false;
		}

		if ($failCount !== 0) {
			$this->setMessage(\Craft::t('app', 'Status updated, with some failures due to validation errors.'));
		} else {
			if ($totalElements === 1) {
				$this->setMessage(\Craft::t('app', 'Status updated.'));
			} else {
				$this->setMessage(\Craft::t('app', 'Statuses updated.'));
			}
		}

		return true;
	}
}
