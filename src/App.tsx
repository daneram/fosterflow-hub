
import React from "react";
import AppProviders from "./providers/AppProviders";
import RoutePreloader from "./routes/RoutePreloader";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <AppProviders>
    <RoutePreloader />
    <AppRoutes />
  </AppProviders>
);

export default App;
