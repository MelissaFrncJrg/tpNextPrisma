import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ qcmId: string }> }
) => {
  const { qcmId } = await context.params;
  const parsedQcmId = parseInt(qcmId, 10);

  if (isNaN(parsedQcmId)) {
    return NextResponse.json({ error: "Invalid QCM ID" }, { status: 400 });
  }

  const { data } = await req.json();
  const {
    content,
    choices,
  }: { content: string; choices: { content: string; isCorrect: boolean }[] } =
    data;

  const qcm = await prisma.qCM.findUnique({
    where: { id: parsedQcmId },
  });

  if (!qcm) {
    return NextResponse.json({ error: "QCM not found" }, { status: 404 });
  }

  const newQuestion = await prisma.question.create({
    data: {
      content,
      qcmId: parsedQcmId,
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
