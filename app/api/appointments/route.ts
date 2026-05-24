import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  if (!phone) {
    return NextResponse.json([], { status: 400 });
  }

  const appointments = await prisma.appointment.findMany({
    where: { phone },
    include: { service: true },
    orderBy: { appointment: "desc" },
  });

  const serialized = appointments.map((app) => ({
    id: app.id,
    serviceName: app.service.name,
    petName: app.petName,
    date: app.appointment.toISOString(),
    status: app.status,
  }));

  return NextResponse.json(serialized);
}
