import { utcToLocalDisplayDate } from "@cal/utils/date";
import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import { eventSelectors } from "@event-builder/store/event.slice";
import { format } from "date-fns";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../store/app.slice";
import type { BuilderContext } from "../types";
import { SeriesWrapper } from "./series.styles";

type Props = {
  context: BuilderContext;
};

/**
 * Where the event sits in its series, and what applying an "Edit this and following" draft does.
 */
export const Series: FC<Props> = ({ context }) => {
  const { allDay } = useSelector(eventSelectors.state);
  const formats = useSelector(appSelectors.formats);
  const formatDate = (timestamp: number, withTime = false): string =>
    format(
      utcToLocalDisplayDate(new Date(timestamp * 1000)),
      withTime ? (formats?.datetime.short.icu ?? "Pp") : (formats?.date.short.icu ?? "P"),
      { locale: getDateLocale() },
    );
  const { splitAt, series } = context;
  const earlier = series?.earlier ?? null;
  const later = series?.later ?? null;

  if (!splitAt && !earlier && !later) {
    return null;
  }

  return (
    <SeriesWrapper>
      {splitAt && (
        <p>
          {translate(
            "This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.",
            { date: formatDate(splitAt, !allDay) },
          )}
        </p>
      )}

      {(earlier || later) && (
        <nav>
          <span>{translate("Part of a series")}</span>
          {earlier && (
            <a href={earlier.url}>
              ← {translate("Earlier part, from {date}", { date: formatDate(earlier.start) })}
            </a>
          )}
          {later && (
            <a href={later.url}>
              {translate("Later part, from {date}", { date: formatDate(later.start) })} →
            </a>
          )}
        </nav>
      )}
    </SeriesWrapper>
  );
};
