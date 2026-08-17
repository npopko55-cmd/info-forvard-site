import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { getLanding } from "@/lib/landings";

const L = getLanding("audit");

export const metadata: Metadata = {
  title: L.meta.title,
  description: L.meta.description,
};

export default function AuditLandingPage() {
  return <LandingPage slug="audit" />;
}
