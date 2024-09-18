export default function LoadingParticipant() {
    return (
        <div>
            <div className="flex justify-center items-start min-h-screen pt-16">
                <div className="animate-pulse w-full max-w-md m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="text-center mb-4">
                        <h1 className="h-6 bg-slate-300 rounded">
                        </h1>
                    </div>
                    <div className="mb-4">
                        <p className="h-4 bg-slate-300 rounded mb-2">
                        </p>
                        <p className="h-4 bg-slate-300 rounded mb-2">
                        </p>
                        <p className="h-4 bg-slate-300 rounded mb-2">
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="rounded-md bg-slate-300 h-60 w-60"></div>
                    </div>
                    <div className="flex justify-around mt-4">
                        <div className="rounded-md bg-slate-300 h-10 w-20"></div>
                        <div className="rounded-md bg-slate-300 h-10 w-14"></div>
                        <div className="rounded-md bg-slate-300 h-10 w-20"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
