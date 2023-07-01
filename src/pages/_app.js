import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
