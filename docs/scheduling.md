# Scheduling calendars

Choose **Events** or **Scheduling** at the top of New Calendar. Existing calendars remain Events. A calendar represents one bookable resource, such as a room or consultant. Empty calendars can change type; review templates and integrations that use the calendar before switching. The type selector is locked while any events or bookings exist, including items in Trash and bookings in any status. Saves and project-config changes enforce the same rule. Create a new calendar to use a different type without affecting existing records; changing type does not convert events into bookings or vice versa.

Scheduling calendars have weekly opening periods, date exceptions (closed, replacement hours, or blocked times), duration, start increments, a gap after bookings, notice, and an advance booking window. A closed date wins over replacement hours. Multiple periods support lunch breaks. Empty weekly hours keep all weekdays closed; replacement hours can still open a particular date.

Defaults: Active, no seasonal limits, 8am–9pm each day, 30-minute bookings, 15-minute start increments, no buffer or minimum notice, a 90-day booking window, no overlaps, guest requests disabled, and approval required. The scheduling timezone handles daylight saving changes; bookings are stored in UTC. The appointment and its buffer must fit inside the opening period. Overlap permission applies to bookings, not holiday closures or blocked periods, and has no capacity limit.


Use **Active** to stop new bookings for a resource. **Available From** and **Available Until** optionally limit bookable dates; both are inclusive and use the scheduling timezone. Visitors can book dates within a future season ahead of time, subject to the advance window and minimum notice. Inactive resources and resources whose final date has passed disappear from the public chooser. Existing bookings are retained: staff can review them, edit their details, decline, cancel, or delete them. Moving, confirming, or restoring a reservation must respect the active state and season. Changing these settings does not automatically cancel or notify existing customers.

## Control panel

**Bookings** appears when the current user can manage at least one Scheduling calendar. Booking permissions are independent of event permissions and can be granted globally or per calendar. The list supports customer search, calendar/status filters, and pagination. Use **Sort by** or click a column heading to sort by customer, calendar, booking time, submitted date, last updated date, or status. **Booking Time** is the requested or confirmed appointment time in the calendar’s timezone. **Submitted** is when the booking was created; **Last Updated** is when it was most recently saved, including status changes. These two audit timestamps use the control-panel timezone. Click the same heading again to reverse the order. Sorting applies to all matching bookings and stays selected through filtering and pagination. The Schedule view provides Day/Week views and dragging to reschedule, without FullCalendar Scheduler. Clicking a booking opens its editor. Decline or cancel from the status selector.

Staff with booking management permission can change status directly in the list; changes save automatically with a saving indicator and confirmation. Failed changes restore the previous selection and show the error. Inline changes use the same availability checks, status attribution, and notifications as the booking editor.

Calendar and status filters update the list immediately. Customer search updates after a short typing pause, without reloading the page or moving focus. Changing filters resets pagination; Clear removes all three filters.

Use the delete button in the list or booking editor to move a booking to **Trash**. To act on multiple bookings, select the row checkboxes and choose **Move to Trash** or **Restore** in the footer’s gear menu. The header checkbox selects only the current page (up to 50 bookings); changing filters, sorting, or pages clears the selection. In the active list, **Set status** beside the gear menu applies Requested, Confirmed, Declined, or Cancelled to the selected bookings and saves automatically. Each change uses normal booking validation, status attribution, and notifications; an unavailable confirmation keeps its previous status and remains selected with an explanation. Bookings already in the chosen status are not saved again or sent another notification. Bulk deletion uses one confirmation modal. Each booking uses the native element lifecycle; if an individual action is blocked, the other selected bookings can still succeed, and the failed bookings remain selected with an explanation for retry. Deletion uses Craft’s element lifecycle and requires booking management permission for the calendar. Trashed bookings disappear from the schedule and release reserved time, while retaining customer details, custom fields, and status history. Choose **Trash** in the list’s view dropdown to find and restore them. Restoration rechecks the calendar’s current availability and booking rules; a conflicting booking remains in Trash. Restoring preserves its status and attribution. Craft’s garbage collection and `softDeleteDuration` setting control how long deleted bookings remain recoverable; permanent element deletion also removes the related booking database row.

Bookings are separate Craft elements and have one shared custom field layout, configured under **Bookings → Booking fields**. Name, email, times, status, and notes are built in. Guest-visible fields are explicitly selected from simple text, number, dropdown, radio, and checkbox fields; other custom fields remain private. Save new layout fields before selecting them for guest use.

The Bookings, Schedule, and Booking Fields pages use Craft’s standard left sidebar. In the schedule, click an available start time to open a new booking with that slot selected. Shaded times cannot be selected. Opening hours, exceptions, booking duration, buffers, and confirmed reservations determine available slots; the overlap setting is respected. Staff retain access to historical dates and are not limited by the guest notice or advance window. Availability is checked again when opening the editor and saving.

