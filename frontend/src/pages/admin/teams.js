import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import TableTeams from '@/components/admin/Teams/TeamsCard/TableTeams';
import { getApiTeams } from '@/api/teams';

export default function teams() {

    const [teams, setTeams] = useState([]);
    const [reloadTeams, setReloadTeams] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getApiTeams()
            setTeams(response)
            setReloadTeams(false);
        })();
    }, [reloadTeams]);

    return (
        <AdminLayout>
            <TableTeams teams={teams} setReloadTeams={setReloadTeams} />
        </AdminLayout>
    )
}
