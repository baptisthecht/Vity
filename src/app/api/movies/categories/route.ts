import { prisma } from "@iptv/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany({
        where: {
            type: "MOVIE",
        },
    });

    return NextResponse.json(categories);
}
