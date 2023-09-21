import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#25282c',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function BasicModal(props) {

    const { show, setShow, title, children } = props;

    const onClose = () => setShow(false);

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }

    if(!show) return null;

    return (
        <div id="wrapper" onClick={handleClose} className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="relative">
                <div className="relative rounded-lg bg-gray-800 shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <Modal
    //             open={show}
    //             onClose={onClose}
    //             aria-labelledby="modal-modal-title"
    //             aria-describedby="modal-modal-description"
    //         >
    //             <Box sx={style}>
    //                 <Typography id="modal-modal-title" variant="h6" component="h2">
    //                     {title}
    //                 </Typography>
    //                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //                     {children}
    //                 </Typography>
    //             </Box>
    //         </Modal>
    //     </div>
    // )
}
