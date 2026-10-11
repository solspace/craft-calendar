# Scheduling calendars

Choose **Events** or **Scheduling** at the top of New Calendar. Existing calendars remain Events. A calendar represents one bookable resource, such as a room or consultant. A calendar's type cannot change while it has events or bookings, including deleted records.

Scheduling calendars have weekly opening periods, date exceptions (closed, replacement hours, or blocked times), duration, start increments, a gap after bookings, notice, and an advance booking window. A closed date wins over replacement hours. Multiple periods support lunch breaks. Empty weekly hours keep all weekdays closed; replacement hours can still open a particular date.

Defaults: 8am–9pm each day, 30-minute bookings, 15-minute start increments, no buffer or minimum notice, a 90-day booking window, no overlaps, guest requests disabled, and approval required. The scheduling timezone handles daylight saving changes; bookings are stored in UTC. The appointment and its buffer must fit inside the opening period. Overlap permission applies to bookings, not holiday closures or blocked periods, and has no capacity limit.

## Control panel

**Bookings** appears when the current user can manage at least one Scheduling calendar. Booking permissions are independent of event permissions and can be granted globally or per calendar. The list supports customer search, calendar/status filters, and pagination. Use **Sort by** or click a column heading to sort by customer, calendar, date and time, or status. Click the same heading again to reverse the order. Sorting applies to all matching bookings and stays selected through filtering and pagination. The Schedule view provides Day/Week views and dragging to reschedule, without FullCalendar Scheduler. Clicking a booking opens its editor. Decline or cancel from the status selector.

Staff with booking management permission can change status directly in the list; changes save automatically with a saving indicator and confirmation. Failed changes restore the previous selection and show the error. Inline changes use the same availability checks, status attribution, and notifications as the booking editor.

Calendar and status filters update the list immediately. Customer search updates after a short typing pause, without reloading the page or moving focus. Changing filters resets pagination; Clear removes all three filters.

Bookings are separate Craft elements and have one shared custom field layout, configured under **Bookings → Booking fields**. Name, email, times, status, and notes are built in. Guest-visible fields are explicitly selected from simple text, number, dropdown, radio, and checkbox fields; other custom fields remain private. Save new layout fields before selecting them for guest use.

The Bookings, Schedule, and Booking Fields pages use Craft’s standard left sidebar. In the schedule, click an available start time to open a new booking with that slot selected. Shaded times cannot be selected. Opening hours, exceptions, booking duration, buffers, and confirmed reservations determine available slots; the overlap setting is respected. Staff retain access to historical dates and are not limited by the guest notice or advance window. Availability is checked again when opening the editor and saving.

Schedule hover previews span the full booking duration. Undo and Redo beside New Booking use the same controls and shortcuts as Calendar Overview. They track up to 50 saved moves in the current browser tab, per user and calendar, with server snapshots retained for two hours. Undo and redo preserve booking details and status attribution, recheck permissions and current availability, and refuse to overwrite a later time or status change. New moves clear the redo stack.

The booking editor offers a date picker and available time slots instead of free-form start/end inputs. New bookings default to the next available slot within the booking window. Editing preserves the booking’s existing duration and excludes its own reservation when calculating availability. Staff can select historical dates; guest notice and advance limits apply to the public form. Availability is checked again when saving.

Displayed dates and times follow the user's Craft formatting locale and Calendar's Auto/12-hour/24-hour time setting. Public slot labels use the current site's locale. Times remain in the scheduling calendar's timezone, including daylight saving offsets.

The booking status shows who last changed it and when, with a link to their Craft account and a timestamp such as `on 2026-10-11 at 1:56 am` in the control panel’s timezone. Customer requests and automatic confirmations are identified separately. Saving other booking details does not replace the status attribution. Existing bookings show no attribution until their next status change.

Requests do not reserve a time. Confirmation checks availability again. Turning off Require Approval confirms guest bookings immediately. Confirmed saves serialize on the calendar row inside Craft's element transaction and recheck conflicts. The same validation applies to direct element saves. Ordinary event creation is not available for Scheduling calendars. Booking contact details are not exported through event queries or ICS.

## Front end

Enable Allow Guest Booking Requests on the scheduling calendar. Guest access is independent of Calendar's existing event guest-posting settings. Only scheduling calendars enabled on the current site are offered. Bookings share one resource's availability across sites and are stored on the primary site.

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

`framework` accepts `default`, `bootstrap`, or `tailwind`. `theme` accepts `auto`, `light`, or `dark`. Auto inherits an ancestor's `data-bs-theme` setting or Tailwind's `.dark` class, and otherwise follows the visitor's system appearance. An optional `date` starts the picker on that day; dates outside the calendar's advance window fall back to today. An optional `booking` restores submitted contact and custom field values. Unavailable or private calendars return an empty string. All form styles are scoped to `.calendar-booking-form`; override the `--booking-*` CSS variables to match your own site. The built-in JavaScript uses native browser APIs and does not require Bootstrap JavaScript or Tailwind.

Successful submissions dispatch a bubbling `calendar:booking-success` browser event on the form. `event.detail.confirmed` indicates whether the booking was confirmed immediately or received for review. A received request does not reserve the time.

For custom interfaces:

```twig
{% set resources = craft.calendar.schedulingCalendars() %}
{% set slots = craft.calendar.availableSlots('meetingRoom', '2026-10-12') %}
```

Each slot has `start`, `end` (ISO 8601 with timezone offsets) and a display `label`. Submit a CSRF-protected POST to `calendar/bookings/request` with `calendarId`, `start`, `customerName`, `customerEmail`, optional `notes`, and selected custom values under `fields`. Clients cannot set status, duration, or private field values. JSON responses distinguish a received request from confirmation. The included form requires JavaScript, retains input after errors, and uses a honeypot and per-IP submission throttle.

The demo installer includes a **Book a time** page in both Bootstrap and Tailwind navigation, with a resource chooser and the reusable booking form. Its URL is `<demo-prefix>/bookings`; the existing framework and Light/Dark/Auto controls apply to this page too. Updating Calendar does not overwrite installed demos: reinstall the codepack to a temporary prefix and merge the new `bookings.twig`, both framework booking pages/layouts, and updated Tailwind CSS. Enable **Allow Guest Booking Requests** and the appropriate site on a Scheduling calendar to list it publicly.

Customer and optional staff notifications use Craft's mail settings and queue. Run the queue normally to deliver them. Notification failure does not release a confirmed booking.

If a notification job fails, check its error in Queue Manager. Transport failures include the underlying mail error when Craft exposes it. Test delivery from **Settings → Email** and check `storage/logs` for further details. Local development requires a working mail transport, such as a running local mail catcher or configured SMTP service. After correcting the mail configuration, retry the failed jobs; restart long-running workers after updating Calendar's code.

## Validation before release

Exercise fresh install and upgrade, project-config apply/rebuild, creating both types of calendar, permission restrictions, guest booking on a secondary site, approval and cancellation, mail delivery, drag rescheduling, and simultaneous confirmations against both MySQL and PostgreSQL. Verify the live CP at narrow widths and the public form on mobile. Paid bookings, ticket inventory, recurring bookings, and Freeform integration are future work.
