import { useRive, UseRiveParameters } from '@rive-app/react-canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import styles from './LoadingOverlay.module.css';

// Constants
const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
    src: 'riv/V2/Pulse_kitty.riv',
    autoplay: true,
};

/**
 * LoadingOverlay Component
 * 
 * Displays a fullscreen overlay with a Rive animation when the application
 * is in a loading state. The overlay is controlled by the global loading
 * state in Redux.
 */
const LoadingOverlay: React.FC = () => {
    const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
    const isLoading = useSelector((state: RootState) => state.ui.loading);

    if (!isLoading) return null;

    return (
        <div
            className={styles.overlay}
            role="alert"
            aria-busy="true"
            aria-label="Loading content"
        >
            <div className={styles.animationContainer}>
                {RiveComponent && <RiveComponent />}
            </div>
        </div>
    );
};

export default LoadingOverlay; 