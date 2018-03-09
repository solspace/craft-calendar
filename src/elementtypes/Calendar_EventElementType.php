<?php

namespace Solspace\Calendar;

use Solspace\Calendar\Library\DateTimeUTC;
use Solspace\Calendar\Library\RecurrenceHelper;

class Calendar_EventElementType extends BaseElementType
{
    /**
     * Returns the element type name.
     *
     * @return string
     */
    public function getName()
    {
        return Craft::t('Calendar Events');
    }

    /**
     * Returns whether this element type has content.
     *
     * @return bool
     */
    public function hasContent()
    {
        return true;
    }

    /**
     * @return bool
     */
    public function isLocalized()
    {
        return true;
    }

    /**
     * Returns whether this element type has titles.
     *
     * @return bool
     */
    public function hasTitles()
    {
        return true;
    }

    /**
     * @inheritDoc IElementType::hasStatuses()
     *
     * @return bool
     */
    public function hasStatuses()
    {
        return true;
    }

    /**
     * Returns this element type's sources.
     *
     * @param string|null $context
     *
     * @return array|false
     */
    public function getSources($context = null)
    {
        $sources = array(
            '*' => array(
                'label' => Craft::t('All events'),
            ),
        );

        foreach (craft()->calendar_calendars->getAllAllowedCalendars() as $calendar) {
            $key = 'calendar:' . $calendar->id;

            $sources[$key] = array(
                'label'    => $calendar->name,
                'criteria' => array('calendarId' => $calendar->id),
            );
        }

        return $sources;
    }

    /**
     * @param null $source
     *
     * @return array
     */
    public function getAvailableActions($source = null)
    {
        $deleteAction = craft()->elements->getAction('Delete');
        $deleteAction->setParams(
            array(
                'confirmationMessage' => Craft::t('Are you sure you want to delete the selected events?'),
                'successMessage'      => Craft::t('Events deleted.'),
            )
        );
        $actions[] = $deleteAction;

        $setStatusAction              = craft()->elements->getAction('SetStatus');
        $setStatusAction->onSetStatus = function (Event $event) {
            if ($event->params['status'] == BaseElementModel::ENABLED) {
                // Set a Post Date as well
                craft()->db->createCommand()->update(
                    'entries',
                    array('postDate' => DateTimeHelper::currentTimeForDb()),
                    array('and', array('in', 'id', $event->params['elementIds']), 'postDate is null')
                );
            }
        };
        $actions[]                    = $setStatusAction;

        return $actions;
    }

    /**
     * Returns the attributes that can be shown/sorted by in table views.
     *
     * @param string|null $source
     *
     * @return array
     */
    public function defineTableAttributes($source = null)
    {
        $attributes = array(
            'title'       => Craft::t('Title'),
            'calendar'    => Craft::t('Calendar'),
            'startDate'   => Craft::t('Start Date'),
            'endDate'     => Craft::t('End Date'),
            'allDay'      => Craft::t('All Day'),
            'rrule'       => Craft::t('Repeats'),
            'author'      => Craft::t('Author'),
            'dateCreated' => Craft::t('Post Date'),
        );


        // Hide Author from Craft Personal/Client
        if (craft()->getEdition() != Craft::Pro) {
            unset($attributes['author']);
        }

        if (strpos($source, 'calendar:') !== false) {
            unset($attributes['calendar']);
        }

        return $attributes;
    }

    /**
     * @inheritDoc IElementType::defineSortableAttributes()
     *
     * @return array
     */
    public function defineSortableAttributes()
    {
        $sortableAttributes = array(
            'title'       => Craft::t('Title'),
            'calendar'    => Craft::t('Calendar'),
            'startDate'   => Craft::t('Start Date'),
            'endDate'     => Craft::t('End Date'),
            'allDay'      => Craft::t('All Day'),
            'rrule'       => Craft::t('Repeats'),
            'author'      => Craft::t('Author'),
            'dateCreated' => Craft::t('Post Date'),
        );

        // Hide Author from Craft Personal/Client
        if (craft()->getEdition() != Craft::Pro) {
            unset($sortableAttributes['author']);
        }

        return $sortableAttributes;
    }

    /**
     * Returns the table view HTML for a given attribute.
     *
     * @param BaseElementModel $element
     * @param string           $attribute
     *
     * @return string
     */
    public function getTableAttributeHtml(BaseElementModel $element, $attribute)
    {
        /** @var Calendar_EventModel $element */
        switch ($attribute) {
            case 'author': {
                $author = $element->getAuthor();

                if ($author) {
                    return craft()->templates->render(
                        '_elements/element',
                        array(
                            'element' => $author,
                        )
                    );
                }

                return '';
            }

            case 'calendar': {
                return sprintf(
                    '<div style="white-space: nowrap;"><span class="color-indicator" style="background-color: %s;"></span>%s</div>',
                    $element->getCalendar()->color,
                    $element->getCalendar()->name
                );
            }

            case 'startDate': {
                return $element->getStartDateUTC()->localeDate();
            }

            case 'endDate': {
                return $element->getEndDateUTC()->localeDate();
            }

            case 'allDay': {
                return $element->$attribute ? 'Yes' : 'No';
            }

            case 'rrule': {
                return $element->repeats() ? 'Yes' : 'No';
            }

            default: {
                return parent::getTableAttributeHtml($element, $attribute);
            }
        }
    }

