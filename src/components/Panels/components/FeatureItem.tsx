interface FeatureItemProps {
    text: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
    <li className="flex items-center relative">
        <img
            src="/assets/Frame.png"
            alt=""
            className="absolute left-0 w-5 h-5 sm:w-6 sm:h-6"
            aria-hidden="true"
        />
        <span className="pl-8 text-sm sm:text-base">{text}</span>
    </li>
); 