Schedule hover previews span the full booking duration. Undo and Redo beside New Booking use the same controls and shortcuts as Calendar Overview. They track up to 50 saved moves in the current browser tab, per user and calendar, with server snapshots retained for two hours. Undo and redo preserve booking details and status attribution, recheck permissions and current availability, and refuse to overwrite a later time or status change. New moves clear the redo stack.

The booking editor offers a date picker and available time slots instead of free-form start/end inputs. New bookings default to the next available slot within the booking window. Editing preserves the booking’s existing duration and excludes its own reservation when calculating availability. Staff can select historical dates; guest notice and advance limits apply to the public form. Availability is checked again when saving.

Displayed dates and times follow the user's Craft formatting locale and Calendar's Auto/12-hour/24-hour time setting. Public slot labels use the current site's locale. Times remain in the scheduling calendar's timezone, including daylight saving offsets.

The booking status shows a compact relative timestamp beside the selector (such as `3h 12m ago`), which refreshes every minute while the editor is open. It also shows who last changed it and when, with a link to their Craft account and a timestamp such as `on 2026-10-11 at 1:56 am` in the control panel’s timezone. Customer requests and automatic confirmations are identified separately. Saving other booking details does not replace the status attribution. Existing bookings show no attribution until their next status change.

Requests do not reserve a time. Confirmation checks availability again. Turning off Require Approval confirms guest bookings immediately. Confirmed saves serialize on the calendar row inside Craft's element transaction and recheck conflicts. The same validation applies to direct element saves. Ordinary event creation is not available for Scheduling calendars. Booking contact details are not exported through event queries or ICS.

## Front end

### Spam protection

Public booking requests always use CSRF protection, a hidden honeypot, and an atomic per-IP rate limit. Open **Settings → Spam Protection** to add **Cloudflare Turnstile**, **hCaptcha**, **reCAPTCHA v2 (Checkbox)**, or **reCAPTCHA v3 (Score)**. Enter matching site and secret keys and configure your website's hostnames with the provider. Choose whether to **Protect Booking Requests**, **Protect Event Creation**, or both. The provider defaults to **None**; when a provider is selected, booking protection defaults on and event protection defaults off.

Protection covers direct public POSTs and submissions from signed-in visitors. Event protection applies to new events submitted to `calendar/events-api/save`; existing event edits are unaffected. Control-panel entry requires control-panel access and does not require CAPTCHA. Calendar verifies tokens itself and does not require Freeform.

Both keys support Craft environment variables. Prefer keeping secrets out of project config:

```php
// config/calendar.php
return [
    'captchaProvider' => 'turnstile',
    'captchaSiteKey' => '$CALENDAR_CAPTCHA_SITE_KEY',
    'captchaSecretKey' => '$CALENDAR_CAPTCHA_SECRET_KEY',
    'captchaProtectBookings' => true,
    'captchaProtectEvents' => false,
    'recaptchaMinimumScore' => 0.5,
];
```

Existing `bookingCaptchaProvider`, `bookingCaptchaSiteKey`, and `bookingCaptchaSecretKey` settings remain readable. Saving the shared settings replaces those legacy values.

For **reCAPTCHA v3**, use v3 keys. The browser executes on submission, with a fresh token for each attempt. The server checks success, the exact action (`calendar_booking` or `calendar_event`), and a numeric score at or above **Minimum reCAPTCHA Score** (default 0.5). Review scores in the provider console before changing the threshold. Enterprise assessments are not supported by this adapter.

`bookingForm()` renders the provider automatically. Both new-event demos include the helper. For your own regular HTML event form, place this inside the form alongside your existing CSRF and action inputs:

```twig
{{ craft.calendar.captcha('event', {theme: 'auto'}) }}
```

The helper returns an empty string when that form type is not protected. Use it once per form. It supports `auto`, `light`, and `dark` themes and resumes native submission only after verification, preserving native validation and the submit button. When updating installed demos, merge the helper into both framework `edit.twig` templates.

For AJAX forms, use `{autoSubmit: false}` and await `form.querySelector('[data-calendar-captcha]').calendarCaptcha.prepare()` inside your submit handler before constructing `FormData`. Proceed only if it returns true, retain a duplicate-submit guard, and call `.reset()` after a failed request. The hidden `captchaToken` input is included in `FormData`.

Checkbox widgets follow light/dark theme switches and fit narrow forms. Multiple forms have independent tokens and share one provider script. Booking retries preserve entered details and reset used tokens. Missing, expired, invalid, or unverifiable tokens reject the request without creating a record or queuing booking notifications; outages and missing configuration do not bypass protection. Only public configuration reaches the browser. v3 retains Google's visible badge.

For manually rendered widgets, `craft.calendar.spamProtection('booking')` or `craft.calendar.spamProtection('event')` returns `null` when disabled, or `{provider, siteKey, responseField, action}`. Submit a token under `captchaToken` or the standard provider `responseField`. Booking requests also accept the legacy `bookingCaptchaToken`. Set Turnstile's `action` to the returned action (`calendar-booking` or `calendar-event`). v3 must execute with the returned underscore action at submission time. `craft.calendar.bookingCaptcha()` remains an alias for booking configuration. Allow the provider's documented script, frame, and connection origins when using a Content Security Policy.

