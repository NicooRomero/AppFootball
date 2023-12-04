import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import TableTeams from '@/components/admin/Teams/TeamsCard/TableTeams';
import { getApiTeams } from '@/api/teams';

export default function Teams() {

    const [teams, setTeams] = useState([]);
    const [reloadteams, setReloadTeams] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getApiTeams()
            setTeams(response)
            setReloadTeams(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadteams]);

    return (
        <AdminLayout>
            <TableTeams teams={teams} setReloadTeams={setReloadTeams} />
        </AdminLayout>
    )
}
