import { AgendaWidget } from "@widgets/agenda/agenda";
import { registerLoader } from "../loader";
import type { AgendaWidgetConfig } from "./agenda.types";

registerLoader<AgendaWidgetConfig>("agenda", AgendaWidget);