    /**
     * Defines any custom element criteria attributes for this element type.
     *
     * @return array
     */
    public function defineCriteriaAttributes()
    {
        return array(
            'calendar'             => AttributeType::Mixed,
            'calendarId'           => AttributeType::Mixed,
            'startDate'            => AttributeType::Mixed,
            'endDate'              => AttributeType::Mixed,
            'dateRangeStart'       => AttributeType::DateTime,
            'dateRangeEnd'         => AttributeType::DateTime,
            'allDay'               => AttributeType::Bool,
            'authorId'             => AttributeType::Number,
            'allowedCalendarsOnly' => array(AttributeType::Bool, 'default' => true),
            'order'                => array(AttributeType::String, 'default' => 'ce.startDate asc'),
            'loadOccurrences'      => array(AttributeType::Bool, 'default' => true),
        );
    }

    /**
     * Modifies an element query targeting elements of this type.
     *
     * @param DbCommand            $query
     * @param ElementCriteriaModel $criteria
     *
     * @return mixed
     */
    public function modifyElementsQuery(DbCommand $query, ElementCriteriaModel $criteria)
    {
        $query
            ->addSelect(
                'ce.calendarId,
                cc.name AS calendar,
                ce.authorId,
                ce.startDate,
                ce.endDate,
                ce.allDay,
                ce.rrule,
                ce.freq,
                ce.interval,
                ce.count,
                ce.until,
                ce.byDay,
                ce.byMonth,
                ce.byMonthDay,
                ce.byYearDay,
                users.username AS author'
            )
            ->join('calendar_events ce', 'ce.id = elements.id')
            ->leftJoin('users users', 'users.id = ce.authorId')
            ->join('calendar_calendars cc', 'cc.id = ce.calendarId');

        if ($criteria->allowedCalendarsOnly) {
            $isAdmin      = PermissionsHelper::isAdmin();
            $canManageAll = PermissionsHelper::checkPermission(PermissionsHelper::PERMISSION_EVENTS_FOR_ALL);

            if (!$isAdmin && !$canManageAll) {
                $allowedCalendarIds = PermissionsHelper::getNestedPermissionIds(
                    PermissionsHelper::PERMISSION_EVENTS_FOR
                );
                $query->andWhere(DbHelper::parseParam('ce.calendarId', $allowedCalendarIds, $query->params));
            }
        }

        if ($criteria->calendarId && $criteria->calendarId != "*") {
            $query->andWhere(DbHelper::parseParam('ce.calendarId', $criteria->calendarId, $query->params));
        }

        if ($criteria->calendar && $criteria->calendar != "*") {
            $query->andWhere(DbHelper::parseParam('cc.handle', $criteria->calendar, $query->params));
        }

        if ($criteria->startDate) {
            $query->andWhere(DbHelper::parseDateParam('ce.startDate', $criteria->startDate, $query->params));
        }

        if ($criteria->dateRangeStart) {
            $dateRangeStartUTC = new DateTimeUTC();
            $dateRangeStartUTC->setTimestamp($criteria->dateRangeStart->getTimestamp());

            $endDateRule = DbHelper::parseParam(
                'ce.endDate',
                '>= ' . $dateRangeStartUTC->mySqlDateTime(),
                $query->params
            );
            $untilRule   = DbHelper::parseParam(
                'ce.until',
                '>= ' . $dateRangeStartUTC->mySqlDateTime(),
                $query->params
            );

            $query->andWhere(
                '(ce.rrule IS NULL AND ' . $endDateRule . ') 
                OR (ce.rrule IS NOT NULL AND ce.until IS NOT NULL AND ' . $untilRule . ')
                OR (ce.rrule IS NOT NULL AND ce.until IS NULL)
                OR (ce.freq = "' . RecurrenceHelper::SELECT_DATES . '")'
            );
        }

        if ($criteria->dateRangeEnd) {
            $dateRangeEndUTC = new DateTimeUTC();
            $dateRangeEndUTC->setTimestamp($criteria->dateRangeEnd->getTimestamp());

            $startDateRule = DbHelper::parseParam(
                'ce.startDate',
                '<= ' . $dateRangeEndUTC->mySqlDateTime(),
                $query->params
            );
            $query->andWhere($startDateRule . ' OR ce.freq = "' . RecurrenceHelper::SELECT_DATES . '"');
        }

        if ($criteria->endDate) {
            $query->andWhere(DbHelper::parseDateParam('ce.endDate', $criteria->endDate, $query->params));
        }

        if ($criteria->allDay) {
            $query->andWhere(DbHelper::parseParam('ce.allDay', $criteria->allDay, $query->params));
        }

        if ($criteria->authorId) {
            $query->andWhere(DbHelper::parseParam('ce.authorId', $criteria->authorId, $query->params));
        }

        return true;
    }

    /**
     * Populates an element model based on a query result.
     *
     * @param array $row
     *
     * @return array
     */
    public function populateElementModel($row)
    {
        return Calendar_EventModel::populateModel($row);
    }
}
