import dbConnect from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import Page from "@/model/Page";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const page = await Page.findOne({ id });
    if (!page) {
        return NextResponse.json({ text: "" }, { status: 404 });
    }
    return NextResponse.json({ text: page.text });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { text } = await req.json();
    await dbConnect();

    const { id } = params;
    const existing = await Page.findOne({ id });
    if (existing) {
        existing.text = text;
        await existing.save();
    } else {
        await Page.create({ id, text });
    }

    return NextResponse.json({ success: true });
}