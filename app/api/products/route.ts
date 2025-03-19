import { NextResponse } from "next/server";

const products = [
    { id: 1, name: "King Size Bed", category: "bed-frames" },
    { id: 2, name: "Memory Foam Mattress", category: "mattress" },
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    return NextResponse.json(products.filter((p) => p.category === category));
}
