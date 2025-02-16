import React from "react";
import { useNavigate } from "react-router-dom";

// Component imports
import {
    Suggestions,
    Timeline,
    DateSelection,
    EnvironmentalEnrichmentSuggestions,
    GoalSummary
} from ".";

// Types
import { Panel15Props } from "../../../../types/panel.types";

/**
 * Panel15 Component
 * Displays the cat's personalized plan and insights including goals, suggestions,
 * timeline, and environmental enrichment recommendations
 */
const Panel15: React.FC<Panel15Props> = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate("/cat-assistant");
    };

    return (
        <article className="w-full lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
            {/* Header Section */}
            <header className="text-center mb-8">
                <h1 className="font-bold text-xl lg:text-3xl mb-2">
                    Your Cat's Personalized Plan & Insights Let's Keep Your Cat Healthy
                    and Happy!
                </h1>
                <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
                    Here's your cat's custom care plan based on everything you've told us.
                    We've tailored this to help you and your cat reach your goals. Let's
                    dive into the details!
                </p>
            </header>

            {/* Main Content Section */}
            <main className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-start justify-center">
                {/* Left Column */}
                <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 mb-8 lg:mb-0">
                    <GoalSummary />
                    <Suggestions />
                </section>

                {/* Right Column */}
                <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8">
                    <Timeline />
                    <DateSelection />
                    <EnvironmentalEnrichmentSuggestions />
                </section>
            </main>

            {/* Footer Action */}
            <footer className="flex justify-center mt-8">
                <button
                    onClick={handleExploreClick}
                    className="bg-primaryBlue text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 text-base lg:text-lg"
                    aria-label="Explore my cat care plan"
                >
                    Explore My Plan
                </button>
            </footer>
        </article>
    );
};

export default Panel15; 