import React from 'react';


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
}
