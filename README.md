# Solspace Calendar plugin for Craft CMS 5.x

The most powerful event management and calendaring plugin for Craft!

![Calendar icon](packages/plugin/src/icon.svg)

## Overview

Calendar is an effective event management and calendaring plugin. Its user-friendly interface simplifies the creation of events with complex recurring rules and exclusions.

## Resaving events

Resave all Calendar events with `php craft calendar/events/resave`, or limit the operation to one calendar by handle or ID:

```sh
php craft calendar/events/resave --calendar=holidays
php craft calendar/events/resave --calendar=17
```

The calendar filter can be combined with existing options such as `--site`, `--elementId`, `--status`, `--offset`, and `--limit`. An unknown or empty calendar value stops the command with an error.

## Helpful Links

- [Buy Calendar at the Plugin Store](https://plugins.craftcms.com/calendar)
- [Calendar Documentation](https://docs.solspace.com/craft/calendar/v5/)
- [Report an Issue](https://github.com/solspace/craft-calendar/issues)
- [Feature Requests](https://github.com/solspace/craft-calendar/discussions)
- [Ask a Question](https://github.com/solspace/craft-calendar/discussions)
- [Private Support Ticket](https://docs.solspace.com/support/)
- [Craft Stack Exchange](https://craftcms.stackexchange.com/questions/tagged/solspace)
