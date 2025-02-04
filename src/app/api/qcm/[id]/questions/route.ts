import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { data } = await req.json();
  const {
    content,
    choices,
  }: { content: string; choices: { content: string; isCorrect: boolean }[] } =
    data;

  const newQuestion = await prisma.question.create({
    data: {
      content,
      qcmId: 1,
      choices: {
        create: choices.map((choice) => ({
          content: choice.content,
          isCorrect: choice.isCorrect,
        })),
      },
    },
  });

  return NextResponse.json(newQuestion, { status: 201 });
};
