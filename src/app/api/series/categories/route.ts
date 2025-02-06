import { prisma } from "@iptv/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany({
        where: {
            type: "SERIES",
        },
    });

    return NextResponse.json(categories);
}
