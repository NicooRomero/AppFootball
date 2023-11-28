import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getApiTournament } from "@/api/tournament";
import { getApiTeams } from "@/api/teams";
import AdminLayout from "@/layout/AdminLayout";
import TablePositions from "@/components/admin/Tournament/Table/TablePositions";
import InfoTournament from "@/components/admin/Tournament/Info/InfoTournament";
import Fixture from "@/components/admin/Tournament/Fixture/Fixture";

export default function tournament() {

  const [tournament, setTournament] = useState([]);
  const [showFixture, setShowFixture] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getApiTournament();
      setTournament(data);
    })();
  }, []);

  return (
    <AdminLayout>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col mt-6">
                <div className="flex flex-row gap-2">
                        {/* {showFixture ? <Fixture /> : <TablePositions teams={teams} />} */}
                        <InfoTournament setShowFixture={setShowFixture} tournament={tournament} isAdmin={user?.isAdmin} />
                </div>
            </div>
        </div>
    </AdminLayout>
  );
}
