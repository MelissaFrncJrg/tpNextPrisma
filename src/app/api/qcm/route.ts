import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const qcm = await prisma.qCM.findMany({});
  return NextResponse.json({ qcm });
};

export const POST = async (req: NextRequest) => {
  const { data } = await req.json();
  const { titre, imageSrc }: { titre: string; imageSrc?: string } = data;

  const newQCM = await prisma.qCM.create({
    data: {
      titre,
      imageSrc,
    },
  });

  return NextResponse.json(newQCM, { status: 201 });
};
