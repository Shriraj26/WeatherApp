import Head from "next/head";
import Weather from "@/components/Weather";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="A mimalistic weather application that displays weather for a given city."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/weather.png" />
      </Head>

      <Weather />
    </>
  );
}
