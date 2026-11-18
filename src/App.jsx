import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Plus,
  ArrowUp,
  Tag,
  Zap,
  ScanFace,
  BarChart3,
  Sparkles,
  Link2,
  Video,
  FileText,
  Film,
  Code2,
  Database,
  Clock,
  Compass,
  ChevronDown,
  Copy,
  Check,
  Play,
  Pause,
  ExternalLink,
  Menu,
  X,
  Layers,
  Terminal,
  Cpu,
  Boxes,
  TextSearch,
  Braces,
  Timer,
  Plug,
  MessageSquareQuote
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// ASSET CONSTANTS (from live jockey.stuudio.xyz)
// ==========================================
const BASE_URL = 'https://jockey.stuudio.xyz';
const VID_UGC_AD = `${BASE_URL}/video/audience/ugc-ad.mp4`;
const VID_GLASSES = `${BASE_URL}/video/audience/glasses.mp4`;
const VID_ORDINARY = `${BASE_URL}/video/audience/the-ordinary.mp4`;
const VID_MAKE_UP = `${BASE_URL}/video/audience/make-up.mp4`;
const VID_TRAVEL_BEACH = `${BASE_URL}/video/audience/travel-beach.mp4`;
const VID_TRAVEL_NATURE = `${BASE_URL}/video/audience/travel-nature.mp4`;
const VID_PICCADILLY = `${BASE_URL}/video/demo/piccadilly-night.mp4`;
const VID_FOOTER = `${BASE_URL}/video/footer/footer-clip.mp4`;

const POSTER_UGC = `${BASE_URL}/img/audience/ugc-ad-poster.jpg`;
const POSTER_GLASSES = `${BASE_URL}/img/audience/glasses-poster.jpg`;
const POSTER_ORDINARY = `${BASE_URL}/img/audience/the-ordinary-poster.jpg`;
const POSTER_MAKE_UP = `${BASE_URL}/img/audience/make-up-poster.jpg`;
const POSTER_STUDIO = `${BASE_URL}/img/audience/studio.jpg`;
const POSTER_OCEAN = `${BASE_URL}/img/audience/ocean.jpg`;

const IMG_HIKE_CANYON = `${BASE_URL}/img/mcp/hike-canyon.jpg`;
const IMG_HIKE_RIDGE = `${BASE_URL}/img/mcp/hike-ridge.jpg`;
const IMG_HIKE_OVERLOOK = `${BASE_URL}/img/mcp/hike-overlook.jpg`;

// TwelveLabs Brand SVG Icon
function TwelveLabsIcon({ className = 'h-[22px] md:h-[26px] w-auto shrink-0', style = {} }) {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <rect x="7.18555" y="8.23438" width="10.5335" height="1.42923" rx="0.419349" />
      <rect y="8.23438" width="5.7773" height="1.42923" rx="0.419349" />
      <rect x="20.3379" y="8.23438" width="6.59571" height="1.42923" rx="0.419349" />
      <rect x="21.2832" y="6.1875" width="5.65048" height="1.42923" rx="0.419349" />
      <rect x="27.6777" y="6.1875" width="4.48085" height="1.42923" rx="0.419349" />
      <rect x="25.7676" y="4.09375" width="5.10068" height="1.42923" rx="0.419349" />
      <rect x="27.3848" y="2.04688" width="1.50077" height="1.42923" rx="0.419349" />
      <rect x="12.1719" y="18.4766" width="2.59751" height="1.42923" rx="0.419349" />
      <rect x="16.6816" y="18.4766" width="1.70193" height="1.42923" rx="0.419349" />
      <rect x="19.1699" y="18.4766" width="4.58966" height="1.42923" rx="0.419349" />
      <rect x="21.4688" y="16.4258" width="1.90502" height="1.42923" rx="0.419349" />
      <rect x="8.5918" y="18.4766" width="1.50077" height="1.42923" rx="0.419349" />
      <rect x="15.5195" y="20.5234" width="1.50077" height="1.42923" rx="0.419349" />
      <rect x="14.0547" y="22.5703" width="1.42919" height="1.42923" rx="0.419349" />
      <rect x="19.7246" width="1.86002" height="1.42923" rx="0.419349" />
      <rect x="9.14453" y="6.1875" width="4.75784" height="1.42923" rx="0.419349" />
      <rect x="17.9668" y="2.04688" width="2.8901" height="1.42923" rx="0.419349" />
      <rect x="16.1934" y="4.09375" width="4.66378" height="1.42923" rx="0.419349" />
      <rect x="30.7012" y="8.23438" width="2.72147" height="1.42923" rx="0.419349" />
      <rect x="5.01367" y="10.2852" width="13.4447" height="1.42923" rx="0.419349" />
      <rect x="17.2188" y="14.3789" width="5.25254" height="1.42923" rx="0.419349" />
      <rect x="7.18555" y="12.332" width="17.0809" height="1.42923" rx="0.419349" />
      <rect x="4.57031" y="14.3789" width="6.35029" height="1.42923" rx="0.419349" />
      <rect x="10.3691" y="16.4258" width="2.08303" height="1.42923" rx="0.419349" />
      <rect x="17.7188" y="16.4258" width="2.24259" height="1.42923" rx="0.419349" />
      <rect x="6.52344" y="16.4258" width="2.10538" height="1.42923" rx="0.419349" />
      <rect x="20.3379" y="10.2852" width="5.43001" height="1.42923" rx="0.419349" />
      <rect x="21.5996" y="4.07812" width="1.50077" height="1.42923" rx="0.419349" />
    </svg>
  );
}

