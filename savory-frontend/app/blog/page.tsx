export default function Blog() {
    return (
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">From the blog</h2>
                    <p className="mt-2 text-lg/8 text-gray-300">Discover our new recipes here.</p>
                </div>
                <div
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <article className="flex max-w-xl flex-col items-start justify-between">
                        <div className="group relative grow">
                            <img src="https://www.seriouseats.com/thmb/Xg3PF38VgjCJ84927mLRBorlMoU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-the-best-barbecue-chicken-recipe-hero-updated-9cb214fe8fe8438992e049f8be51a708.jpg"
                                 alt="" className="bg-gray-800"></img>
                            <h3 className="mt-4 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                                <a href="#">
                                    <span className="absolute inset-0"></span>
                                    Grilled Chicken
                                </a>
                            </h3>
                        </div>
                        <div className="relative mt-4 text-sm flex items-center gap-x-4 justify-self-end">
                            <time dateTime="2020-02-12" className="text-gray-400">Feb 12, 2020</time>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Main Course</a>
                        </div>
                    </article>
                    <article className="flex max-w-xl flex-col items-start justify-between">
                        <div className="group relative grow">
                            <img src="https://yousaypotatoes.com/wp-content/uploads/2024/08/seafood-chowder-3sq.jpg"
                                 alt="" className="bg-gray-800"></img>
                            <h3 className="mt-4 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                                <a href="#">
                                    <span className="absolute inset-0"></span>
                                    Fish Chowder
                                </a>
                            </h3>
                        </div>
                        <div className="relative mt-4 text-sm flex items-center gap-x-4 justify-self-end">
                            <time dateTime="2020-02-12" className="text-gray-400">Feb 12, 2020</time>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Appetizer</a>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Main</a>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Fish</a>
                        </div>
                    </article>
                    <article className="flex max-w-xl flex-col items-start justify-between">
                        <div className="group relative grow">
                            <img src="https://cdn.jwplayer.com/v2/media/W4yH8741/thumbnails/8Mhboqg7.jpg?width=1280"
                                 alt="" className="bg-gray-800"></img>
                            <h3 className="mt-4 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                                <a href="#">
                                    <span className="absolute inset-0"></span>
                                    Chocolate Cake
                                </a>
                            </h3>
                        </div>
                        <div className="relative mt-4 text-sm flex items-center gap-x-4 justify-self-end">
                            <time dateTime="2020-02-12" className="text-gray-400">Feb 12, 2020</time>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Desert</a>
                            <a href="#" className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800">Desert</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
