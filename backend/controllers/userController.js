const Player = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../services/jwt');
const moment = require('moment');

exports.getUsers = async (req, res) => {

    try {

        if (req.query) {
            const { limit } = req.query;

            let listPlayers = await Player.find().sort({ date: -1 }).limit(limit).select('-password').populate('team','name');;

            if (listPlayers.totalDocs === 0) return res.status(404).send({ message: 'No se han encontrado jugadores.' });

            return res.status(200).send({ listPlayers });
        }

        // let listPlayers = await Post.find().sort({ date: -1 });

        // if(listPlayers.totalDocs === 0) return res.status(404).send({ message: 'No se han creado post aún.' });

        // return res.status(200).send({ listPlayers });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.getUser = async (req, res) => {
    const params = req.params;

    try {

        let player = await Player.findById(params.id).select('-password').populate('team');;

        if (!player) return res.status(400).send({ message: 'Jugador no encontrado.' });

        return res.status(200).send({ player });

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.addUsers = async (req, res) => {

    const { name, email, password, repassword, document, birthday } = req.body;
    const file = req.file;

    if (!name || !email || !password || !repassword || !document || !birthday) return res.status(400).send({ message: 'Error! Todos los campos son obligatorios.' });

    try {

        let player = await Player.findOne({ email });
        let playerDoc = await Player.findOne({ document });

        if (player || playerDoc) return res.status(400).send({ message: 'Ya existe un usuario registrado con ese correo o n° de documento.' });

        player = new Player(req.body);

        if (file) {
            const fileName = req.file.filename;
            const folder = document
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/players/${folder}/`;
            player.image = await `${basePath}${fileName}`;
        }

        player.email = email.toLowerCase();

        if (password !== repassword) return res.status(400).send({ message: 'Las contraseñas no coinciden.' });

        const salt = await bcryptjs.genSalt(10);
        player.password = await bcryptjs.hash(password, salt);

        await player.save();

        return res.status(200).send({ status: 200, message: 'Usuario creado con éxito.', player });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.editUser = async (req, res) => {

    const playerData = req.body;
    const params = req.params;
    const file = req.file;

    try {

        player = await Player.findById(params.id);

        if(!player) return res.status(404).send({ message: 'El jugador no se encuentra registrado.' });

        if (file) {
            const fileName = req.file.filename;
            const folder = player.document
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/players/${folder}/`;
            playerData.image = await `${basePath}${fileName}`;
        }

        await Player.findByIdAndUpdate(params.id, playerData);

        return res.status(200).send({ status: 200, message: 'Datos actualizados correctamente.' })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.changePassword = async (req, res) => {
    
    const params = req.params;
    const body = req.body;

    try {

        player = await Player.findById(params.id);

        if(!player) return res.status(404).send({ message: 'El jugador no existe.' });

        const { currentPassword, newPassword, reNewPassword} = body;
        
        
        if(!currentPassword || !newPassword || !reNewPassword){ 
            return res.status(400).send({ message: 'Para cambiar la password todos los campos son obligatorios.' });
        } else {
            if(currentPassword && newPassword === reNewPassword){

                const currentPassOK = await bcryptjs.compare(currentPassword, player.password);
                
                if(currentPassOK) {
                    const salt = await bcryptjs.genSalt(10);
                    setNewPassord = await bcryptjs.hash(newPassword, salt);

                    await Player.findByIdAndUpdate(params.id, {password: setNewPassord});
                } else {
                    return res.status(400).send({ message: 'La contraseña actual es incorrecta.' });
                }
            } else {
                return res.status(400).send({ message: 'Las contraseñas nuevas no coincide.' });
            }
        }

        return res.status(200).send({ message: 'La contraseña fue cambiada correctamente.' });        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deletePlayer = async (req, res) => {
    const params = req.params;

    try {

        let player = await Player.findByIdAndRemove(params.id);

        if (!player) return res.status(400).send({ message: 'Jugador no encontrado.' });

        return res.status(200).send({ message: 'El jugador fue eliminado.' });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.searchUsers = async (req, res) => {

    try {

        const nPlayer = req.query.name
        const lPlayer = req.query.lastname
        const tPlayer = req.query.team
        let sort = req.query.sort || "dateCreated";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const filter = {};
        if (nPlayer || lPlayer || tPlayer) {
            filter.$or = [];
        
            if (nPlayer) {
                filter.$or.push({ name: { $regex: nPlayer, $options: 'i' } });
            }
        
            if (lPlayer) {
                filter.$or.push({ lastname: { $regex: lPlayer, $options: 'i' } });
            }
        
            if (tPlayer) {
                filter.$or.push({ team: { $regex: tPlayer, $options: 'i' } });
            }
        }
        
        const players = await Player.find(filter).sort(sortBy);

        const total = await Player.countDocuments(filter);

        const response = {
            total,
            players
        };

        return res.status(200).send({ response });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        let user = await Player.findOne({ email });

        if(!user) return res.status(404).send({ message: 'Error! El usuario no existe.' });

        const passOk = await bcryptjs.compare(password, user.password);

        if(!passOk) return res.status(400).send({ message: 'La contraseña es incorrecta.' });

        return res.status(200).send({ accessToken: jwt.accessToken(user), refreshToken: jwt.refreshToken(user) });
        
    } catch (error) {
        console.log(error);
        return res.status(5000).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.setState = async (req, res) => {
    const { newState, newDate } = req.body;
    const { id } = req.params;

    try {
        let updateFields = {};
        let message = '';

        if (newDate && !newState) {
            const currentDate = new Date();
            const selectedDate = new Date(newDate);

            if (selectedDate > currentDate) {
                updateFields = {
                    status: {
                        enabled: false,
                        toDate: selectedDate
                    }
                };
                message = `El jugador fue deshabilitado hasta ${moment(selectedDate).format('LL')}`;
            } else {
                return res.status(404).send({ message: 'La fecha seleccionada no puede ser menor a la fecha actual.' });
            }

        } else if (newState == true && !newDate) {
            updateFields = {
                status: {
                    enabled: true,
                    toDate: null
                }
            };
            message = 'El jugador fue habilitado.';
        }
        
        const user = await Player.findByIdAndUpdate(id, updateFields, { new: true });

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        return res.status(200).send({ message });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}





