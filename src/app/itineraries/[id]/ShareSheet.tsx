"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import type { ItineraryPlan } from "@/types/itinerary";

interface ShareSheetProps {
  itinerary: ItineraryPlan;
  onClose: () => void;
}

export function ShareSheet({ itinerary, onClose }: ShareSheetProps) {
  const [step, setStep] = useState<"scope" | "format" | "success">("scope");
  const [selectedScope, setSelectedScope] = useState<"overview" | "full" | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleScopeSelect = (scope: "overview" | "full") => {
    setSelectedScope(scope);
    setStep("format");
  };

  const handleFormatSelect = async (format: "link" | "image" | "text") => {
    if (format === "link") {
      await handleCopyLink();
    } else if (format === "image") {
      await handleSaveAsImage();
    } else if (format === "text") {
      await handleCopyText();
    }
  };

  const handleCopyLink = async () => {
    try {
      // Encode itinerary data for URL
      const shareData = {
        id: itinerary.id,
        name: itinerary.name,
        tagline: itinerary.tagline,
        totalDays: itinerary.totalDays,
        route: itinerary.route.map(segment => ({
          destinationName: segment.destinationName,
          nights: segment.nights,
          days: segment.days.map(day => ({
            dayNumber: day.dayNumber,
            theme: day.theme,
            intent: day.intent,
            items: day.items,
            pace: day.pace,
          })),
          nextTransport: segment.nextTransport,
        })),
        scope: selectedScope,
      };

      const encoded = btoa(JSON.stringify(shareData));
      const url = `${window.location.origin}/shared?data=${encoded}`;

      await navigator.clipboard.writeText(url);
      setSuccessMessage("Copied to clipboard!");
      setStep("success");

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link. Please try again.');
    }
  };

  const handleSaveAsImage = async () => {
    try {
      // Create a temporary container with itinerary content
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1080px;
        padding: 60px;
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        z-index: 10000;
        box-sizing: border-box;
      `;

      // Build itinerary content for image using DOM elements instead of innerHTML
      const wrapper = document.createElement('div');

      // Header section
      const header = document.createElement('div');
      header.style.cssText = 'text-align: center; margin-bottom: 48px;';

      const title = document.createElement('h1');
      title.style.cssText = 'font-size: 36px; font-weight: bold; color: #182235; margin: 0 0 12px 0;';
      title.textContent = itinerary.name;

      const tagline = document.createElement('p');
      tagline.style.cssText = 'font-size: 20px; color: #464E5D; margin: 0 0 20px 0;';
      tagline.textContent = itinerary.tagline;

      const days = document.createElement('p');
      days.style.cssText = 'font-size: 18px; color: #8C909A; margin: 0;';
      days.textContent = `${itinerary.totalDays} days`;

      header.appendChild(title);
      header.appendChild(tagline);
      header.appendChild(days);
      wrapper.appendChild(header);

      // Route section
      const routeSection = document.createElement('div');
      routeSection.style.cssText = 'margin-bottom: 32px;';

      const routeTitle = document.createElement('h2');
      routeTitle.style.cssText = 'font-size: 24px; font-weight: 600; color: #182235; margin: 0 0 16px 0;';
      routeTitle.textContent = 'Route';

      const routeText = document.createElement('p');
      routeText.style.cssText = 'font-size: 18px; color: #464E5D; margin: 0;';
      routeText.textContent = itinerary.route.map(s => s.destinationName).join(' → ');

      routeSection.appendChild(routeTitle);
      routeSection.appendChild(routeText);
      wrapper.appendChild(routeSection);

      // Add full itinerary details if scope is "full"
      if (selectedScope === 'full') {
        itinerary.route.forEach(segment => {
          const segmentDiv = document.createElement('div');
          segmentDiv.style.cssText = 'margin-bottom: 32px;';

          const segmentTitle = document.createElement('h3');
          segmentTitle.style.cssText = 'font-size: 20px; font-weight: 600; color: #182235; margin: 0 0 16px 0;';
          segmentTitle.textContent = `${segment.destinationName} (${segment.nights} nights)`;
          segmentDiv.appendChild(segmentTitle);

          segment.days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.style.cssText = 'margin-bottom: 16px; margin-left: 20px;';

            const dayTitle = document.createElement('p');
            dayTitle.style.cssText = 'font-weight: 600; color: #464E5D; margin: 0 0 8px 0; font-size: 16px;';
            dayTitle.textContent = `Day ${day.dayNumber}: ${day.theme}`;
            dayDiv.appendChild(dayTitle);

            const itemsList = document.createElement('ul');
            itemsList.style.cssText = 'list-style: none; padding: 0; margin: 0;';

            day.items.forEach((item, idx) => {
              const li = document.createElement('li');
              li.style.cssText = 'font-size: 14px; color: #464E5D; margin-bottom: 6px;';
              li.textContent = `${idx + 1}. ${item}`;
              itemsList.appendChild(li);
            });

            dayDiv.appendChild(itemsList);
            segmentDiv.appendChild(dayDiv);
          });

          wrapper.appendChild(segmentDiv);
        });
      }

      // Watermark
      const footer = document.createElement('div');
      footer.style.cssText = 'text-align: center; margin-top: 48px; padding-top: 24px; border-top: 2px solid #E5E7EB;';

      const watermark = document.createElement('p');
      watermark.style.cssText = 'font-size: 14px; color: #8C909A; margin: 0;';
      watermark.textContent = 'Created with CN Travel App';

      footer.appendChild(watermark);
      wrapper.appendChild(footer);

      container.appendChild(wrapper);
      document.body.appendChild(container);

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 300));

      // Convert to image
      const dataUrl = await toPng(container, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      // Trigger download
      const link = document.createElement('a');
      link.download = `${itinerary.name.replace(/\s+/g, '-').toLowerCase()}-itinerary.png`;
      link.href = dataUrl;
      link.click();

      // Cleanup
      document.body.removeChild(container);

      setSuccessMessage("Image saved!");
      setStep("success");

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  const handleCopyText = async () => {
    try {
      // Generate formatted text
      let text = `${itinerary.name}\n${itinerary.tagline}\n\n`;
      text += `📍 Route: ${itinerary.route.map((s) => s.destinationName).join(" → ")}\n`;
      text += `⏰ Duration: ${itinerary.totalDays} days\n\n`;

      if (selectedScope === "full") {
        text += "─────────────────────\n\n";

        itinerary.route.forEach((segment) => {
          text += `📍 ${segment.destinationName.toUpperCase()} (${segment.nights} nights)\n\n`;

          segment.days.forEach((day) => {
            text += `Day ${day.dayNumber}: ${day.theme}\n`;
            text += `${day.intent}\n\n`;

            if (day.structuredItems && day.structuredItems.length > 0) {
              day.structuredItems.forEach((item, idx) => {
                text += `${idx + 1}. ${item.title}\n`;
                text += `   ${item.shortDescription}\n`;
                if (item.practicalInfo) {
                  text += `   ℹ️ ${item.practicalInfo}\n`;
                }
                text += `\n`;
              });
            } else {
              day.items.forEach((item, idx) => {
                text += `  ${idx + 1}. ${item}\n`;
              });
            }

            text += `\n`;
          });

          if (segment.nextTransport) {
            text += `🚗 ${segment.nextTransport.method.toUpperCase()}: ${segment.nextTransport.duration}\n\n`;
          }

          text += `─────────────────────\n\n`;
        });
      }

      text += `\nCreated with CN Travel App`;

      // Copy to clipboard
      await navigator.clipboard.writeText(text);

      setSuccessMessage("Copied to clipboard!");
      setStep("success");

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      alert('Failed to copy text. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "scope" && (
          <ScopeSelectionView
            onScopeSelect={handleScopeSelect}
            onClose={onClose}
          />
        )}
        {step === "format" && (
          <FormatSelectionView
            selectedScope={selectedScope!}
            onFormatSelect={handleFormatSelect}
            onBack={() => setStep("scope")}
            onClose={onClose}
          />
        )}
        {step === "success" && (
          <SuccessView successMessage={successMessage} />
        )}
      </div>
    </div>
  );
}

// Scope Selection View Component
function ScopeSelectionView({
  onScopeSelect,
  onClose,
}: {
  onScopeSelect: (scope: "overview" | "full") => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="border-b border-neutral-200 px-[24px] py-[20px]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-heading text-[16px] font-semibold text-primary-dark">
              Share this itinerary
            </h2>
            <p className="mt-1 font-body text-[14px] text-neutral-600">
              Choose what you&apos;d like to share
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-700"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Share Options */}
      <div className="p-[24px]">
        <div className="flex flex-col gap-[12px]">
          {/* Share Overview */}
          <button
            onClick={() => onScopeSelect("overview")}
            className="flex items-start gap-[16px] rounded-[16px] bg-neutral-100 p-[20px] transition-colors hover:bg-neutral-200"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-[16px] leading-[1.3] text-primary-dark">
                Share overview
              </p>
              <p className="mt-1 font-body text-[12px] leading-[18px] text-neutral-600">
                Trip summary, route, and key highlights
              </p>
            </div>
          </button>

          {/* Share Full Itinerary */}
          <button
            onClick={() => onScopeSelect("full")}
            className="flex items-start gap-[16px] rounded-[16px] bg-neutral-100 p-[20px] transition-colors hover:bg-neutral-200"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-[16px] leading-[1.3] text-primary-dark">
                Share full itinerary
              </p>
              <p className="mt-1 font-body text-[12px] leading-[18px] text-neutral-600">
                All days, places, and transport details
              </p>
            </div>
          </button>

          {/* Footnote */}
          <p className="mt-1 text-center font-body text-[12px] leading-[16px] text-neutral-600">
            Shared itineraries are read-only and don&apos;t require an account
          </p>
        </div>
      </div>
    </>
  );
}

// Format Selection View Component
function FormatSelectionView({
  selectedScope,
  onFormatSelect,
  onBack,
  onClose,
}: {
  selectedScope: "overview" | "full";
  onFormatSelect: (format: "link" | "image" | "text") => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header with back button */}
      <div className="border-b border-neutral-200 px-[24px] py-[20px]">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-[32px] w-[32px] items-center justify-center"
            aria-label="Back"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-900"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h2 className="font-heading text-[16px] font-semibold text-primary-dark">
            Share {selectedScope === "overview" ? "overview" : "full itinerary"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-[32px] w-[32px] items-center justify-center"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-700"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Format options */}
      <div className="p-[24px]">
        <div className="flex flex-col gap-[12px]">
          {/* Copy Link */}
          <button
            onClick={() => onFormatSelect("link")}
            className="flex items-center gap-[16px] rounded-[16px] bg-neutral-100 p-[20px] transition-colors hover:bg-neutral-200"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-[16px] text-primary-dark">Copy Link</p>
            </div>
          </button>

          {/* Save as Image */}
          <button
            onClick={() => onFormatSelect("image")}
            className="flex items-center gap-[16px] rounded-[16px] bg-neutral-100 p-[20px] transition-colors hover:bg-neutral-200"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-[16px] text-primary-dark">Save as Image</p>
            </div>
          </button>

          {/* Copy as Text */}
          <button
            onClick={() => onFormatSelect("text")}
            className="flex items-center gap-[16px] rounded-[16px] bg-neutral-100 p-[20px] transition-colors hover:bg-neutral-200"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-[16px] text-primary-dark">Copy as Text</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

// Success View Component
function SuccessView({ successMessage }: { successMessage: string }) {
  return (
    <div className="p-[24px] pb-[40px]">
      {/* Green checkmark */}
      <div className="flex flex-col items-center justify-center py-[40px]">
        <div
          className="mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full"
          style={{ backgroundColor: '#84ebB4' }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="mb-2 font-heading text-[18px] font-semibold text-primary-dark">
          {successMessage}
        </h2>
        <p className="font-body text-[14px] text-neutral-600">
          Ready to share
        </p>
      </div>
    </div>
  );
}
