import { useEffect } from "react";

const VWORevenueTracking = () => {
  useEffect(() => {
    // Dynamically inject the script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      window.VWO = window.VWO || [];
      window.VWO.push(['track.revenueConversion', "1"]);
    `;
    document.head.appendChild(script);

    // Cleanup script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render any visible content
};

export default VWORevenueTracking;
