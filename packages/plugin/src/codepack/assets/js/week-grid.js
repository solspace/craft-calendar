// Layout timed events within each day. Events touching at their endpoints do not overlap.
(() => {
  const scroll = document.querySelector("[data-week-grid-scroll]");
  if (!scroll) return;

  for (const day of scroll.querySelectorAll("[data-week-grid-day]")) {
    const events = [...day.querySelectorAll(".week-grid-event")]
      .map((element) => ({
        element,
        start: Number(element.dataset.start),
        end: Number(element.dataset.end),
      }))
      .filter((event) => Number.isFinite(event.start) && Number.isFinite(event.end))
      .sort((a, b) => a.start - b.start || b.end - a.end);

    let group = [];
    let groupEnd = -1;

    function placeGroup() {
      if (!group.length) return;
      const columns = [];

      for (const event of group) {
        let column = columns.findIndex((items) => items.at(-1).displayEnd <= event.start);
        if (column === -1) {
          column = columns.length;
          columns.push([]);
        }
        event.column = column;
        columns[column].push(event);
      }

      for (const event of group) {
        // Grow into columns which have no event intersecting this one's visible box.
        let span = 1;
        for (let next = event.column + 1; next < columns.length; next++) {
          if (columns[next].some((other) => event.start < other.displayEnd && other.start < event.displayEnd)) break;
          span++;
        }
        event.element.style.left = `calc(${event.column / columns.length * 100}% + 3px)`;
        event.element.style.width = `calc(${span / columns.length * 100}% - 6px)`;
      }
      group = [];
    }

    for (const event of events) {
      // A very short event still needs enough height for a visible, clickable card.
      event.displayEnd = Math.max(event.end, event.start + 25);
      if (event.start >= groupEnd) {
        placeGroup();
        groupEnd = -1;
      }
      group.push(event);
      groupEnd = Math.max(groupEnd, event.displayEnd);
    }
    placeGroup();
  }

  // Open near working hours while leaving the full 24-hour range scrollable.
  const firstDay = scroll.querySelector("[data-week-grid-day]");
  if (firstDay) scroll.scrollTop = 7 * 48 - 8;
})();
