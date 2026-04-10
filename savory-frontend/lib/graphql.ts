export async function graphqlRequest<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 },
    });

    const json = await res.json();

    if (json.errors) {
        const formatted = json.errors
            .map(
                (err: any) =>
                    `Message: ${err.message}\nLocations: ${JSON.stringify(
                        err.locations
                    )}\nPath: ${err.path ?? "N/A"}\nExtensions: ${JSON.stringify(
                        err.extensions
                    )}`
            )
            .join("\n\n");

        // Log for debugging
        console.error("GraphQL Errors:\n", formatted);

        // Throw with full detail
        throw new Error(`GraphQL Error:\n${formatted}`);
    }

    return json.data;
}