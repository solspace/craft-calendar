# Scheduling calendars

Choose **Events** or **Scheduling** at the top of New Calendar. Existing calendars remain Events. A calendar represents one bookable resource, such as a room or consultant. A calendar's type cannot change while it has events or bookings, including deleted records.

Scheduling calendars have weekly opening periods, date exceptions (closed, replacement hours, or blocked times), duration, start increments, a gap after bookings, notice, and an advance booking window. A closed date wins over replacement hours. Multiple periods support lunch breaks. Empty weekly hours keep all weekdays closed; replacement hours can still open a particular date.

Defaults: 8am–9pm each day, 30-minute bookings, 15-minute start increments, no buffer or minimum notice, a 90-day booking window, no overlaps, guest requests disabled, and approval required. The scheduling timezone handles daylight saving changes; bookings are stored in UTC. The appointment and its buffer must fit inside the opening period. Overlap permission applies to bookings, not holiday closures or blocked periods, and has no capacity limit.

## Control panel

**Bookings** appears when the current user can manage at least one Scheduling calendar. Booking permissions are independent of event permissions and can be granted globally or per calendar. The list supports customer search, calendar/status filters, and pagination. The Schedule view provides Day/Week views and dragging to reschedule, without FullCalendar Scheduler. Clicking a booking opens its editor. Decline or cancel from the status selector.

Bookings are separate Craft elements and have one shared custom field layout, configured under **Bookings → Booking fields**. Name, email, times, status, and notes are built in. Guest-visible fields are explicitly selected from simple text, number, dropdown, radio, and checkbox fields; other custom fields remain private. Save new layout fields before selecting them for guest use.

The booking editor offers a date picker and available time slots instead of free-form start/end inputs. New bookings default to the next available slot within the booking window. Editing preserves the booking’s existing duration and excludes its own reservation when calculating availability. Staff can select historical dates; guest notice and advance limits apply to the public form. Availability is checked again when saving.

Requests do not reserve a time. Confirmation checks availability again. Turning off Require Approval confirms guest bookings immediately. Confirmed saves serialize on the calendar row inside Craft's element transaction and recheck conflicts. The same validation applies to direct element saves. Ordinary event creation is not available for Scheduling calendars. Booking contact details are not exported through event queries or ICS.

## Front end

Enable Allow Guest Booking Requests on the scheduling calendar. Guest access is independent of Calendar's existing event guest-posting settings. Only scheduling calendars enabled on the current site are offered. Bookings share one resource's availability across sites and are stored on the primary site.

```twig
{{ craft.calendar.bookingForm('meetingRoom') }}
```

For custom interfaces:

```twig
{% set resources = craft.calendar.schedulingCalendars() %}
{% set slots = craft.calendar.availableSlots('meetingRoom', '2026-10-12') %}
```

Each slot has `start`, `end` (ISO 8601 with timezone offsets) and a display `label`. Submit a CSRF-protected POST to `calendar/bookings/request` with `calendarId`, `start`, `customerName`, `customerEmail`, optional `notes`, and selected custom values under `fields`. Clients cannot set status, duration, or private field values. JSON responses distinguish a received request from confirmation. The included form requires JavaScript, retains input after errors, and uses a honeypot and per-IP submission throttle.

The demo installer includes `bookings.twig`. Customer and optional staff notifications use Craft's mail settings and queue. Run the queue normally to deliver them. Notification failure does not release a confirmed booking.

## Validation before release

Exercise fresh install and upgrade, project-config apply/rebuild, creating both types of calendar, permission restrictions, guest booking on a secondary site, approval and cancellation, mail delivery, drag rescheduling, and simultaneous confirmations against both MySQL and PostgreSQL. Verify the live CP at narrow widths and the public form on mobile. Paid bookings, ticket inventory, recurring bookings, and Freeform integration are future work.
