export default function LoadingEdit() {
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-16">
            <div className="w-full max-w-md m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="text-center mb-4">
                    <div className="h-6 bg-slate-300 rounded-sm mx-auto w-3/4 animate-pulse"></div>
                </div>
                <div className="text-gray-600 mb-4">
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-3/4 animate-pulse"></p>
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-3/4 animate-pulse"></p>
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-3/4 animate-pulse"></p>
                </div>
                <div className="flex justify-center mb-4">
                    <div className="h-60 w-60 bg-slate-300 rounded-md animate-pulse"></div>
                </div>
                <div className="flex justify-around mt-4">
                    <div className="h-10 w-20 bg-slate-300 rounded-md animate-pulse"></div>
                    <div className="h-10 w-14 bg-slate-300 rounded-md animate-pulse"></div>
                    <div className="h-10 w-20 bg-slate-300 rounded-md animate-pulse"></div>
                </div>
                <div className="mt-6 text-gray-600">
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-full animate-pulse"></p>
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-full animate-pulse"></p>
                    <p className="h-4 bg-slate-300 rounded-sm mb-2 w-full animate-pulse"></p>
                </div>
            </div>
        </div>
    );
}
