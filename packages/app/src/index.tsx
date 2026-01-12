import { queryClient } from "@config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../config";

import { App } from "@cal/app";
import { Calendar } from "@cal/pages/calendar/calendar";
import { generateUrl } from "@cal/utils/urls";

const container = document.getElementById("calendar-app");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter basename={generateUrl("/", false)}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Calendar />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>,
);
