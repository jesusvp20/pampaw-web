"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAppointment(appointmentId: string) {
  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  revalidatePath("/dashboard");
}
