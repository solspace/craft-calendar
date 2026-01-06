import dayGrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import type { FC } from "react";
import { useEventsQuery } from "./queries/events.query";

export const App: FC = () => {
  const start = new Date("2026-01-01");
  const end = new Date("2026-01-31");

  const { data, isFetching } = useEventsQuery(start, end);

  return (
    <div>
      <FullCalendar
        plugins={[dayGrid, interaction]}
        initialView="dayGridMonth"
        eventClick={console.log}
        dateClick={console.log}
        events={data}
        eventContent={RenderTest}
      />
    </div>
  );
};

const RenderTest: FC = (props) => {
  console.log(props);

  return (
    <div>
      test <b>chum</b>
    </div>
  );
};
