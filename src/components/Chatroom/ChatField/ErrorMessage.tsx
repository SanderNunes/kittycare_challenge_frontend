import type { ErrorMessageProps } from "./types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="text-red-500 text-center mb-4" role="alert">
            {message}
        </div>
    );
};

export default ErrorMessage; 