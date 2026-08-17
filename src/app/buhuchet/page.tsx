import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { getLanding } from "@/lib/landings";

const L = getLanding("buhuchet");

export const metadata: Metadata = {
  title: L.meta.title,
  description: L.meta.description,
};

export default function Landing_buhuchet_Page() {
  return <LandingPage slug="buhuchet" />;
}
