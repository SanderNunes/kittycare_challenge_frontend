import React, { useEffect } from 'react';
import PawAnimation from '../PawPrintAnimation';
import useCatRecommendations from '../../hooks/useCatRecommendations';
import useCreateCat from '../../hooks/useCreateCat';
// import { useNavigate } from 'react-router-dom';

interface Panel13Props {
  nextStep: () => void;
  previousStep: () => void;
}

const LOADING_DELAY = 15000;

const Panel13: React.FC<Panel13Props> = ({ nextStep }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const { getCatRecommendations } = useCatRecommendations();
  const { createCat } = useCreateCat();
  // const navigate = useNavigate();

  useEffect(() => {
    const initializeCat = async () => {
      try {
        let success;
        if (localStorage.getItem("email")) {
          success = await createCat();
        } else {
          success = await getCatRecommendations();
        }

        if (success) {
          setTimeout(() => {
            // setIsLoading(false);
            nextStep();
            // navigate('/signup')
          }, LOADING_DELAY);
        }
      } catch (error) {
        console.error('Error creating cat:', error);
        // setIsLoading(false);
      }
    };

    initializeCat();
  }, [getCatRecommendations, nextStep]);

  return (
    <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
      <header className="text-center mb-8">
        <h1 className="font-bold text-xl lg:text-3xl mb-2">
          We're Creating Your Cat's Personal Plan!
        </h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Based on your selections, we're crafting a customized care and
          training plan just for your cat. This will only take a moment!
        </p>
      </header>

      <main>
        <PawAnimation className="flex items-center justify-center w-72 h-72 lg:w-full mx-16" />

        <div className="text-center mt-4">
          <p className="font-semibold text-md lg:text-lg text-darkGray">
            Fetching the best advice for your cat...
          </p>
          <p className="text-sm text-gray-500">This will take a few seconds</p>
        </div>

        <div className="bg-lightPearl text-mediumGray text-center rounded-2xl py-4 px-6 lg:px-10 mt-6 mx-4 lg:mx-auto max-w-md lg:max-w-lg border-pearlBush">
          <p className="text-xs md:text-sm font-normal">
            We're getting everything ready! Soon, you'll have a personalized plan
            that fits your cat's needs and lifestyle.
          </p>
        </div>
      </main>

      {/* <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={isLoading}
      /> */}
    </div>
  );
};

export default Panel13;
