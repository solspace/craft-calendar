import { registerLoader } from "../loader";
import { EventWidget } from "./event";
import type { EventWidgetConfig } from "./event.types";

registerLoader<EventWidgetConfig>("event", EventWidget);
