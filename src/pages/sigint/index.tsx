/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/
import {
  Globe,
  Radar,
  Layers,
  Radio,
  Shield,
  Satellite,
  AlertTriangle,
  Newspaper,
  Eye,
  Flame,
  CloudLightning,
  Wind,
  Ship,
  Plane,
  Activity,
  Monitor,
  Lock,
  Github,
} from "lucide-react";
import Image from "next/image";
import { Meta, PageContainer } from "@/components";
import JsonLdScript from "@/components/JsonLdScript";
import { sigintProductLd, generateBreadCrumbJsonLd } from "@/lib/json-ld";
import { WaitlistForm } from "@/components/WaitlistForm";

/* ── tiny helpers ─────────────────────────────────────────────────── */
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-eyebrow font-semibold tracking-eyebrow uppercase text-accent mb-3">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h2 tracking-h2 font-semibold text-ink mb-4">
      {children}
    </h2>
  );
}

/* ── data source card ─────────────────────────────────────────────── */
type SourceCardProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
  badge?: string;
  badgeColor?: string;
};

function SourceCard({
  icon,
  name,
  description,
  badge,
  badgeColor = "border border-sky-300/80 bg-sky-100/90 text-sky-700 dark:border-sky-400/20 dark:bg-sky-500/15 dark:text-sky-300",
}: SourceCardProps) {
  return (
    <div className="group relative flex items-start gap-4 overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-accent bg-surface text-accent transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-ink">
            {name}
          </h3>
          {badge && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColor}`}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── capability card ──────────────────────────────────────────────── */
type CapCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function CapCard({ icon, title, description }: CapCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border-accent bg-surface text-accent transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-ink mb-2">
        {title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ── stat counter ─────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-h2 tracking-h2 font-semibold text-accent font-mono">
        {value}
      </div>
      <div className="text-xs text-ink-muted mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

/* ── main page ────────────────────────────────────────────────────── */
export default function SigintPage() {
  return (
    <>
      <Meta
        title="SIGINT Dashboard™ | Real-Time OSINT Intelligence Platform"
        description="Track aircraft, ships, earthquakes, fires, weather, and conflict events on a live interactive globe. Free to self-host. Correlation engine, anomaly detection, and scored alerts across 8+ live data sources."
        image="https://www.wedefendit.com/sigint-og.png"
        imageAlt="SIGINT Dashboard showing live globe with 60,000+ tracked entities, alert scoring, intel feed, and video monitoring"
        url="https://www.wedefendit.com/sigint"
        canonical="https://www.wedefendit.com/sigint"
        keywords="OSINT dashboard, SIGINT, real-time intelligence, aircraft tracking, AIS vessel tracking, earthquake monitoring, fire detection, GDELT, FIRMS, NOAA weather, live globe, situational awareness, threat detection, anomaly detection, correlation engine, open source intelligence, self-hosted OSINT"
        structuredData={sigintProductLd}
      />
      <JsonLdScript
        jsonLd={generateBreadCrumbJsonLd({
          items: [{ name: "Home", href: "/" }, { name: "SIGINT Dashboard" }],
        })}
      />

      <PageContainer>
        <div className="w-full max-w-6xl mx-auto px-4 space-y-20 pb-16">
          {/* ── Hero ──────────────────────────────────────────────── */}
          <header className="text-center pt-4 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-6">
              <Radar className="w-3.5 h-3.5" />
              <span>OSINT dashboard project by Defend I.T. Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] text-ink mb-3">
              <span className="text-accent">
                SIGINT Dashboard&trade;
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-4xl font-medium text-ink-muted mb-6">
              Real-Time Intelligence, Correlated
            </p>

            <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-8 leading-relaxed">
              Live aircraft, vessels, weather alerts, earthquakes, fires,
              conflict events, and news in one interface. Explore the live demo
              in your browser, or self-host it on your own server.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
              <a
                href="https://sigint-5154d935429b.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/85 bg-emerald-100/92 px-8 py-4 text-lg font-medium text-emerald-900 shadow-[0_12px_28px_rgba(16,185,129,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500/90 hover:bg-emerald-100 hover:text-emerald-950 hover:shadow-[0_16px_34px_rgba(16,185,129,0.2)] dark:border-green-500/30 dark:bg-emerald-950/40 dark:text-green-300 dark:shadow-[0_14px_28px_rgba(16,185,129,0.14)] dark:hover:border-green-400 dark:hover:bg-emerald-950/55 dark:hover:text-green-200 dark:hover:shadow-[0_18px_34px_rgba(16,185,129,0.2)]"
              >
                <Globe className="w-5 h-5" />
                Live Demo
              </a>
              <a
                href="https://github.com/wedefendit/sigint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-8 py-4 text-lg font-medium text-slate-800 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/80 hover:bg-white hover:text-sky-800 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)] dark:border-slate-600 dark:bg-slate-950/78 dark:text-slate-200 dark:shadow-[0_14px_28px_rgba(2,6,23,0.22)] dark:hover:border-sky-400/28 dark:hover:bg-slate-900 dark:hover:text-sky-200"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            {/* Hero screenshot */}
            <div className="relative rounded-lg overflow-hidden border border-hairline/50 shadow-2xl shadow-black/50">
              <Image
                src="/img/sigint/sigint-hero.png"
                alt="SIGINT dashboard showing live globe with 64,000+ tracked entities, alert log, intel feed, news feed, and video monitoring"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
                <span>64,354 tracks</span>
                <span>All sources active</span>
              </div>
            </div>
          </header>

          {/* ── Stats bar ─────────────────────────────────────────── */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y border-hairline/50">
            <Stat value="60K+" label="Live Tracks" />
            <Stat value="8+" label="Data Sources" />
            <Stat value="<4min" label="Refresh Cycle" />
            <Stat value="24/7" label="Monitoring" />
          </section>

          {/* ── Data Sources ──────────────────────────────────────── */}
          <section>
            <div className="text-center mb-10">
              <SectionTag>Intelligence Sources</SectionTag>
              <SectionTitle>Live Data Feeds. One Dashboard.</SectionTitle>
              <p className="text-ink-muted max-w-2xl mx-auto">
                Every source is fetched, parsed, cached, and rendered
                automatically. Open the dashboard and see aircraft, vessels,
                crisis events, weather alerts, fires, quakes, and news in one
                place instead of chasing half a dozen tabs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <SourceCard
                icon={<Plane className="w-5 h-5" />}
                name="Aircraft Tracking"
                description="Live global aircraft positions from OpenSky Network. Callsign, altitude, speed, heading, squawk codes. Military aircraft classification and emergency detection."
                badge="LIVE"
                badgeColor="bg-green-500/20 text-green-300"
              />
              <SourceCard
                icon={<Ship className="w-5 h-5" />}
                name="AIS Vessel Tracking"
                description="Real-time global vessel positions via AIS stream. MMSI, IMO, type, flag, destination, navigation status. WebSocket streaming for near-zero latency."
                badge="LIVE"
                badgeColor="bg-green-500/20 text-green-300"
              />
              <SourceCard
                icon={<Activity className="w-5 h-5" />}
                name="Seismic Monitoring"
                description="USGS earthquake data covering the past 7 days. Magnitude, depth, tsunami alerts, felt reports. Pulse rendering scales with magnitude."
              />
              <SourceCard
                icon={<Flame className="w-5 h-5" />}
                name="Fire Detection"
                description="NASA FIRMS VIIRS satellite fire hotspot data. Fire radiative power, brightness temperature, confidence levels. 30K–100K+ detections per day globally."
              />
              <SourceCard
                icon={<AlertTriangle className="w-5 h-5" />}
                name="Conflict & Crisis Events"
                description="GDELT 2.0 geolocated news events. Conflict, protests, diplomatic actions scored by severity. 15-minute server-side polling with 7-day rolling window."
              />
              <SourceCard
                icon={<CloudLightning className="w-5 h-5" />}
                name="Severe Weather Alerts"
                description="NOAA National Weather Service active severe weather alerts. Severity classification, area descriptions, onset/expiry tracking."
              />
              <SourceCard
                icon={<Wind className="w-5 h-5" />}
                name="Tropical Cyclone Tracking"
                description="NOAA National Hurricane Center active storms across the Atlantic and Pacific basins. Saffir-Simpson category, position, intensity, and the official forecast track and cone."
              />
              <SourceCard
                icon={<Newspaper className="w-5 h-5" />}
                name="World News Aggregation"
                description="RSS feeds from Reuters, NYT, BBC, Al Jazeera, The Guardian, and NPR. Stay informed alongside your data without switching tabs."
              />
            </div>
          </section>

          {/* ── Capabilities ──────────────────────────────────────── */}
          <section id="capabilities">
            <div className="text-center mb-10">
              <SectionTag>Capabilities</SectionTag>
              <SectionTitle>
                More Than a Map. An Intelligence Workstation.
              </SectionTitle>
              <p className="text-ink-muted max-w-2xl mx-auto">
                SIGINT is built to reduce context switching and surface what
                matters faster. The point is not just to show a map. It is to
                help one person or a small team move from raw feeds to usable
                awareness.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CapCard
                icon={<Globe className="w-6 h-6" />}
                title="Interactive Globe & Flat Map"
                description="Switch between 3D globe and flat map projections. Smooth animations, trail rendering, and zoom from global overview down to street level with 60K+ tracks."
              />
              <CapCard
                icon={<Radar className="w-6 h-6" />}
                title="Correlation Engine"
                description="Automatically connects events across sources. Conflict near a fire? Earthquake followed by secondary fires? Military aircraft near a crisis zone? SIGINT finds it."
              />
              <CapCard
                icon={<Eye className="w-6 h-6" />}
                title="Anomaly Detection"
                description="Learns what's normal for each region over time. A M3.5 in Virginia scores higher than a M5 in Chile because Virginia has no seismic baseline."
              />
              <CapCard
                icon={<Layers className="w-6 h-6" />}
                title="Multi-Pane Layout"
                description="Split, resize, drag, minimize, and save layout presets. Run the globe, data table, dossier, intel feed, alert log, video, news, and console all at once."
              />
              <CapCard
                icon={<Monitor className="w-6 h-6" />}
                title="Live Video Monitoring"
                description="Stream live news from thousands of channels. Grid layouts up to 3x3, saved presets, and one-click channel switching."
              />
              <CapCard
                icon={<Satellite className="w-6 h-6" />}
                title="Watch Mode"
                description="Hands-free tour of high-priority events. The globe cycles through scored alerts, syncing every pane automatically."
              />
              <CapCard
                icon={<Shield className="w-6 h-6" />}
                title="Entity Dossier"
                description="Click any track for the full picture. Aircraft photos, routes, vessel details, seismic data, and links to external intelligence sources."
              />
              <CapCard
                icon={<Radio className="w-6 h-6" />}
                title="Alert Scoring"
                description="Every alert gets a 1-10 composite score based on severity, regional context, cross-source correlation, and military classification."
              />
              <CapCard
                icon={<Lock className="w-6 h-6" />}
                title="Secure by Default"
                description="Token-authenticated API, encrypted cookies, per-IP rate limiting. Every route is protected out of the box."
              />
            </div>
          </section>

          {/* ── Screenshots ───────────────────────────────────────── */}
          <section>
            <div className="text-center mb-10">
              <SectionTag>In Action</SectionTag>
              <SectionTitle>See What SIGINT Sees</SectionTitle>
              <p className="text-ink-muted max-w-2xl mx-auto">
                Real screenshots from live sessions, not mockups. Every data
                point, alert, and video feed is real.
              </p>
            </div>

            <div className="space-y-12">
              {/* Emergency detection */}
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 rounded-lg overflow-hidden border border-hairline/50 shadow-xl">
                  <Image
                    src="/img/sigint/sigint-emergency.png"
                    alt="SIGINT detecting a 7700 emergency squawk with trail tracking, dossier, and live video feeds"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-red-300/80 bg-red-100/90 px-2.5 py-1 text-xs font-bold text-red-700 dark:border-red-500/20 dark:bg-red-500/15 dark:text-red-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    EMERGENCY DETECTION
                  </div>
                  <h3 className="text-xl font-bold text-ink">
                    Squawk 7700: Instant Alert
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    A Gulfstream G550 declares emergency over Texas. SIGINT
                    picks up the squawk, scores the alert, renders the full
                    trail, and pulls the aircraft dossier with identity,
                    telemetry, route, and intel links. Four live news streams
                    running alongside.
                  </p>
                </div>
              </div>

              {/* Hijack + trail */}
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-2 space-y-3 order-2 md:order-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/80 bg-violet-100/90 px-2.5 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/15 dark:text-violet-300">
                    <Plane className="w-3.5 h-3.5" />
                    TRAIL TRACKING
                  </div>
                  <h3 className="text-xl font-bold text-ink">
                    Squawk 7500: Route Reconstruction
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    American Airlines A321 squawking hijack. Trail shows every
                    recorded position with interpolated waypoints. Dossier pulls
                    a photo from Planespotters, displays available route info,
                    and provides LOCATE/FOCUS/SOLO isolation controls.
                  </p>
                </div>
                <div className="md:col-span-3 rounded-lg overflow-hidden border border-hairline/50 shadow-xl order-1 md:order-2">
                  <Image
                    src="/img/sigint/sigint-hijack-trail.png"
                    alt="SIGINT tracking a squawk 7500 hijack code with trail rendering and aircraft dossier with photo"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* GDELT events */}
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 rounded-lg overflow-hidden border border-hairline/50 shadow-xl">
                  <Image
                    src="/img/sigint/sigint-gdelt.png"
                    alt="SIGINT showing GDELT crisis event detail with 60K tracks, video feeds, alerts, and intel feed"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/80 bg-sky-100/90 px-2.5 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/15 dark:text-sky-300">
                    <Globe className="w-3.5 h-3.5" />
                    SITUATIONAL AWARENESS
                  </div>
                  <h3 className="text-xl font-bold text-ink">
                    60K+ Tracks, One Screen
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Globe view with 60,000+ live entities. A GDELT crisis event
                    selected showing headline, severity, tone, and source. Four
                    live video feeds streaming. 546 active alerts. 28,000+
                    correlated intel items.
                  </p>
                </div>
              </div>

              {/* Hijack dossier */}
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-2 space-y-3 order-2 md:order-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-100/90 px-2.5 py-1 text-xs font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300">
                    <Eye className="w-3.5 h-3.5" />
                    ENTITY DOSSIER
                  </div>
                  <h3 className="text-xl font-bold text-ink">
                    Full Aircraft Intelligence
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Allegiant Air A319 squawking 7500. Dossier shows full
                    identity (callsign, ICAO24, type, registration, operator,
                    manufacturer), live telemetry at 28,750 ft and 494 kn, and
                    available route information. Intel links to FlightAware,
                    FR24, and ADS-B Exchange.
                  </p>
                </div>
                <div className="md:col-span-3 rounded-lg overflow-hidden border border-hairline/50 shadow-xl order-1 md:order-2">
                  <Image
                    src="/img/sigint/sigint-hijack-dossier.png"
                    alt="SIGINT aircraft dossier showing full identity, telemetry, route details for a squawk 7500 aircraft"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Tech Stack ────────────────────────────────────────── */}
          <section className="rounded-2xl border border-slate-200/80 bg-white/72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_60%)] px-6 py-10 shadow-[0_16px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/70 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/58 dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_62%)] dark:shadow-[0_20px_40px_rgba(2,6,23,0.32)] dark:ring-white/5">
            <div className="text-center mb-8">
              <SectionTag>Architecture</SectionTag>
              <SectionTitle>Built as a Real Product, Not a Mockup</SectionTitle>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-ink mb-1">
                  60K+
                </div>
                <p className="text-xs text-ink-muted">
                  Tracks rendered smoothly in live sessions, with the UI staying
                  responsive under load.
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink mb-1">
                  Single Deploy
                </div>
                <p className="text-xs text-ink-muted">
                  Simple to self-host. One deploy gets the whole dashboard
                  running on your own server.
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink mb-1">
                  Offline Ready
                </div>
                <p className="text-xs text-ink-muted">
                  Installable as a PWA, with fast reloads and cached state for
                  repeat use.
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink mb-1">
                  Open Stack
                </div>
                <p className="text-xs text-ink-muted">
                  Self-hostable on your own infrastructure, with your own API
                  keys and environment.
                </p>
              </div>
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────── */}
          <section className="text-center py-12">
            <h2 className="text-h2 tracking-h2 font-semibold text-ink mb-4">
              Ready to See It Live?
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto mb-8">
              SIGINT Dashboard is a live, working project. Try the demo now, or
              join the waiting list to hear when new features ship.
            </p>
            <div className="max-w-lg mx-auto mb-6">
              <WaitlistForm />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://sigint-5154d935429b.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/85 bg-emerald-100/92 px-8 py-4 text-lg font-medium text-emerald-900 shadow-[0_12px_28px_rgba(16,185,129,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500/90 hover:bg-emerald-100 hover:text-emerald-950 hover:shadow-[0_16px_34px_rgba(16,185,129,0.2)] dark:border-green-500/30 dark:bg-emerald-950/40 dark:text-green-300 dark:shadow-[0_14px_28px_rgba(16,185,129,0.14)] dark:hover:border-green-400 dark:hover:bg-emerald-950/55 dark:hover:text-green-200 dark:hover:shadow-[0_18px_34px_rgba(16,185,129,0.2)]"
              >
                <Globe className="w-5 h-5" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/wedefendit/sigint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-8 py-4 text-lg font-medium text-slate-800 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/80 hover:bg-white hover:text-sky-800 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)] dark:border-slate-600 dark:bg-slate-950/78 dark:text-slate-200 dark:shadow-[0_14px_28px_rgba(2,6,23,0.22)] dark:hover:border-sky-400/28 dark:hover:bg-slate-900 dark:hover:text-sky-200"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
