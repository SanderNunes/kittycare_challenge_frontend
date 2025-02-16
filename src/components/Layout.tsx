import React, { useEffect } from "react";
import Header from "./Header";

// Update image imports
import layoutTR from "/assets/png/layout-tr.png";
import layoutTL from "/assets/png/layout-tl.png";
import layoutBR from "/assets/png/layout-br.png";
import layoutBL from "/assets/png/layout-bl.png";

interface LayoutProps {
  children: React.ReactNode;
}

interface BackgroundProps {
  className?: string;
}

// Preload background images with promise handling
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

const preloadImages = async () => {
  try {
    await Promise.all([
      preloadImage(layoutTR),
      preloadImage(layoutTL),
      preloadImage(layoutBR),
      preloadImage(layoutBL)
    ]);
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

// Background component with improved loading strategy
const Background: React.FC<BackgroundProps> = ({ className = "" }) => (
  <div
    className={`w-full h-full fixed top-0 left-0 -z-10 bg-[#FAF6F3] ${className}`}
    data-testid="layout-background"
  >
    <div className="w-full h-full relative">
      {/* Top-Left Layout */}
      <img
        src={layoutTL}
        alt="Top left decorative pattern"
        className="absolute top-0 left-0 w-auto h-auto max-w-[50%] sm:max-w-[40%] top-left"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Top-Right Layout */}
      <img
        src={layoutTR}
        alt="Top right decorative pattern"
        className="absolute top-0 right-0 w-auto h-auto max-w-[50%] sm:max-w-[40%] top-right"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Bottom-Left Layout */}
      <img
        src={layoutBL}
        alt="Bottom left decorative pattern"
        className="absolute bottom-0 left-0 w-auto h-auto max-w-[50%] sm:max-w-[40%]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Bottom-Right Layout */}
      <img
        src={layoutBR}
        alt="Bottom right decorative pattern"
        className="absolute bottom-0 right-0 w-auto h-auto max-w-[50%] sm:max-w-[40%]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  </div>
);

/**
 * Layout component that wraps the main content of the application
 * Provides consistent layout structure and background across pages
 * @param {LayoutProps} props - Component props
 * @returns {React.ReactElement} Layout component
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = window.location.pathname;
  const isChatroom = pathname === "/cat-assistant";
  const isProfile = pathname === "/cat-profile";

  useEffect(() => {
    // Preload images
    preloadImages();

    // Cleanup function to remove preload links when component unmounts
    return () => {
      const links = document.head.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach(link => link.remove());
    };
  }, []);

  // Only return children for chatroom and profile pages
  if (isChatroom || isProfile) {
    return <>{children}</>;
  }

  return (
    <div className="w-screen relative">
      <main role="main" className="min-h-screen">
        <div className="w-full">
          <Header />
          <div className="flex-1">{children}</div>
          <div className="w-full h-5" aria-hidden="true" />
        </div>
      </main>
      <Background />
    </div>
  );
};
export default Layout;