### Rendering a booking form

Enable Allow Guest Booking Requests on the scheduling calendar. **Guest Submission Calendars** lists event calendars only. Scheduling calendars use their own **Allow Guest Booking Requests** switch; membership in the guest event list is not required. Only active scheduling calendars enabled on the current site and within their final available date are offered. Bookings share one resource's availability across sites and are stored on the primary site.

```twig
{{ craft.calendar.bookingForm('meetingRoom') }}
```

The helper includes a responsive date/time picker, contact details, any configured public Booking Fields, validation messages, and a confirmation or request receipt. It loads available times for today automatically, keeps contact details after an error, and refreshes availability if someone else reserves the selected time. Each form has its own controls and scripts, so several forms can appear on one page.

Use a calendar handle or ID. The default style works without a CSS framework. Bootstrap and Tailwind options use their form classes alongside scoped booking styles:

```twig
{{ craft.calendar.bookingForm('meetingRoom', {
    framework: 'bootstrap',
    theme: 'auto',
    date: '2026-10-12'
}) }}

{{ craft.calendar.bookingForm('consultations', {framework: 'tailwind', theme: 'dark'}) }}
```

`framework` accepts `default`, `bootstrap`, or `tailwind`. `theme` accepts `auto`, `light`, or `dark`. Auto inherits an ancestor's `data-bs-theme` setting or Tailwind's `.dark` class, and otherwise follows the visitor's system appearance. An optional `date` starts the picker on that day; dates outside the advance or seasonal window fall back to the first bookable date. The picker is restricted to the intersection of these windows. An optional `booking` restores submitted contact and custom field values. Unavailable or private calendars return an empty string. All form styles are scoped to `.calendar-booking-form`; override the `--booking-*` CSS variables to match your own site. The built-in JavaScript uses native browser APIs and does not require Bootstrap JavaScript or Tailwind.

Successful submissions dispatch a bubbling `calendar:booking-success` browser event on the form. `event.detail.confirmed` indicates whether the booking was confirmed immediately or received for review. A received request does not reserve the time.

For custom interfaces:

```twig
{% set resources = craft.calendar.schedulingCalendars() %}
{% set slots = craft.calendar.availableSlots('meetingRoom', '2026-10-12') %}
```

Each slot has `start`, `end` (ISO 8601 with timezone offsets) and a display `label`. Submit a CSRF-protected POST to `calendar/bookings/request` with `calendarId`, `start`, `customerName`, `customerEmail`, optional `notes`, and selected custom values under `fields`. Clients cannot set status, duration, or private field values. JSON responses distinguish a received request from confirmation. The included form requires JavaScript, retains input after errors, and uses a honeypot and per-IP submission throttle.

The demo installer includes a **Book a time** page in both Bootstrap and Tailwind navigation, with a resource chooser and the reusable booking form. Its URL is `<demo-prefix>/bookings`; the existing framework and Light/Dark/Auto controls apply to this page too. Updating Calendar does not overwrite installed demos: reinstall the codepack to a temporary prefix and merge the new `bookings.twig`, both framework booking pages/layouts, and updated Tailwind CSS. Enable **Allow Guest Booking Requests** and the appropriate site on a Scheduling calendar to list it publicly.

Customer and optional staff notifications use Craft's mail settings and queue. Run the queue normally to deliver them. Notification failure does not release a confirmed booking.

Notifications are registered by the booking element itself, including saves through Craft's element service. They are queued after the outer database transaction finishes and only for changes that remain committed. Several time/status changes within one transaction produce a notification for its final state; rolled-back changes do not notify. Restoring a deleted booking rechecks the current calendar rules and conflicts inside Craft's restore transaction.

Guest request attempts use an atomic database counter shared across workers (20 attempts per IP address per hour). Old counters are periodically removed. Availability checks normalize occupied intervals once, and finding the next available time skips closed days and reads occupied times in batches of up to 31 days.

If a notification job fails, check its error in Queue Manager. Transport failures include the underlying mail error when Craft exposes it. Test delivery from **Settings → Email** and check `storage/logs` for further details. Local development requires a working mail transport, such as a running local mail catcher or configured SMTP service. After correcting the mail configuration, retry the failed jobs; restart long-running workers after updating Calendar's code.

## Validation before release

Exercise fresh install and upgrade, project-config apply/rebuild, creating both types of calendar, permission restrictions, guest booking on a secondary site, approval and cancellation, mail delivery, drag rescheduling, and simultaneous confirmations against both MySQL and PostgreSQL. Verify the live CP at narrow widths and the public form on mobile. Paid bookings, ticket inventory, recurring bookings, and Freeform integration are future work.
