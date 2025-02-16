import Layout from '../components/Layout';


const EmailSentSuccess: React.FC = () => {

    return (
        <Layout>
            <div className="w-[343px] m-auto sm:w-[600px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
                <div className="w-full h-full flex flex-col items-center">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <img src="/assets/png/Daco_68893.png" alt="" width={100} height={100} />
                        <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                            Email Sent
                        </h2>
                    </div>
                </div>
                <div className='w-full text-center'>
                    <p className='text-base sm:text-lg'>Check your inbox or spam folder</p>
                </div>
                
            </div>
        </Layout>
    );
};
export default EmailSentSuccess;

