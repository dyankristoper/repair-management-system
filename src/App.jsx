import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import Assignee from "./pages/Assignee";
import Phones from "./pages/Phones";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";

import Settings from "./ui/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import CreateUser from "./pages/CreateUser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <HashRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Assignee />} />
            <Route path="phones" element={<Phones />} />
            <Route path="createUser" element={<CreateUser />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="login" element={<Login />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </HashRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
