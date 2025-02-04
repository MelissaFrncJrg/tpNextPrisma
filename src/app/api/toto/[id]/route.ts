import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  return NextResponse.json({ message: `Hello, ${id}` }, { status: 210 });
};
