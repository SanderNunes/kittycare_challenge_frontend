import { AssetLoadCallback, EventCallback, Layout, useRive } from "rive-react";

export interface RiveParameters {
  canvas?: HTMLCanvasElement | OffscreenCanvas; // required
  src?: string; // one of src or buffer is required
  buffer?: ArrayBuffer; // one of src or buffer is required
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  layout?: Layout;
  autoplay?: boolean;
  onLoad?: EventCallback;
  onLoadError?: EventCallback;
  onPlay?: EventCallback;
  onPause?: EventCallback;
  onStop?: EventCallback;
  onLoop?: EventCallback;
  onStateChange?: EventCallback;
  onAdvance?: EventCallback;
  assetLoader?: AssetLoadCallback;
  useOffscreenRenderer?: boolean;
  shouldDisableRiveListeners?: boolean;
}

const RiveAnimation = (props: RiveParameters) => {
  const { RiveComponent } = useRive(props);
  return <RiveComponent />;
};

export default RiveAnimation;
