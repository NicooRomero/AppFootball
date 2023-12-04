import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getApiTournament } from "@/api/tournament";
import { useUserContext } from "@/hooks/UserContext";
import AdminLayout from "@/layout/AdminLayout";
import TablePositions from "@/components/admin/Tournament/Table/TablePositions";
import InfoTournament from "@/components/admin/Tournament/Info/InfoTournament";
import Fixture from "@/components/admin/Tournament/Fixture/Fixture";

export default function Tournament() {

  const [tournament, setTournament] = useState([]);
  const [showfixture, setShowFixture] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { reload, setReload } = useUserContext();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getApiTournament();
      setTournament(data);
      setReload(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);


    return (
      <AdminLayout>
          <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col mt-6">
                  <div className="flex flex-row gap-2">
                          {showfixture ? <Fixture tournamentId={tournament[0]?._id} isAdmin={user?.isAdmin} setReload={setReload} reload={reload} /> : <TablePositions teams={tournament[0]?.teams} />}
                          <InfoTournament setShowFixture={setShowFixture} tournament={tournament} isAdmin={user?.isAdmin} setReload={setReload} />
                  </div>
              </div>
          </div>
      </AdminLayout>
    );
}
