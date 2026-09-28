(() => {
    const form = document.querySelector("[data-event-form]");
    if (!form) return;

    const config = JSON.parse(form.querySelector("[data-event-config]").textContent);
    const fields = {
        allDay: form.querySelector("[data-all-day]"),
        allDayValue: form.querySelector("[data-all-day-value]"),
        start: form.querySelector("[data-start]"),
        startDate: form.querySelector("[data-start-date]"),
        startTime: form.querySelector("[data-start-time]"),
        end: form.querySelector("[data-end]"),
        endDate: form.querySelector("[data-end-date]"),
        endTime: form.querySelector("[data-end-time]"),
        until: form.querySelector("[data-until]"),
        rrule: form.querySelector("[data-rrule]"),
        repeatTypeValue: form.querySelector("[data-repeat-type-value]"),
        repeatEndValue: form.querySelector("[data-repeat-end-value]"),
    };
    const recurrence = config.recurrenceEnabled ? {
        repeatType: form.querySelector("[data-repeat-type]"),
        repeatEnd: form.querySelector("[data-repeat-end]"),
        frequency: form.querySelector("[data-frequency]"),
        interval: form.querySelector("[data-interval]"),
        count: form.querySelector("[data-count]"),
        untilDate: form.querySelector("[data-until-date]"),
        byDay: form.querySelector("[data-by-day]"),
        byMonthDay: form.querySelector("[data-by-month-day]"),
        byMonth: form.querySelector("[data-by-month]"),
        byYearDay: form.querySelector("[data-by-year-day]"),
        bySetPosition: form.querySelector("[data-by-set-position]"),
        extraRuleParts: form.querySelector("[data-extra-rule-parts]"),
        monthlyMode: form.querySelector("[data-monthly-mode]"),
        monthlyPosition: form.querySelector("[data-monthly-position]"),
        monthlyWeekdayChoice: form.querySelector("[data-monthly-weekday-choice]"),
        yearlyMode: form.querySelector("[data-yearly-mode]"),
        yearlyPosition: form.querySelector("[data-yearly-position]"),
        yearlyWeekdayChoice: form.querySelector("[data-yearly-weekday-choice]"),
        weekdayMatrix: form.querySelector("[data-weekday-matrix]"),
        monthdayMatrix: form.querySelector("[data-monthday-matrix]"),
        monthMatrix: form.querySelector("[data-month-matrix]"),
        yearlyMonthdayMatrix: form.querySelector("[data-yearly-monthday-matrix]"),
    } : null;
    let rdates = [];
    let exdates = [];
    let originalRdateLines = [];
    let originalExdateLines = [];
    let originalRruleLines = [];
    let originalDtstartLine = "";
    let fixedDatesDirty = false;
    let ruleDirty = false;
    let scheduleDirty = false;
    let startDirty = false;
    let endDirty = false;
    let startTimeDirty = false;
    let endTimeDirty = false;
    let complexRuleLocked = false;
    let previousRepeatType = config.repeatType || "NEVER";
    let previousCustomFrequency = "DAILY";
    let lastStartClock = fields.start.value.slice(11).split(":").map(Number);
    const originalStartSeconds = fields.start.value.slice(17, 19) || "00";
    const originalEndSeconds = fields.end.value.slice(17, 19) || "00";

    function compactDate(value) {
        return String(value || "").replaceAll("-", "");
    }

    function rfcValue(date, allDay = fields.allDay.checked) {
        if (allDay) return compactDate(date);
        const time = (fields.startTime.value || "00:00").replace(":", "");
        const seconds = fields.start.value.slice(17, 19) || "00";
        return `${compactDate(date)}T${time}${seconds}`;
    }

    function dateFromRfc(value) {
        const match = /^(\d{4})(\d{2})(\d{2})/.exec(value.trim());
        return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
    }

    function uniqueDates(dates) {
        return [...new Set(dates.filter(Boolean))].sort();
    }

    function parseRuleParts(line) {
        return Object.fromEntries(line.replace(/^RRULE:/, "").split(";").map((part) => {
            const [name, value = ""] = part.split("=", 2);
            return [name, value];
        }));
    }

    const weekdayChoices = {
        MO: ["MO"],
        TU: ["TU"],
        WE: ["WE"],
        TH: ["TH"],
        FR: ["FR"],
        SA: ["SA"],
        SU: ["SU"],
        WD: ["MO", "TU", "WE", "TH", "FR"],
        WEK: ["SA", "SU"],
    };

    function selectedMatrixValues(matrix, attribute) {
        return [...matrix.querySelectorAll(`[${attribute}].active`)].map((button) => button.getAttribute(attribute));
    }

    function setMatrixValues(matrix, attribute, values, fallback) {
        const selected = values.length ? values.map(String) : [String(fallback)];
        matrix.querySelectorAll(`[${attribute}]`).forEach((button) => {
            const active = selected.includes(button.getAttribute(attribute));
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    function startDateDefaults() {
        const date = new Date(`${fields.startDate.value}T00:00:00`);
        const weekdayCodes = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
        return {
            day: date.getDate(),
            month: date.getMonth() + 1,
            weekday: weekdayCodes[date.getDay()],
        };
    }

    function weekdayChoiceFor(days, fallback) {
        const normalized = [...new Set(days)].sort().join(",");
        const match = Object.entries(weekdayChoices).find(([, values]) => [...values].sort().join(",") === normalized);
        return match ? match[0] : fallback;
    }

    function parseNthWeekday(byDay, bySetPosition) {
        const days = String(byDay || "").split(",").filter(Boolean);
        let position = Number.parseInt(String(bySetPosition || ""), 10) || 1;
        const normalizedDays = days.map((day) => {
            const match = /^(-?\d+)(MO|TU|WE|TH|FR|SA|SU)$/.exec(day);
            if (!match) return day;
            position = Number.parseInt(match[1], 10);
            return match[2];
        });

        return { days: normalizedDays, position };
    }

    function updateCustomRuleVisibility() {
        if (!recurrence) return;
        const frequency = recurrence.frequency.value;
        form.querySelectorAll("[data-frequency-panel]").forEach((panel) => {
            panel.hidden = panel.getAttribute("data-frequency-panel") !== frequency;
        });

        form.querySelector("[data-monthly-monthday]").hidden = recurrence.monthlyMode.value !== "MONTHDAY";
        form.querySelector("[data-monthly-weekday]").hidden = recurrence.monthlyMode.value !== "WEEKDAY";
        form.querySelector("[data-yearly-monthday]").hidden = recurrence.yearlyMode.value !== "MONTHDAY";
        form.querySelector("[data-yearly-weekday]").hidden = recurrence.yearlyMode.value !== "WEEKDAY";
    }

    function synchronizeCustomRuleControls() {
        if (!recurrence || recurrence.repeatType.value !== "CUSTOM") return;

        const frequency = recurrence.frequency.value;
        recurrence.byDay.value = "";
        recurrence.byMonthDay.value = "";
        recurrence.byMonth.value = "";
        recurrence.bySetPosition.value = "";

        if (frequency === "WEEKLY") {
            recurrence.byDay.value = selectedMatrixValues(recurrence.weekdayMatrix, "data-weekday").join(",");
        }

        if (frequency === "MONTHLY") {
            if (recurrence.monthlyMode.value === "MONTHDAY") {
                recurrence.byMonthDay.value = selectedMatrixValues(recurrence.monthdayMatrix, "data-monthday").join(",");
            } else {
                recurrence.byDay.value = weekdayChoices[recurrence.monthlyWeekdayChoice.value].join(",");
                recurrence.bySetPosition.value = recurrence.monthlyPosition.value;
            }
        }

        if (frequency === "YEARLY") {
            recurrence.byMonth.value = selectedMatrixValues(recurrence.monthMatrix, "data-month").join(",");
            if (recurrence.yearlyMode.value === "MONTHDAY") {
                recurrence.byMonthDay.value = selectedMatrixValues(recurrence.yearlyMonthdayMatrix, "data-yearly-monthday").join(",");
            } else {
                recurrence.byDay.value = weekdayChoices[recurrence.yearlyWeekdayChoice.value].join(",");
                recurrence.bySetPosition.value = recurrence.yearlyPosition.value;
            }
        }
    }

    function hydrateCustomRuleControls(ruleParts) {
        if (!recurrence) return;
        const defaults = startDateDefaults();
        const nthWeekday = parseNthWeekday(ruleParts.BYDAY, ruleParts.BYSETPOS);
        const monthDays = String(ruleParts.BYMONTHDAY || "").split(",").filter(Boolean);
        const months = String(ruleParts.BYMONTH || "").split(",").filter(Boolean);
        const weekdays = nthWeekday.days.length ? nthWeekday.days : [defaults.weekday];
        const weekdayChoice = weekdayChoiceFor(weekdays, defaults.weekday);
        const weekdayMode = Boolean(ruleParts.BYSETPOS) || String(ruleParts.BYDAY || "").split(",").some((day) => /^-?\d/.test(day));

        setMatrixValues(recurrence.weekdayMatrix, "data-weekday", weekdays, defaults.weekday);
        setMatrixValues(recurrence.monthdayMatrix, "data-monthday", monthDays, defaults.day);
        setMatrixValues(recurrence.yearlyMonthdayMatrix, "data-yearly-monthday", monthDays, defaults.day);
        setMatrixValues(recurrence.monthMatrix, "data-month", months, defaults.month);

        recurrence.monthlyMode.value = weekdayMode ? "WEEKDAY" : "MONTHDAY";
        recurrence.yearlyMode.value = weekdayMode ? "WEEKDAY" : "MONTHDAY";
        recurrence.monthlyPosition.value = String(nthWeekday.position);
        recurrence.yearlyPosition.value = String(nthWeekday.position);
        recurrence.monthlyWeekdayChoice.value = weekdayChoice;
        recurrence.yearlyWeekdayChoice.value = weekdayChoice;
        updateCustomRuleVisibility();
    }

    function bindRuleMatrix(matrix, attribute) {
        matrix.querySelectorAll(`[${attribute}]`).forEach((button) => {
            button.addEventListener("click", () => {
                const activeButtons = matrix.querySelectorAll(`[${attribute}].active`);
                if (button.classList.contains("active") && activeButtons.length === 1) return;

                const active = !button.classList.contains("active");
                button.classList.toggle("active", active);
                button.setAttribute("aria-pressed", active ? "true" : "false");
                ruleDirty = true;
                synchronizeCustomRuleControls();
                synchronize();
            });
        });
    }

    function renderDateList(target, dates, removeDate) {
        target.replaceChildren();
        dates.forEach((date) => {
            const item = document.createElement("li");
            const label = document.createElement("span");
            const remove = document.createElement("button");
            label.textContent = date;
            remove.type = "button";
            remove.className = "btn btn-sm btn-link text-danger";
            remove.textContent = "Remove";
            remove.addEventListener("click", () => removeDate(date));
            item.append(label, remove);
            target.append(item);
        });
    }

    function renderLists() {
        if (!recurrence) return;
        renderDateList(form.querySelector("[data-rdate-list]"), rdates, (date) => {
            fixedDatesDirty = true;
            rdates = rdates.filter((value) => value !== date);
            renderLists();
            synchronize();
        });
        renderDateList(form.querySelector("[data-exdate-list]"), exdates, (date) => {
            fixedDatesDirty = true;
            exdates = exdates.filter((value) => value !== date);
            renderLists();
            synchronize();
        });
    }

    function updateVisibility() {
        form.querySelectorAll("[data-time-field]").forEach((field) => {
            field.hidden = fields.allDay.checked;
        });
        form.querySelector("[data-all-day-help]").hidden = !fields.allDay.checked;

        if (!recurrence) return;
        const repeats = recurrence.repeatType.value !== "NEVER";
        const customRule = form.querySelector("[data-custom-rule]");
        customRule.hidden = recurrence.repeatType.value !== "CUSTOM";
        form.querySelector("[data-repeat-end-row]").hidden = !repeats;
        form.querySelector("[data-exceptions]").hidden = !repeats;
        form.querySelector("[data-count-field]").hidden = recurrence.repeatEnd.value !== "AFTER";
        form.querySelector("[data-until-field]").hidden = recurrence.repeatEnd.value !== "ON_DATE";
        customRule.querySelectorAll("input, select").forEach((field) => {
            field.disabled = customRule.hidden;
        });
        if (!customRule.hidden) updateCustomRuleVisibility();
        recurrence.count.disabled = recurrence.repeatEnd.value !== "AFTER";
        recurrence.untilDate.disabled = recurrence.repeatEnd.value !== "ON_DATE";

        if (complexRuleLocked) {
            form.querySelector("[data-complex-rule-warning]").hidden = false;
            form.querySelectorAll(".event-editor-card input, .event-editor-card select, .event-editor-card button").forEach((field) => {
                field.disabled = true;
            });
        }
    }

    function synchronizeDates() {
        fields.allDayValue.value = fields.allDay.checked ? "1" : "0";
        if (!scheduleDirty) return;
        const startTime = fields.allDay.checked ? "00:00" : fields.startTime.value;
        const endTime = fields.allDay.checked ? "00:00" : fields.endTime.value;
        const startSeconds = fields.allDay.checked || startTimeDirty ? "00" : originalStartSeconds;
        const endSeconds = fields.allDay.checked || endTimeDirty ? "00" : originalEndSeconds;
        if (startDirty) fields.start.value = `${fields.startDate.value}T${startTime || "00:00"}:${startSeconds}`;
        if (endDirty) fields.end.value = `${fields.endDate.value}T${endTime || "00:00"}:${endSeconds}`;
    }

    function buildRRule() {
        if (!recurrence) return config.rrule || "";
        const repeatType = recurrence.repeatType.value;
        const repeats = repeatType !== "NEVER";
        const allDay = fields.allDay.checked;
        const startValue = rfcValue(fields.startDate.value, allDay);

        fields.repeatTypeValue.value = repeatType;
        fields.repeatEndValue.value = repeats ? recurrence.repeatEnd.value : "NEVER";
        fields.until.value = "";
        synchronizeCustomRuleControls();

        if (!repeats && rdates.length === 0) {
            return "";
        }

        const lines = [
            !startDirty && originalDtstartLine
                ? originalDtstartLine
                : `DTSTART${allDay ? ";VALUE=DATE" : ""}:${startValue}`,
        ];

        if (repeats) {
            const frequency = repeatType === "CUSTOM" ? recurrence.frequency.value : repeatType;
            const parts = [
                `FREQ=${frequency}`,
                `INTERVAL=${Math.max(Number.parseInt(recurrence.interval.value, 10) || 1, 1)}`,
            ];
            const preserveRuleDetails = repeatType === "CUSTOM" || repeatType === config.repeatType;
            if (preserveRuleDetails) {
                [
                    ["BYDAY", recurrence.byDay.value],
                    ["BYMONTHDAY", recurrence.byMonthDay.value],
                    ["BYMONTH", recurrence.byMonth.value],
                    ["BYYEARDAY", recurrence.byYearDay.value],
                    ["BYSETPOS", recurrence.bySetPosition.value],
                ].forEach(([name, value]) => {
                    const normalized = value.replaceAll(" ", "").toUpperCase();
                    if (normalized) parts.push(`${name}=${normalized}`);
                });

                String(recurrence.extraRuleParts.value || "").split(";").forEach((part) => {
                    const normalized = part.trim().toUpperCase();
                    if (normalized) parts.push(normalized);
                });
            }

            if (recurrence.repeatEnd.value === "AFTER") {
                parts.push(`COUNT=${Math.max(Number.parseInt(recurrence.count.value, 10) || 1, 1)}`);
            } else if (recurrence.repeatEnd.value === "ON_DATE" && recurrence.untilDate.value) {
                const untilValue = rfcValue(recurrence.untilDate.value, allDay);
                parts.push(`UNTIL=${untilValue}`);
                fields.until.value = allDay
                    ? recurrence.untilDate.value
                    : `${recurrence.untilDate.value}T${fields.startTime.value || "00:00"}:00`;
            }

            if (!ruleDirty && originalRruleLines.length) {
                lines.push(...originalRruleLines);
            } else {
                lines.push(`RRULE:${parts.join(";")}`);
            }
        }

        if (!fixedDatesDirty && allDay === Boolean(config.allDay)) {
            lines.push(...originalRdateLines);
            if (repeats) lines.push(...originalExdateLines);
        } else {
            const includedDates = repeats ? rdates : uniqueDates([fields.startDate.value, ...rdates]);
            if (includedDates.length) {
                lines.push(...fixedDateLines("RDATE", includedDates, originalRdateLines, allDay));
            }
            if (repeats && exdates.length) {
                lines.push(...fixedDateLines("EXDATE", exdates, originalExdateLines, allDay));
            }
        }

        return lines.join("\n");
    }

    function fixedDateLines(type, dates, originalLines, allDay) {
        const lines = [];
        const preservedDates = new Set();

        if (allDay === Boolean(config.allDay)) {
            originalLines.forEach((line) => {
                const separator = line.indexOf(":");
                const property = line.slice(0, separator);
                const values = line.slice(separator + 1).split(",").filter((value) => {
                    const date = dateFromRfc(value);
                    if (!dates.includes(date)) return false;
                    preservedDates.add(date);
                    return true;
                });
                if (values.length) lines.push(`${property}:${values.join(",")}`);
            });
        }

        const addedDates = dates.filter((date) => !preservedDates.has(date));
        if (addedDates.length) {
            lines.push(`${type}${allDay ? ";VALUE=DATE" : ""}:${addedDates.map((date) => rfcValue(date, allDay)).join(",")}`);
        }

        return lines;
    }

    function synchronizeRuleClockParts() {
        if (!recurrence || !startTimeDirty) return;
        const [hour, minute] = fields.startTime.value.split(":").map(Number);
        const replacements = {
            BYHOUR: [lastStartClock[0], hour],
            BYMINUTE: [lastStartClock[1], minute],
            BYSECOND: [lastStartClock[2], 0],
        };
        recurrence.extraRuleParts.value = recurrence.extraRuleParts.value
            .split(";")
            .map((part) => {
                const [name, value] = part.split("=", 2);
                if (!replacements[name]) return part;
                const [previous, next] = replacements[name];
                const values = value.split(",").map((entry) => Number(entry) === previous ? String(next) : entry);
                return `${name}=${values.join(",")}`;
            })
            .join(";");
        lastStartClock = [hour, minute, 0];
    }

    function synchronize() {
        synchronizeDates();
        updateVisibility();
        fields.rrule.value = buildRRule();
    }

    function hydrateRecurrence() {
        if (!recurrence) return;
        let ruleParts = {};
        String(config.rrule || "").split(/\r?\n/).forEach((line) => {
            const values = line.includes(":") ? line.slice(line.indexOf(":") + 1).split(",") : [];
            if (line.startsWith("DTSTART")) originalDtstartLine = line;
            if (line.startsWith("RRULE:")) {
                originalRruleLines.push(line);
                if (originalRruleLines.length === 1) ruleParts = parseRuleParts(line);
            }
            if (line.startsWith("RDATE")) {
                originalRdateLines.push(line);
                rdates.push(...values.map(dateFromRfc));
            }
            if (line.startsWith("EXDATE")) {
                originalExdateLines.push(line);
                exdates.push(...values.map(dateFromRfc));
            }
        });

        recurrence.repeatType.value = config.repeatType || "NEVER";
        recurrence.repeatEnd.value = config.repeatEndType || "NEVER";
        recurrence.frequency.value = ruleParts.FREQ || "DAILY";
        previousCustomFrequency = recurrence.frequency.value;
        recurrence.interval.value = ruleParts.INTERVAL || "1";
        recurrence.count.value = ruleParts.COUNT || "1";
        recurrence.byDay.value = ruleParts.BYDAY || "";
        recurrence.byMonthDay.value = ruleParts.BYMONTHDAY || "";
        recurrence.byMonth.value = ruleParts.BYMONTH || "";
        recurrence.byYearDay.value = ruleParts.BYYEARDAY || "";
        recurrence.bySetPosition.value = ruleParts.BYSETPOS || "";
        const representedParts = new Set([
            "FREQ", "INTERVAL", "COUNT", "UNTIL", "BYDAY", "BYMONTHDAY", "BYMONTH", "BYYEARDAY", "BYSETPOS",
        ]);
        recurrence.extraRuleParts.value = Object.entries(ruleParts)
            .filter(([name]) => !representedParts.has(name))
            .map(([name, value]) => `${name}=${value}`)
            .join(";");
        recurrence.untilDate.value = ruleParts.UNTIL ? dateFromRfc(ruleParts.UNTIL) : "";
        complexRuleLocked = originalRruleLines.length > 1;
        hydrateCustomRuleControls(ruleParts);

        if (recurrence.repeatType.value === "NEVER") {
            rdates = rdates.filter((date) => date !== fields.startDate.value);
        }
        rdates = uniqueDates(rdates);
        exdates = uniqueDates(exdates);
        previousRepeatType = recurrence.repeatType.value;
        renderLists();
    }

    const calendarSelector = form.querySelector("[data-calendar-selector]");
    calendarSelector?.addEventListener("change", () => {
        const url = new URL(window.location.href);
        url.searchParams.set("calendarId", calendarSelector.value);
        window.location.assign(url.toString());
    });

    if (recurrence) {
        bindRuleMatrix(recurrence.weekdayMatrix, "data-weekday");
        bindRuleMatrix(recurrence.monthdayMatrix, "data-monthday");
        bindRuleMatrix(recurrence.monthMatrix, "data-month");
        bindRuleMatrix(recurrence.yearlyMonthdayMatrix, "data-yearly-monthday");
        [recurrence.frequency, recurrence.monthlyMode, recurrence.yearlyMode].forEach((field) => {
            field.addEventListener("change", updateCustomRuleVisibility);
        });
        recurrence.frequency.addEventListener("change", () => {
            if (recurrence.frequency.value !== previousCustomFrequency) {
                recurrence.byYearDay.value = "";
                recurrence.extraRuleParts.value = "";
                previousCustomFrequency = recurrence.frequency.value;
            }
        });
    }

    fields.allDay.addEventListener("change", () => {
        fixedDatesDirty = true;
        scheduleDirty = true;
        startDirty = true;
        endDirty = true;
        startTimeDirty = true;
        endTimeDirty = true;
        ruleDirty = true;
        if (fields.allDay.checked && recurrence) {
            recurrence.extraRuleParts.value = recurrence.extraRuleParts.value
                .split(";")
                .filter((part) => !/^(BYHOUR|BYMINUTE|BYSECOND)=/.test(part))
                .join(";");
        }
        if (fields.allDay.checked && fields.startDate.value && fields.endDate.value <= fields.startDate.value) {
            const end = new Date(`${fields.startDate.value}T00:00:00Z`);
            end.setUTCDate(end.getUTCDate() + 1);
            fields.endDate.value = end.toISOString().slice(0, 10);
        }
        synchronize();
    });
    [fields.startDate, fields.startTime, fields.endDate, fields.endTime].forEach((field) => {
        field.addEventListener("input", () => fields.endDate.setCustomValidity(""));
    });
    form.querySelectorAll("input, select").forEach((field) => {
        if (!field.matches("[data-calendar-selector], [data-all-day]")) {
            field.addEventListener("change", () => {
                if (field.matches("[data-start-date], [data-start-time]")) fixedDatesDirty = true;
                if (field.matches("[data-start-date], [data-start-time]")) {
                    scheduleDirty = true;
                    startDirty = true;
                    ruleDirty = true;
                }
                if (field.matches("[data-start-time]")) {
                    startTimeDirty = true;
                    synchronizeRuleClockParts();
                }
                if (field.matches("[data-end-date], [data-end-time]")) {
                    scheduleDirty = true;
                    endDirty = true;
                }
                if (field.matches("[data-end-time]")) endTimeDirty = true;
                if (field.matches("[data-repeat-type], [data-repeat-end]") || field.closest("[data-custom-rule], [data-repeat-end-row]")) ruleDirty = true;
                synchronize();
            });
            field.addEventListener("input", () => {
                if (field.matches("[data-start-date], [data-start-time]")) fixedDatesDirty = true;
                if (field.matches("[data-start-date], [data-start-time]")) {
                    scheduleDirty = true;
                    startDirty = true;
                    ruleDirty = true;
                }
                if (field.matches("[data-start-time]")) {
                    startTimeDirty = true;
                    synchronizeRuleClockParts();
                }
                if (field.matches("[data-end-date], [data-end-time]")) {
                    scheduleDirty = true;
                    endDirty = true;
                }
                if (field.matches("[data-end-time]")) endTimeDirty = true;
                if (field.matches("[data-repeat-type], [data-repeat-end]") || field.closest("[data-custom-rule], [data-repeat-end-row]")) ruleDirty = true;
                synchronize();
            });
        }
    });

    if (recurrence) {
        recurrence.repeatType.addEventListener("change", () => {
            fixedDatesDirty = true;
            ruleDirty = true;
            if (previousRepeatType === "NEVER" && recurrence.repeatType.value !== "NEVER") {
                rdates = [];
                renderLists();
            }
            previousRepeatType = recurrence.repeatType.value;
            synchronize();
        });
        form.querySelector("[data-add-rdate]").addEventListener("click", () => {
            const picker = form.querySelector("[data-rdate-picker]");
            if (!picker.value || picker.value === fields.startDate.value) return;
            fixedDatesDirty = true;
            rdates = uniqueDates([...rdates, picker.value]);
            exdates = exdates.filter((date) => date !== picker.value);
            picker.value = "";
            renderLists();
            synchronize();
        });
        form.querySelector("[data-add-exdate]").addEventListener("click", () => {
            const picker = form.querySelector("[data-exdate-picker]");
            if (!picker.value) return;
            fixedDatesDirty = true;
            exdates = uniqueDates([...exdates, picker.value]);
            rdates = rdates.filter((date) => date !== picker.value);
            picker.value = "";
            renderLists();
            synchronize();
        });
    }

    form.addEventListener("submit", (event) => {
        synchronize();
        if (fields.end.value <= fields.start.value) {
            event.preventDefault();
            fields.endDate.setCustomValidity(config.labels.endMustBeAfterStart);
            fields.endDate.reportValidity();
        } else {
            fields.endDate.setCustomValidity("");
        }
    });

    hydrateRecurrence();
    if (fields.allDay.checked && fields.startDate.value && fields.endDate.value <= fields.startDate.value && !config.scheduleLocked) {
        const end = new Date(`${fields.startDate.value}T00:00:00Z`);
        end.setUTCDate(end.getUTCDate() + 1);
        fields.endDate.value = end.toISOString().slice(0, 10);
        scheduleDirty = true;
        endDirty = true;
    }
    synchronize();
})();
