interface SignupHeaderProps {
    urlParams: URLSearchParams;
}

export const SignupHeader: React.FC<SignupHeaderProps> = ({ urlParams }) => (
    <div className="text-center">
        <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
            Sign up
        </h2>
        <div className="text-base sm:text-lg font-medium">
            Already have an account?{" "}
            <span className="text-[#0061EF]">
                <a href={`/login?${urlParams.toString()}`}>Login</a>
            </span>
        </div>
    </div>
); 