// 4 Hero Storytelling Stages data from live next.js chunk
const HERO_STAGES = [
  {
    n: '01',
    t: 'SEARCH',
    lead: 'Find any moment by meaning.',
    body: 'Search across every video and photo in your library. No tags, no filenames, just what you’re looking for.',
    facetLabel: 'Search by',
    facets: ['Phrase', 'Image', 'Clip', 'Person', 'Place', 'Action', 'Object'],
    eg: 'Find every shot of the red car at night.'
  },
  {
    n: '02',
    t: 'UNDERSTAND',
    lead: 'Know what happens inside your media.',
    body: 'Jockey reads each clip and explains what’s there, scene by scene, moment by moment.',
    facetLabel: 'Understand',
    facets: ['Scenes', 'Context', 'Captions', 'Topics', 'Sentiment', 'Key moments'],
    eg: 'Identify my 3 most engaging tutorial videos, explain why they succeeded, and write a 60-second script matching that style.'
  },
  {
    n: '03',
    t: 'ORGANIZE',
    lead: 'Group videos and photos automatically.',
    body: 'Footage sorts itself into meaningful sets. No manual foldering, no naming conventions.',
    facetLabel: 'Group by',
    facets: ['Person', 'Place', 'Topic', 'Event', 'Character', 'Project', 'Scene', 'Episode', 'Storyline'],
    eg: 'Group all footage from conference sessions featuring the CEO.'
  },
  {
    n: '04',
    t: 'GENERATE',
    lead: 'Turn input into usable media.',
    body: 'Ask, and Jockey assembles finished media straight from your source footage.',
    facetLabel: 'Generate',
    facets: ['Clips', 'Collections', 'Timelines', 'Sequences', 'Roadmaps', 'Highlights'],
    eg: 'Make me a highlight reel of my trip to Spain.'
  }
];

const TAXONOMY_WORDS = [
  'Person', 'Face', 'Action', 'Motion', 'Place', 'Scene', 'Object', 'Logo',
  'Concept', 'Topic', 'Speech', 'Caption', 'Moment', 'Sentiment', 'Colour', 'Shot'
];

// Helper to generate dynamic canvas texture for 3D room tiles
function createTileTexture(label, sub, tag, hue) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 640, 360);
  grad.addColorStop(0, `hsl(${hue}, 45%, 15%)`);
  grad.addColorStop(0.5, `hsl(${hue}, 30%, 8%)`);
  grad.addColorStop(1, '#050506');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 640, 360);

  // Wireframe grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 640; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke();
  }
  for (let y = 0; y < 360; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
  }

  // Tag Badge
  ctx.fillStyle = 'rgba(166, 239, 128, 0.15)';
  ctx.beginPath();
  ctx.roundRect(32, 32, 120, 28, 6);
  ctx.fill();
  ctx.strokeStyle = '#a6ef80';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#a6ef80';
  ctx.font = '600 11px monospace';
  ctx.fillText(tag, 42, 50);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '500 22px sans-serif';
  ctx.fillText(label, 32, 300);

  // Subtitle / Timecode
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '400 13px monospace';
  ctx.fillText(sub, 32, 326);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ==========================================
