import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const liveCategories = await fetch(BASE_URL + ACTION.GET_LIVE_CATEGORIES).then(res => res.json());
        const allCategories = liveCategories.length;
        
        const livePromises = liveCategories.map(async (category) => {
            try {
                const res = await fetch(BASE_URL + ACTION.GET_LIVE + "&category_id=" + category.category_id);
                if(res.status !== 200) {
                    console.error("Error fetching live data:", res.status);
                    return 0; // If the status is not 200, return 0 for the count
                }
                setTimeout(async () => {
                    const data = await res.json();
                    return data.length; // Return the length of the data for logging purposes
                }, 2000);
            } catch (error) {
                console.error("Error fetching live data:", error);
                return 0; // If an error occurs, return 0 for the length
            }
        });

        // Wait for all promises to resolve and calculate the results
        const liveCounts = await Promise.all(livePromises);
        const i = liveCounts.reduce((sum, count) => sum + count, 0); // Sum up all successful live counts

        return NextResponse.json({
            allCategories,
            i,
        });
    } catch (error) {
        console.error("Error fetching live categories:", error);
        return NextResponse.json({
            allCategories: 0,
            i: 0,
        });
    }
}
