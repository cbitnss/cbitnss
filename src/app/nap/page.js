import React from "react";
import { VolunteerNAPTable } from "@/components/NAPTable";

export default function NapPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="pt-6"> {/* offset if navbar is fixed */}
        <VolunteerNAPTable />
      </div>
    </main>
  );
}
