import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LexFinPage from "./pages/LexFinPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LexFinPage />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
