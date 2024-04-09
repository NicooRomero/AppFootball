import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import TableTeams from '@/components/admin/Teams/TeamsCard/TableTeams';
import { getApiTeams } from '@/api/teams';

export default function teams() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getApiTeams()
            setTeams(response)
        })();
    }, []);

    return (
        <AdminLayout>
            <TableTeams teams={teams} />
        </AdminLayout>
    )
}
