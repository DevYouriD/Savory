export default function Blog() {
    return (
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                        Good Food Good Mood Blog
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-300">
                        Discover our new recipes here
                    </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                    {/* Article 1 */}
                    <article className="flex max-w-xl flex-col">

                        <div className="group relative w-full overflow-hidden rounded-t-xl">
                            <img
                                src="https://www.seriouseats.com/thmb/Xg3PF38VgjCJ84927mLRBorlMoU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-the-best-barbecue-chicken-recipe-hero-updated-9cb214fe8fe8438992e049f8be51a708.jpg"
                                alt="Grilled Chicken"
                                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>

                        <div className="bg-gray-800 p-5 rounded-b-xl w-full">
                            <h3 className="text-lg font-semibold text-white hover:text-gray-300">
                                <a href="#">Grilled Chicken</a>
                            </h3>
                            <div className="mt-3 text-sm flex items-center gap-x-4 flex-wrap">
                                <time dateTime="2020-02-12" className="text-gray-400">
                                    Feb 12, 2020
                                </time>

                                <a href="#" className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-600">
                                    Grill
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Article 2 */}
                    <article className="flex max-w-xl flex-col">

                        <div className="group relative w-full overflow-hidden rounded-t-xl">
                            <img
                                src="https://yousaypotatoes.com/wp-content/uploads/2024/08/seafood-chowder-3sq.jpg"
                                alt="Fish Chowder"
                                className="w-full h-[240px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="bg-gray-800 p-5 rounded-b-xl w-full">
                            <h3 className="text-lg font-semibold text-white hover:text-gray-300">
                                <a href="#">Fish Chowder</a>
                            </h3>
                            <div className="mt-3 text-sm flex items-center gap-x-4 flex-wrap">
                                <time dateTime="2020-02-12" className="text-gray-400">
                                    Feb 12, 2020
                                </time>
                                <a href="#" className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-600">
                                    Appetizer
                                </a>
                                <a href="#" className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-600">
                                    Fish
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Article 3 */}
                    <article className="flex max-w-xl flex-col">
                        <div className="group relative w-full overflow-hidden rounded-t-xl">
                            <img
                                src="https://cdn.jwplayer.com/v2/media/W4yH8741/thumbnails/8Mhboqg7.jpg?width=1280"
                                alt="Chocolate Cake"
                                className="w-full h-[240px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="bg-gray-800 p-5 rounded-b-xl w-full">
                            <h3 className="text-lg font-semibold text-white hover:text-gray-300">
                                <a href="#">Chocolate Cake</a>
                            </h3>
                            <div className="mt-3 text-sm flex items-center gap-x-4 flex-wrap">
                                <time dateTime="2020-02-12" className="text-gray-400">
                                    Feb 12, 2020
                                </time>
                                <a href="#" className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-600">
                                    Dessert
                                </a>
                                <a href="#" className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 hover:bg-gray-600">
                                    Chocolate
                                </a>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </div>
    );
}