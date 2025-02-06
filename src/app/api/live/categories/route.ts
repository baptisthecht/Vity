import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import { prisma } from "@iptv/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
        const liveCategories = await fetch(BASE_URL + ACTION.GET_LIVE_CATEGORIES).then(res => res.json());
    const categories = await prisma.category.findMany({
        where: {
            type: "LIVE",
        },
    });

    return NextResponse.json(liveCategories);
}
