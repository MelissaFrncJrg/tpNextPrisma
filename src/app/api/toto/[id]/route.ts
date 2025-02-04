import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  return NextResponse.json({ message: `Hello, ${id}` }, { status: 210 });
};
