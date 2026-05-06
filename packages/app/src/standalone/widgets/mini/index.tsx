import { registerLoader } from "../loader";
import { Mini } from "./mini";
import type { MiniWidgetConfig } from "./mini.types";

registerLoader<MiniWidgetConfig>("mini", Mini);
