"use client";

import { type Session } from "next-auth";
import { type ServiceType } from "~/app/page";

export function ManageService({
  service,
  session,
}: {
  service: ServiceType;
  session: Session;
}) {
  const handleService = () => {
    console.log(session.user);
  };
  return (
    <button onClick={handleService}>
      {service.isOnline ? "Stop" : "Start"} Service
    </button>
  );
}
