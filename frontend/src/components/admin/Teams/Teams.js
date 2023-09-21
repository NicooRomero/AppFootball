import React from 'react';

import TeamCard from './TeamsCard/TeamCard';



export default function Teams(props) {

    const { teams } = props;

    return (        
            <TeamCard teams={teams} />
    )
}
