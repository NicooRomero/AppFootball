import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import TablePlayers from '@/components/admin/Players/TablePlayers';
import { getApiPlayers } from '@/api/user';


export default function Players() {

    const [players, setPlayers] = useState([]);
    const [reloadUser, setReloadUser] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getApiPlayers()
            setPlayers(response)
        })();
    }, [reloadUser]);

    return (
        <AdminLayout>
            <TablePlayers players={players} setReloadUser={setReloadUser} />
        </AdminLayout>
    )
}
