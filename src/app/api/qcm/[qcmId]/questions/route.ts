import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ qcmId: string }> }
) => {
  const resolvedParams = await params;
  const qcmId = parseInt(resolvedParams.qcmId, 10);

  if (isNaN(qcmId)) {
    return NextResponse.json({ error: "Invalid QCM ID" }, { status: 400 });
  }

  const {
    content,
    choices,
  }: { content: string; choices: { content: string; isCorrect: boolean }[] } =
    await req.json();

  const qcm = await prisma.qCM.findUnique({
    where: { id: qcmId },
  });

  if (!qcm) {
    return NextResponse.json({ error: "QCM not found" }, { status: 404 });
  }

  const newQuestion = await prisma.question.create({
    data: {
      content,
      qcmId,
      choices: {
        create: choices.map((choice) => ({
          content: choice.content,
          isCorrect: choice.isCorrect,
        })),
      },
    },
    include: { choices: true },
  });

  return NextResponse.json(newQuestion, { status: 201 });
};
