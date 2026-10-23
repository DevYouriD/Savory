export const dynamic = "force-dynamic";

import { getRecipeCardsPage } from "@/lib/queries";
import { getLanguage } from "@/lib/layout-translation/get-language";
import { getTranslator } from "@/lib/layout-translation/i18n";
import RecipeGrid from "@/components/RecipeGrid";

const PAGE_SIZE = 9;

export default async function Home() {
    const recipePage = await getRecipeCardsPage(0, PAGE_SIZE);
    const language = await getLanguage();
    const t = getTranslator(language);

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Title + Subtitle */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-foreground">
                        {t("home.title")}
                    </h2>
                    {/*<p className="mt-1 text-lg text-muted-foreground">*/}
                    {/*    {t("home.subtitle")}*/}
                    {/*</p>*/}
                </div>

                {/* Paginated recipe grid */}
                <RecipeGrid
                    initialRecipes={recipePage.recipes}
                    initialPage={recipePage.page}
                    initialHasNext={recipePage.hasNext}
                />

                {/* Meet the Chefs */}
                <div className="mx-auto mt-16 mb-10 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">

                    {/* Chef Rudi */}
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                        <img
                            src="/Chef_Rudi.png"
                            alt="Chef Rudi Image"
                            loading="lazy"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    {/* Center text card */}
                    <div className="flex items-center justify-center rounded-xl px-6 py-8 text-center shadow-sm">
                        <h3 className="text-xl font-semibold text-card-foreground leading-snug">
                            Rudi & Youri’s<br />
                            Receptenboek
                        </h3>
                    </div>

                    {/* Chef Youri */}
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                        <img
                            src="/Chef_Youri.jpg"
                            alt="Chef Youri Image"
                            loading="lazy"
                            className="h-full w-full object-cover object-[50%_20%]"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
