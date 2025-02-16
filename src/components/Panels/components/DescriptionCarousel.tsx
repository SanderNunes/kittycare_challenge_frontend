import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
    id: number;
    title: string;
    description: string;
}

interface DescriptionCarouselProps {
    currentIndex: number;
    items: CarouselItem[];
}

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = ({
    currentIndex,
    items
}) => {
    return (
        <div className="relative h-[170px] flex flex-col items-center justify-center mb-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full text-center"
                >
                    <h2 className="text-black text-2xl md:text-3xl font-bold mb-2">
                        {items[currentIndex].title}
                    </h2>
                    <p className="text-sm max-w-lg mx-auto mt-2 text-darkGray leading-relaxed">
                        {items[currentIndex].description}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DescriptionCarousel; 