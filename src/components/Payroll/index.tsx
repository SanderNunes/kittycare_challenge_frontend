interface PayrollProps {
    handleClickPaywall: any;
}
const Payroll = ({ handleClickPaywall }: PayrollProps) => {
    return (
        <div className='flex flex-col gap-6 w-full p-[16px_16px] h-auto overflow-hidden'>
            <div className='flex flex-col gap-2 text-center'>
                <h1 className='text-black [leading-trim:both] [text-edge:cap] font-inter text-[24px] font-bold capitalize'>
                    See Your Cat's Results Now
                </h1>
                <p className='text-[#404040] text-center [leading-trim:both] [text-edge:cap] font-inter text-[18px] font-medium leading-[1.3]'>
                    Unlock results and exclusive features - for $0 right now
                </p>
            </div>
            <div className='flex flex-col gap-[20px] w-full rounded-[22px] border-2 border-[#DBCEC4] bg-[#F3EDE8] p-[0_48px_24px_48px]'>
                <h3 className='w-full bg-[#FFA500] rounded-b-[14px] px-[28px] py-[8px] text-black text-center [leading-trim:both] [text-edge:cap] font-inter text-sm font-semibold leading-[1.4]'>
                    Why KittyCare?
                </h3>
                <ul className='flex flex-col gap-[16px] text-sm text-black'>
                    <li className='flex gap-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" strokeWidth="1.19973" />
                            <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" strokeWidth="1.19973" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>
                            <b>Cat-Specific Care</b><br />
                            Personalized for your feline.
                        </p>
                    </li>
                    <li className='flex gap-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" strokeWidth="1.19973" />
                            <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" strokeWidth="1.19973" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>
                            <b>24/7 Expert Advice</b><br />
                            Answers when you need them.
                        </p>
                    </li>
                    <li className='flex gap-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" strokeWidth="1.19973" />
                            <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" strokeWidth="1.19973" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>
                            <b>Tailored Plans</b><br />
                            Health and behavior support.
                        </p>
                    </li>
                    <li className='flex gap-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" strokeWidth="1.19973" />
                            <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" strokeWidth="1.19973" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>
                            <b>Early Issue Detection</b><br />
                            Prevent expensive emergencies.
                        </p>
                    </li>
                    <li className='flex gap-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" strokeWidth="1.19973" />
                            <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" strokeWidth="1.19973" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>
                            <b>3-Day Free Trial</b><br />
                            Full access, cancel anytime.
                        </p>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col gap-[10px]'>
                <button
                    className="w-full h-[50px] text-base bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
                    onClick={handleClickPaywall}
                >
                    Try For Free
                </button>
                <p className='text-black text-center [leading-trim:both] [text-edge:cap] font-inter text-sm font-medium leading-[1.4]'>
                    Auto-renews for <b>$49.99</b>/month until canceled
                </p>
            </div>
        </div>
    )
}

export default Payroll;