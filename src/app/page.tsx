import Nav from "@/components/nav/nav";
import Hero from "@/components/hero/hero";
import MarketShifts from "@/components/market-shifts/market-shifts";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarketShifts />
      </main>
    </>
  );
}
