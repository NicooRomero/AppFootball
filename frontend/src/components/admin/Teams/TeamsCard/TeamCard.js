import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green, grey } from '@mui/material/colors';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SecurityIcon from '@mui/icons-material/Security';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Carousel from 'react-multi-carousel';
import ListPlayers from '../ListPlayers/ListPlayers';
import BasicModal from '@/components/Modal/BasicModal';
import './TeamCard.scss';
import 'react-multi-carousel/lib/styles.css';

const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(() => ({
    marginLeft: 'auto'
}));

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1280,
        },
        items: 4,
        partialVisibilityGutter: 40,
    },
    mobile: {
        breakpoint: {
            max: 480,
            min: 0,
        },
        items: 1,
        partialVisibilityGutter: 30,
    },
    tablet: {
        breakpoint: {
            max: 1366,
            min: 480,
        },
        items: 3,
        partialVisibilityGutter: 30,
    },
}

export default function TeamCard(props) {

    const [showModal, setShowModal] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teamPlayers, setTeamPlayers] = useState([])
    const { teams } = props;



    return (
        <div className='team-card'>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3000}
                centerMode={false}
                className="sliderContainer"
                containerClass="container-with-dots"
                dotListClass=""
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                showDots={true}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {teams.map((team, index) => (<CardTeam team={team} key={index} setTeamName={setTeamName} setTeamPlayers={setTeamPlayers} setShowModal={setShowModal} />))}
            </Carousel>
            <BasicModal
                show={showModal}
                setShow={setShowModal}
                title={`${teamName} players`}
            >
                <ListPlayers teamPlayers={teamPlayers} />
            </BasicModal>
        </div>
    );
}

function CardTeam(props) {

    const { team, setTeamName, setTeamPlayers, setShowModal } = props;

    const handleExpandClick = () => {
        setShowModal(true);
        setTeamName(team.name);
        setTeamPlayers(team.players);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    team.image ? <Avatar sx={{ bgcolor: red[500] }} src={team.image} aria-label="teamImage" />
                        :
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="teamImage">
                            <SecurityIcon />
                        </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={team.name}
                subheader={`Leader: ${team.teamLeader[0].name} ${team.teamLeader[0].lastname}`}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={team.image}
                alt="Team image"
            /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <EmojiEventsIcon /> <ArrowDropUpIcon sx={{ color: green[500] }} />{team.win} <ArrowDropDownIcon sx={{ color: red[500] }} />{team.lose} <ArrowRightIcon />{team.tie}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="ig">
                    <InstagramIcon sx={{ color: grey[500] }} />
                </IconButton>
                <IconButton aria-label="face">
                    <FacebookIcon sx={{ color: grey[500] }} />
                </IconButton>
                <IconButton aria-label="twtr">
                    <TwitterIcon sx={{ color: grey[500] }} />
                </IconButton>
                <ExpandMore
                    onClick={handleExpandClick}
                    aria-label="show players"
                >
                    <GroupsIcon sx={{ color: grey[50] }} />
                </ExpandMore>
            </CardActions>
        </Card>
    )
}


