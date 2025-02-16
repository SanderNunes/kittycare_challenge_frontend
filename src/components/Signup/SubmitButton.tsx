interface SubmitButtonProps {
    isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
    <div className="my-3">
        <div className="w-full h-[52px] my-10">
            <input
                type="submit"
                className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer disabled:bg-blue-400"
                value={isLoading ? "Creating account..." : "Create account"}
                disabled={isLoading}
            />
        </div>
    </div>
); 