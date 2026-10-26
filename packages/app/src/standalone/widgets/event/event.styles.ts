import {
  AllDayRow,
  CreateActions,
  CreateFormBody,
  FlexTitle,
  RepeatControls,
} from "@cal/pages/calendar/popovers/create-event/create-event.styles";
import styled from "styled-components";
import { widgetChrome } from "../widget.shared";

export const EventWidgetWrapper = styled.div`
  ${widgetChrome}
  container-type: inline-size;

  [data-quick-create-variant="widget"] { width: 100%; max-width: none; max-height: none; }
  ${CreateFormBody} { padding: 0; overflow: visible; scrollbar-gutter: auto; }
  ${FlexTitle} { padding-bottom: 14px; }
  ${CreateActions} { margin-top: 14px; padding: 12px 0 0; gap: 10px; border-top: 0; }
  ${AllDayRow} { min-height: 24px; }
  ${RepeatControls} { padding: 10px; }
  .field { min-width: 0; margin: 0; }
  .heading { margin-bottom: 5px; }
  label { font-size: 12px; }
  input.text, select { min-height: 34px; width: 100%; }
  textarea.text { font-size: 13px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; }
  .btn:disabled { opacity: 0.5; cursor: default; }
  .error { margin: 12px 0 0; font-size: 12px; line-height: 1.5; }
  .calendar-widget-success {
    display: grid;
    gap: 4px;
    margin: 12px 0 0;
    padding: 10px 12px;
    border: 1px solid var(--gray-150);
    border-radius: 5px;
    color: var(--enabled-color, #008539);
    background: var(--green-050, #f1fcf5);
    font-size: 12px;
    line-height: 1.5;
  }
`;