// 1. FIXED HEADER WITH DYNAMIC LUMINANCE
// ==========================================
function Header({ currentTheme = 'dark' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = currentTheme === 'light';

  return (
    <div className="relative z-[60]">
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${
          isLight
            ? 'bg-white/85 text-[#1d1c1c] border-b border-black/[0.08] backdrop-blur-md'
            : 'bg-black/60 text-white border-b border-white/[0.08] backdrop-blur-md'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="relative z-10 w-full max-w-shell mx-auto px-6 py-4 sm:px-6 md:px-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              
              </div>
            </div>
          </div>

          {/* Active Storytelling Stage Sidebar (01 · SEARCH / 02 · UNDERSTAND / 03 · ORGANIZE / 04 · GENERATE) */}
          <div className="pointer-events-none absolute inset-x-0 top-24 bottom-24 z-[26] hidden min-[64.0625rem]:flex justify-between items-center px-10">
            {/* Left Stage Details */}
            <div className="max-w-[340px] flex flex-col items-start transition-opacity duration-300">
              <span className="inline-flex items-center gap-[4px] h-[24px] rounded-[7px] text-[12px] font-mono uppercase tracking-[0.04em] px-2.5 py-0.5 border border-[#a6ef80]/40 text-[#a6ef80] bg-black/40 backdrop-blur-md mb-3">
                {activeStage.n} · {activeStage.t}
              </span>
              <h2 className="text-3xl font-normal leading-tight text-white font-sans">
                {activeStage.lead}
              </h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {activeStage.body}
              </p>
            </div>

            {/* Right Taxonomy Facet Pills */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-1">
                {activeStage.facetLabel}
              </span>
              <div className="flex flex-col items-end gap-1.5">
                {activeStage.facets.map((facet, idx) => {
                  const isActive = activeFacet === facet;
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                        isActive
                          ? 'bg-[#a6ef80] text-black font-semibold shadow-[0_0_15px_rgba(166,239,128,0.5)] scale-105'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
                      }`}
                    >
                      {facet}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Centered Pinned Search Bar */}
          <div
            ref={searchBarRef}
            className="pointer-events-none absolute z-[35] w-[min(92vw,640px)] flex flex-col items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="pointer-events-auto w-full">
              <div className="relative flex flex-col gap-[8px] items-start justify-end px-[16px] py-[13px] rounded-[24px] shrink-0 w-full bg-black/90 border border-white/20 backdrop-blur-xl shadow-2xl">
                <div className="flex gap-[12px] items-center relative w-full">
                  <button className="flex items-center justify-center p-[6px] rounded-[8px] shrink-0 text-white/50 hover:text-white transition-colors">
                    <Search size={18} />
                  </button>

                  <div className="flex flex-1 gap-[10px] items-center min-w-0 py-[6px]">
                    <p className="text-[15px] leading-[20px] whitespace-nowrap text-left font-sans text-white font-medium">
                      {promptText}
                      <span className="inline-block w-[2px] h-[16px] ml-1 bg-[#a6ef80] animate-pulse align-middle" />
                    </p>
                  </div>

                  {activeFacet && (
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#a6ef80]/20 text-[#a6ef80] border border-[#a6ef80]/40 animate-pulse">
                      {activeFacet}
                    </span>
                  )}

                  <div className="flex items-center shrink-0">
                    <button
                      className="flex items-center justify-center rounded-[12px] size-[34px] bg-[#262626] text-white hover:bg-[#333333] transition-colors shadow-inner"
                      aria-label="Send query"
                    >
                      <ArrowUp size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs select-none px-2 max-w-[620px] mx-auto">
                <span className="text-white/45 font-medium text-[13px] mr-1">Popular Searches:</span>
                {['Air Quality', 'Marine', 'Biodiversity', 'Water', 'Climate', 'Protected Areas'].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPromptText(item)}
                      className="px-2.5 py-1 rounded-full text-white/75 hover:text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all text-[12px] cursor-pointer"
                    >
                      {item}
                    </button>
                    {idx < 5 && <span className="text-white/20">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ==========================================
// 3. USE CASES SECTION (#use-cases, dark)
// 3 Vertical Rotating Phone Cards + 3 Audiences
// ==========================================
function UseCases() {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-rotating carousel state for 3 phone cards
  const [phoneCardIndex, setPhoneCardIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhoneCardIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const AUDIENCES = [
    {
      id: 'marketing',
      tag: 'Marketing Teams',
      headline: "Know every ad you've ever run.",
      blurb: 'The same intelligence, pointed at your creative library.',
      cta: 'https://playground.twelvelabs.io/get-started?option=jockey&path=agent',
      features: [
        {
          icon: Tag,
          title: 'Automatic Ad Tagging',
          desc: 'Every ad watched and labeled by hook, talent, format, and tone the moment it lands.'
        },
        {
          icon: Zap,
          title: 'Winning Hook Detection',
          desc: 'See which opening three seconds actually hold attention across your whole library.'
        },
        {
          icon: ScanFace,
          title: 'Talent & Logo Recognition',
          desc: 'Find every ad a creator, spokesperson, or brand mark appears in, without opening a file.'
        },
        {
          icon: BarChart3,
          title: 'Format & Trend Breakdown',
          desc: 'Compare performance across formats and spot the pattern before your next shoot.'
        }
      ]
    },
    {
      id: 'creators',
      tag: 'AI-Native Creators',
      headline: 'Your whole archive, on tap.',
      blurb: 'Talk to your footage in the assistant you already use.',
      cta: 'https://playground.twelvelabs.io/get-started?option=jockey&path=agent',
      features: [
        {
          icon: Plug,
          title: 'Connect to Claude',
          desc: 'Plug your archive into the assistant you already use and talk to. ChatGPT coming soon.'
        },
        {
          icon: Search,
          title: 'Search How You Think',
          desc: 'Describe a moment in plain language and Jockey finds the exact clip, not the folder.'
        },
        {
          icon: MessageSquareQuote,
          title: 'Find Any Quote',
          desc: "Search everything you've ever said on camera and jump straight to the line."
        },
        {
          icon: Film,
          title: 'Instant Highlight Reels',
          desc: 'Point Jockey at a topic and get an edit-ready cut of your best moments back.'
        }
      ]
    },
    {
      id: 'developers',
      tag: 'Developers',
      headline: 'Video understanding, as an API.',
      blurb: "Search, extract and embed what's inside your users' footage.",
      cta: 'https://playground.twelvelabs.io/get-started?option=jockey&path=sdk',
      features: [
        {
          icon: Boxes,
          title: 'Multimodal Embeddings',
          desc: 'One embedding across video, image, audio, and text to power your own retrieval and ranking.'
        },
        {
          icon: TextSearch,
          title: 'Natural-Language Search',
          desc: "Ship a search bar that understands what's in your users' videos, not just the filenames."
        },
        {
          icon: Braces,
          title: 'Structured Data Extraction',
          desc: 'Define a JSON schema and get back timestamped, machine-readable metadata for every video.'
        },
        {
          icon: Timer,
          title: 'Frame-Accurate Timestamps',
          desc: 'Every result maps back to the exact moment, so you can deep-link straight into playback.'
        }
      ]
    }
  ];

  const currentAudience = AUDIENCES[activeTab];

  // 3 Phone Cards configuration for Marketing carousel
  const PHONE_CARDS = [
    {
      id: 'make-up',
      src: VID_MAKE_UP,
      poster: POSTER_MAKE_UP,
      badge: 'Educational',
      timecode: '00:03.12',
      tag: 'Skincare Routine',
      retention: 'Viral audio match'
    },
    {
      id: 'glasses',
      src: VID_GLASSES,
      poster: POSTER_GLASSES,
      badge: 'Good Hook',
      timecode: '00:01.84',
      tag: 'Product Focus',
      retention: 'Opening 3 seconds retention 88%'
    },
    {
      id: 'ordinary',
      src: VID_ORDINARY,
      poster: POSTER_ORDINARY,
      badge: 'High Retention',
      timecode: '00:05.40',
      tag: 'Direct to Camera',
      retention: 'Top 5% of catalog'
    }
  ];

  return (
    <section id="use-cases" data-nav="dark" className="relative w-full bg-black py-24 sm:py-32">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        {/* Intro Tag & Heading */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-[4px] h-[24px] rounded-[7px] text-[12px] font-normal uppercase tracking-[0.02em] px-2.5 py-0.5 border border-[#a6ef80]/40 text-[#a6ef80] mb-4">
            Use Cases
          </span>
          <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.05] tracking-tight font-sans">
            Built for every layer of
            <br />
            video intelligence.
          </h2>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
          {AUDIENCES.map((aud, idx) => (
            <button
              key={aud.id}
              onClick={() => setActiveTab(idx)}
              className={`h-[38px] px-4 rounded-[12px] text-sm font-medium transition-all ${
                activeTab === idx
                  ? 'bg-white text-black font-semibold shadow-lg scale-105'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {aud.tag}
            </button>
          ))}
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Blurb, CTA */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <span className="inline-flex items-center gap-[4px] h-[24px] rounded-[7px] text-[12px] font-mono uppercase tracking-[0.02em] px-2 py-0.5 border border-white/20 text-white/70">
              {currentAudience.tag}
            </span>

            <h3 className="mt-4 text-display font-normal leading-[1.08] text-white font-sans text-3xl sm:text-5xl">
              {currentAudience.headline}
            </h3>

            <p className="mt-5 max-w-[340px] text-body text-white/60 text-lg leading-relaxed">
              {currentAudience.blurb}
            </p>

            <a
              href={currentAudience.cta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-[8px] h-[44px] px-[20px] rounded-[14px] bg-white text-black hover:bg-white/90 active:scale-95 transition-all font-medium mt-8"
            >
              <span>Get started</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right Column: Carousel Phone Cards (Marketing) or Live Chat/Terminal (Creators/Developers) */}
          <div className="lg:col-span-8 flex flex-col pl-0 lg:pl-8">
            {activeTab === 0 ? (
              /* Marketing 3 Vertical Phone Cards Side-by-Side */
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl p-6 sm:p-10 mb-12 h-[560px] flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
                  {PHONE_CARDS.map((card, i) => {
                    const offset = ((i - phoneCardIndex) % 3 + 3) % 3;
                    const isCenter = offset === 1;
                    const isLeft = offset === 0;
                    const isRight = offset === 2;

                    return (
                      <div
                        key={card.id}
                        onClick={() => setPhoneCardIndex(i)}
                        className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] overflow-hidden rounded-[1.6rem] border border-white/20 bg-neutral-900 shadow-2xl"
                        style={{
                          width: '260px',
                          height: '460px',
                          transform: isCenter
                            ? 'translateX(0) scale(1) translateZ(0)'
                            : isLeft
                            ? 'translateX(-190px) scale(0.82) translateZ(-50px) rotateY(6deg)'
                            : 'translateX(190px) scale(0.82) translateZ(-50px) rotateY(-6deg)',
                          zIndex: isCenter ? 20 : 10,
                          opacity: isCenter ? 1 : 0.65
                        }}
                      >
                        {/* Video */}
                        <video
                          src={card.src}
                          poster={card.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        />

                        {/* Top Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-medium shadow-md ${
                              isCenter
                                ? 'bg-white text-black'
                                : 'bg-black/80 text-white/80 border border-white/10'
                            }`}
                          >
                            {card.badge}
                          </span>
                        </div>

                        {/* Face Bounding Box on Active Center Card (glasses.mp4) */}
                        {isCenter && card.id === 'glasses' && (
                          <div
                            className="absolute z-20 pointer-events-none border-2 border-[#a6ef80] rounded-lg animate-pulse"
                            style={{
                              top: '28%',
                              left: '26%',
                              width: '48%',
                              height: '32%'
                            }}
                          >
                            <span className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#a6ef80] text-black">
                              GLASSES · 95%
                            </span>
                            {/* Corner crosshairs */}
                            <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-[#a6ef80]" />
                            <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-[#a6ef80]" />
                            <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-[#a6ef80]" />
                            <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-[#a6ef80]" />
                          </div>
                        )}

                        {/* Bottom Overlay Info */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#a6ef80]">
                            <span>{card.timecode}</span>
                            <span>{card.tag}</span>
                          </div>
                          <p className="text-xs text-white/90 font-sans truncate">
                            {card.retention}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : activeTab === 1 ? (
              /* Creators: Conversational Media Chat Mock */
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl p-6 sm:p-8 mb-12">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 text-xs font-mono text-white/50">
                  <span className="size-2 rounded-full bg-[#a6ef80] animate-pulse" />
                  <span>NATURAL LANGUAGE ARCHIVE QUERY</span>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white">
                  <span className="text-[#a6ef80] font-mono">User: </span>
                  “Find the wide landscape shots from the trip”
                </div>
                <div className="mt-3 p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-white/80">
                  <span className="text-[#d97757] font-mono font-semibold">Claude: </span>
                  Three establishing wides — forest, mountains, and open desert, each cut to where the camera settles.
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { clip: VID_TRAVEL_BEACH, time: '0:04–0:11' },
                      { clip: VID_TRAVEL_NATURE, time: '0:26–0:33' },
                      { clip: VID_UGC_AD, time: '1:12–1:19' }
                    ].map((m, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
                        <video src={m.clip} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/80 text-white/70">
                          {m.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Developers: Python API & Live Multimodal Vector Stream */
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl p-6 sm:p-8 mb-12 font-mono text-xs">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white/50">
                  <span>jockey_search_stream.py</span>
                  <span className="text-[#a6ef80]">200 OK · 1024-DIM</span>
                </div>
                <pre className="mt-4 text-[#a6ef80] overflow-x-auto leading-relaxed">
{`client.search(
    index="archive",
    query="crowd reaction after the goal",
    modalities=["video", "image", "audio", "text"]
)`}
                </pre>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/80 font-medium">Hit 01: crowd erupts (tc: 0:02.4)</span>
                  <span className="px-2 py-0.5 rounded bg-[#a6ef80]/20 text-[#a6ef80] border border-[#a6ef80]/40 font-bold">
                    Score: 0.94
                  </span>
                </div>
              </div>
            )}

            {/* 2x2 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {currentAudience.features.map((feat, i) => {
                const IconComponent = feat.icon;
                return (
                  <div key={i} className="flex flex-col">
                    <h4 className="flex items-center gap-2 font-normal text-white text-xl font-sans">
                      <IconComponent size={20} className="text-[#a6ef80] shrink-0" />
                      <span>{feat.title}</span>
                    </h4>
                    <p className="mt-2 text-white/60 text-base leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. INTEGRATION SECTION (#integration, light)
// ==========================================
function Integration() {
  const [copiedMcp, setCopiedMcp] = useState(false);
  const MCP_URL = 'https://mcp.twelvelabs.io/jockey/mcp';

  const handleCopyMcp = () => {
    navigator.clipboard?.writeText(MCP_URL);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  return (
    <section id="integration" data-nav="light" className="light relative bg-white py-24 sm:py-32">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-black/50 border border-black/15 px-2.5 py-1 rounded-[6px]">
            Integration
          </span>
          <h2 className="mt-4 text-display font-normal leading-[1.05] text-[#1d1c1c] font-sans text-4xl sm:text-6xl">
            Ask your library from the chat you already use.
          </h2>
          <p className="mt-5 text-body text-[#1d1c1c]/70 text-xl leading-relaxed">
            Connect your photo and video library, then ask for a person, place, scene, or moment directly inside Claude. No new interface to learn. ChatGPT coming soon.
          </p>

          {/* Copy MCP Server URL Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f4] border border-black/10 font-mono text-sm text-[#1d1c1c]">
              <span className="text-black/50">MCP:</span>
              <span>{MCP_URL}</span>
            </div>
            <button
              onClick={handleCopyMcp}
              className="inline-flex items-center gap-2 h-[44px] px-5 rounded-xl bg-[#1d1c1c] text-white hover:bg-black transition-all active:scale-95 text-sm font-medium"
            >
              {copiedMcp ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedMcp ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Claude Desktop Chat Interface Window */}
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#fbfbfa] shadow-2xl p-6 sm:p-10">
          {/* Claude Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-red-400" />
              <div className="size-3 rounded-full bg-yellow-400" />
              <div className="size-3 rounded-full bg-green-400" />
              <span className="ml-2 text-sm font-medium text-black/60 font-sans">
                Claude 3.5 Sonnet
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Jockey MCP Connected
              </span>
            </div>
          </div>

          {/* Connected Storage Integrations */}
          <div className="py-4 flex flex-wrap gap-4 border-b border-black/5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs">
              <span className="font-semibold text-blue-600">Dropbox</span>
              <span className="text-black/50">·</span>
              <span className="text-black/70">Superbowl library v2</span>
              <span className="text-emerald-600 font-medium ml-1">Connected</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs">
              <span className="font-semibold text-emerald-600">Google Drive</span>
              <span className="text-black/50">·</span>
              <span className="text-black/70">FIFA 2026 shared library</span>
              <span className="text-emerald-600 font-medium ml-1">Connected</span>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="py-8 space-y-6">
            <div className="flex justify-end">
              <div className="max-w-xl rounded-2xl bg-[#1d1c1c] text-white px-5 py-3.5 text-base shadow-sm">
                Find all the hikes with mountain views in my library.
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-8 rounded-full bg-[#d97757] flex items-center justify-center text-white font-bold text-xs shrink-0">
                C
              </div>
              <div className="space-y-4 max-w-2xl">
                <p className="text-base text-[#1d1c1c] leading-relaxed">
                  Here are 3 hikes with mountain views from your library. Bookmark any that look good, or tell me more about what you want to find.
                </p>

                {/* 3 Hike Video Results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { title: 'Canyon Vista Ridge', time: '04:12', tag: 'Alps Sunrise', clip: VID_TRAVEL_NATURE, poster: IMG_HIKE_CANYON },
                    { title: 'Alpine Peak Dawn', time: '02:45', tag: 'Summit 360', clip: VID_TRAVEL_BEACH, poster: IMG_HIKE_RIDGE },
                    { title: 'Glacier Overlook', time: '06:30', tag: 'Rocky Descent', clip: VID_UGC_AD, poster: IMG_HIKE_OVERLOOK }
                  ].map((card, i) => (
                    <div key={i} className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-video bg-black/10 overflow-hidden">
                        <video src={card.clip} poster={card.poster} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                          {card.time}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm text-[#1d1c1c] truncate">{card.title}</p>
                        <p className="text-xs text-black/50 mt-0.5">{card.tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API & SDK Subsection */}
        <div className="mt-20 pt-16 border-t border-black/10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-black/50 border border-black/15 px-2.5 py-1 rounded-[6px]">
            API & SDK
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-normal text-[#1d1c1c] font-sans">
            Bring Jockey into your own product.
          </h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://playground.twelvelabs.io/get-started?option=jockey&path=sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[44px] px-6 rounded-xl bg-black text-white hover:bg-black/90 active:scale-95 transition-all text-sm font-medium"
            >
              <span>Get an API key</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://docs.twelvelabs.io/sdk-reference/python/agents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[44px] px-6 rounded-xl border border-black/20 text-[#1d1c1c] hover:bg-black/5 transition-colors text-sm font-medium"
            >
              <span>Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. MODELS SECTION (#models, light)
// ==========================================
function Models() {
  return (
    <section id="models" data-nav="light" className="light relative bg-white py-24 sm:py-32 border-t border-black/[0.06]">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        {/* Multimodal Dimensions Marquee Ticker */}
        <div className="overflow-hidden whitespace-nowrap pb-12 border-b border-black/10">
          <div className="inline-flex gap-8 items-center text-sm font-mono uppercase tracking-widest text-black/50 animate-[marquee_25s_linear_infinite]">
            {TAXONOMY_WORDS.concat(TAXONOMY_WORDS).map((word, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span>{word}</span>
                <span className="text-[#a6ef80]">✳</span>
              </span>
            ))}
          </div>
        </div>

        {/* Section Heading */}
        <div className="pt-12 max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-black/50 border border-black/15 px-2.5 py-1 rounded-[6px]">
            The models
          </span>
          <h2 className="mt-4 text-display font-normal leading-[1.05] text-[#1d1c1c] font-sans text-4xl sm:text-6xl">
            Built on the models that understand video.
          </h2>
          <p className="mt-5 text-body text-[#1d1c1c]/70 text-xl leading-relaxed">
            Marengo finds it, Pegasus describes it, Jockey turns it into something you can query.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between hover:border-black/25 transition-all">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                MARENGO 2.7
              </span>
              <h3 className="mt-4 text-2xl font-normal text-[#1d1c1c] font-sans">
                Indexes media by meaning.
              </h3>
              <p className="mt-3 text-base text-[#1d1c1c]/70 leading-relaxed">
                Makes video and photo libraries searchable by phrase, image, clip, concept, action, object, place, or person.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
              <span>MULTIMODAL EMBEDDINGS</span>
              <span>1024-DIM</span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between hover:border-black/25 transition-all">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-purple-50 text-purple-700 border border-purple-200">
                PEGASUS 1.2
              </span>
              <h3 className="mt-4 text-2xl font-normal text-[#1d1c1c] font-sans">
                Reasons about time and story.
              </h3>
              <p className="mt-3 text-base text-[#1d1c1c]/70 leading-relaxed">
                Generates narrative summaries, answers complex temporal questions, and pinpoints exact timestamps across multi-hour footage.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
              <span>VIDEO-LANGUAGE REASONING</span>
              <span>TEMPORAL QA</span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between hover:border-black/25 transition-all">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                JOCKEY AGENT
              </span>
              <h3 className="mt-4 text-2xl font-normal text-[#1d1c1c] font-sans">
                Orchestrates models and storage.
              </h3>
              <p className="mt-3 text-base text-[#1d1c1c]/70 leading-relaxed">
                Coordinates Marengo and Pegasus, manages connector syncs with Dropbox and Google Drive, and exposes clean tool interfaces over MCP.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
              <span>AGENTIC WORKFLOWS</span>
              <span>MCP NATIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. TESTIMONIALS SECTION (light)
// ==========================================
function Testimonials() {
  const TESTIMONIALS = [
    {
      quote:
        'Jockey moves us from ‘AI writes a description a human has to read’ to ‘AI emits structured data we can query.’ That’s the jump we needed.',
      name: 'Jannek Zechner',
      role: 'CTO',
      company: 'Human'
    },
    {
      quote:
        'It finds the exact moment I need across hours of footage in seconds. It has genuinely tightened my edits and saved me real time in post.',
      name: 'Kyle Chalmers',
      role: 'Content Creator',
      company: 'KC Labs'
    },
    {
      quote:
        'Jockey understands what happens inside a video, not just the labels on a segment. For sports analytics, that gap is the whole product.',
      name: 'Daniel Opata',
      role: 'Founder',
      company: 'LensX'
    }
  ];

  return (
    <section className="pt-32 lg:pt-0 pb-16 md:pb-30 light bg-white">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-black/50 border border-black/15 px-2.5 py-1 rounded-[6px]">
            In production
          </span>
          <h2 className="mt-4 text-display font-normal leading-[1.05] text-[#1d1c1c] font-sans text-3xl sm:text-5xl">
            Teams are already querying their video.
          </h2>
          <p className="mt-4 text-body text-[#1d1c1c]/70 text-lg">
            Marketers, creators, and builders running libraries through Jockey from ad tagging to streamlined creative workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between shadow-sm"
            >
              <p className="text-lg text-[#1d1c1c] leading-relaxed italic font-serif">
                "{t.quote}"
              </p>
              <div className="mt-8 pt-6 border-t border-black/10">
                <p className="font-semibold text-base text-[#1d1c1c] font-sans">{t.name}</p>
                <p className="text-sm text-black/60 font-sans">
                  {t.role} · <span className="font-medium text-black/80">{t.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. PRICING SECTION (light)
// ==========================================
function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-16 md:py-30 light bg-white border-t border-black/[0.06]">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50 border border-black/15 px-2.5 py-1 rounded-[6px]">
              Pricing
            </span>
            <h2 className="mt-4 text-display font-normal leading-[1.05] text-[#1d1c1c] font-sans text-3xl sm:text-5xl">
              Start free. Scale as you go
            </h2>
            <p className="mt-4 text-body text-[#1d1c1c]/70 text-lg max-w-xl">
              Pick a tier by how much media you store. Every plan runs the full Marengo + Pegasus engine.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#f5f5f4] border border-black/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isAnnual ? 'bg-white text-black shadow-sm' : 'text-black/60 hover:text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-white text-black shadow-sm' : 'text-black/60 hover:text-black'
              }`}
            >
              <span>Annual</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                −17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-normal text-[#1d1c1c] font-sans">Free</h3>
              <p className="mt-2 text-sm text-black/60">Get started and explore the basics</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-[#1d1c1c] font-sans">$0</span>
                <span className="text-sm text-black/50">/ mo</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-[#1d1c1c]/80">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>5GB knowledge store</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>Basic rate limits</span>
                </li>
              </ul>
            </div>
            <a
              href="https://playground.twelvelabs.io/get-started?option=jockey&path=agent"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full h-[44px] rounded-xl border border-black/20 text-[#1d1c1c] font-medium flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              Start for free
            </a>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fbfbfa] p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-normal text-[#1d1c1c] font-sans">Plus</h3>
              <p className="mt-2 text-sm text-black/60">More room and higher limits for steady projects</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-[#1d1c1c] font-sans">
                  {isAnnual ? '$16.60' : '$20'}
                </span>
                <span className="text-sm text-black/50">/ mo</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-[#1d1c1c]/80">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>100GB knowledge store</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>Higher rate limits</span>
                </li>
              </ul>
            </div>
            <a
              href="https://playground.twelvelabs.io/get-started?option=jockey&path=agent"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full h-[44px] rounded-xl border border-black/20 text-[#1d1c1c] font-medium flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              Start building
            </a>
          </div>

          <div className="relative rounded-2xl border-2 border-black bg-white p-8 flex flex-col justify-between shadow-xl">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-xs font-semibold bg-black text-white">
              Recommended
            </span>
            <div>
              <h3 className="text-2xl font-normal text-[#1d1c1c] font-sans">Pro</h3>
              <p className="mt-2 text-sm text-black/60">Maximum headroom for heavy, large-scale work</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-[#1d1c1c] font-sans">
                  {isAnnual ? '$83' : '$100'}
                </span>
                <span className="text-sm text-black/50">/ mo</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-[#1d1c1c]/80">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>500GB knowledge store</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600" />
                  <span>Highest rate limits</span>
                </li>
              </ul>
            </div>
            <a
              href="https://playground.twelvelabs.io/get-started?option=jockey&path=agent"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full h-[44px] rounded-xl bg-[#1d1c1c] text-white font-medium flex items-center justify-center hover:bg-black transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-black/50">
          Plans renew automatically. Cancel anytime — you keep access until the end of your billing cycle.
        </p>
      </div>
    </section>
  );
}

// ==========================================
// 8. DIRECTORY BANNER SECTION (light)
// ==========================================
function DirectoryBanner() {
  return (
    <section className="pb-40 pt-28 md:pb-[216px] md:pt-36 light bg-white border-t border-black/[0.06]">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-black text-white p-8 sm:p-14 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a6ef80]">
              Claude Connectors Directory
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-normal leading-tight font-sans">
              Search your footage without leaving Claude.
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              Connect your video library, then ask for a person, place, scene, or moment directly inside Claude.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://claude.ai/directory/jockey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[52px] px-8 rounded-2xl bg-white text-black font-semibold text-lg hover:bg-white/90 active:scale-95 transition-all shadow-xl"
            >
              <span>Add Jockey to Claude</span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 9. FAQ SECTION (#faq, dark)
// ==========================================
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const QUESTIONS = [
    {
      q: 'Who can see my photos and videos?',
      a: 'Only you. Your library is private by default. We never browse or access your files. See our Privacy Policy for full details.'
    },
    {
      q: 'Can I delete my data? What actually gets deleted when I do?',
      a: 'Yes. When you delete your library or account, we permanently remove your original files, the generated index, associated metadata, and your usage history. You can manage deletions directly from your account settings.'
    },
    {
      q: 'What file types and library sizes does Jockey support?',
      a: 'Jockey supports standard video (MP4, MOV, AVI, MKV, WebM) and photo (JPEG, PNG, HEIC, HEIF, WebP, BMP, GIF) formats. Please refer to the documentation for specific storage and per-file size limits.'
    },
    {
      q: 'How does Jockey recognize people across my library? Does it use facial recognition?',
      a: 'Jockey uses multimodal AI, analyzing visual, motion, and contextual cues, to group people across your library, rather than relying on traditional facial recognition. We do not build biometric databases, compare your data against external records, or share identity information between accounts.'
    }
  ];

  return (
    <section id="faq" data-nav="dark" className="scroll-mt-20 py-24 md:py-32 bg-black text-white">
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 border border-white/20 px-2.5 py-1 rounded-[6px]">
            FAQ
          </span>
          <h2 className="mt-4 text-display font-normal leading-[1.05] text-white font-sans text-3xl sm:text-5xl">
            Common questions
          </h2>
        </div>

        <div className="divide-y divide-white/10 max-w-4xl">
          {QUESTIONS.map((item, idx) => (
            <div key={idx} className="py-6">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="flex w-full items-center justify-between text-left text-lg sm:text-xl font-normal text-white hover:text-white/80 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-white/60 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed pr-6">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. FINAL CTA & FOOTER (dark)
// ==========================================
function FooterCTA() {
  return (
    <footer data-nav="dark" className="relative flex min-h-svh w-full flex-col overflow-hidden bg-black text-white pt-24 pb-16 border-t border-white/10">
      <video
        src={VID_FOOTER}
        crossOrigin="anonymous"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
      />

      <div className="relative z-20 mx-auto w-full max-w-shell px-6 md:px-10 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-24 border-b border-white/10">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] font-sans tracking-tight">
              See what your video
              <br />
              model actually sees
            </h2>
            <p className="mt-6 text-white/60 text-xl max-w-lg leading-relaxed">
              Marengo finds it, Pegasus describes it, and Jockey turns raw footage into something you can query.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://playground.twelvelabs.io/get-started?option=jockey&path=agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[48px] px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 active:scale-95 transition-all"
            >
              <span>Start building</span>
              <ArrowUpRight size={18} />
            </a>
            <a
              href="https://www.twelvelabs.io/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[48px] px-6 rounded-xl bg-transparent text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              <span>Talk to us</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-16 border-b border-white/10 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="#models" className="hover:text-white transition-colors">Embed</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Search</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Analyze</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="#use-cases" className="hover:text-white transition-colors">Media & Entertainment</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Advertising</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">Government</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="https://www.twelvelabs.io/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://www.twelvelabs.io/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://www.twelvelabs.io/blog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://www.twelvelabs.io/press" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 text-white/60">
              <li><a href="https://www.twelvelabs.io/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="https://www.twelvelabs.io/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="https://www.twelvelabs.io/trust" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trust Center</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <img src="/logo_ead_dark.png" alt="Environment Agency - Abu Dhabi" className="h-[28px] sm:h-[32px] w-auto object-contain" />
            <span>© 2026 Environment Agency - Abu Dhabi. All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://x.com/twelve_labs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              X (Twitter)
            </a>
            <a href="https://www.linkedin.com/company/twelvelabs/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://www.youtube.com/@Twelve_Labs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              YouTube
            </a>
            <a href="https://www.instagram.com/twelvelabs.io/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 11. MAIN APP ROOT WITH ELEMENT-FROM-POINT LUMINANCE
// ==========================================
export default function App() {
  const [navTheme, setNavTheme] = useState('dark');

  useEffect(() => {
    let ticking = false;

    const parseLuma = (colorStr) => {
      const match = colorStr && colorStr.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const [r, g, b, a = 1] = match[1].split(',').map((x) => parseFloat(x.trim()));
      if (a < 0.5) return null;
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    };

    const getNavLumaAt = (x, y) => {
      let node = document.elementFromPoint(x, y);
      while (node && node !== document.body && node !== document.documentElement) {
        if (node.dataset && node.dataset.nav === 'light') return 1;
        if (node.dataset && node.dataset.nav === 'dark') return 0;
        const luma = parseLuma(getComputedStyle(node).backgroundColor);
        if (luma !== null) return luma;
        node = node.parentElement;
      }
      return 0;
    };

    const checkNavTheme = () => {
      ticking = false;
      const w = window.innerWidth;
      const samples = [
        getNavLumaAt(0.2 * w, 92),
        getNavLumaAt(0.5 * w, 92),
        getNavLumaAt(0.8 * w, 92)
      ].sort((a, b) => a - b);
      const median = samples[1];
      setNavTheme(median > 0.5 ? 'light' : 'dark');
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkNavTheme);
      }
    };

    checkNavTheme();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#a6ef80] selection:text-black font-sans antialiased">
      <Header currentTheme={navTheme} />
      <main id="main-content">
        <HeroPinnedSection />
        <UseCases />
        <Integration />
        <Models />
        <Testimonials />
        <Pricing />
        <DirectoryBanner />
        <FAQ />
      </main>
      <FooterCTA />

      {/* Antigravity Page Switcher */}
      <div
        id="agy-page-switcher"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(18,18,20,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '9999px',
          padding: '4px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          fontFamily: 'ui-sans-serif,system-ui,sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.02em'
        }}
      >
        <span
          style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#000',
            padding: '6px 14px',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
          }}
        >
          Home
        </span>
        <a
          href="/home2"
          style={{
            color: 'rgba(255,255,255,0.65)',
            padding: '6px 14px',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
        >
          Home 2 (Jockey As Is)
        </a>
      </div>
    </div>
  );
}
