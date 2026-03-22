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
        cache: "no-store", // disable caching for now
    });

    const json = await res.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error("GraphQL Error");
    }

    return json.data;
}