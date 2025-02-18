import { HashLoader } from 'react-spinners';

export default function Loader({ processing }: { processing: boolean }) {
    return (
        <>
            {processing && (
                <div className="fixed inset-0 z-[9999]">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-lg bg-white p-6 shadow-xl">
                            <HashLoader color="#2C347C" size={50} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
