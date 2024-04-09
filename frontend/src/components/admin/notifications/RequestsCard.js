import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import { deleteApiNotification } from '@/api/notifications';

export default function RequestsCard(props) {

    const { notifications, setReload, onDecline } = props;

    const requests = notifications?.listRequests;

    const deleteNotificacion = (request) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to accept this invitation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept invitation!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteApiNotification(request)
                console.log(response);
                if (response.status === 200) {
                    Swal.fire(
                        'Accepted!',
                        `Now you are part of the team ${invitation.team.name}.`,
                        'success'
                    );
                } else {
                    response.response ? toast.error(response.response.data.message)
                        : toast.error('User canceled the operation.');
                }
                setReload(true);
            }
        })
        setReload(false);
    }

    if (requests) {
        return (
            <ul className="my-4 space-y-3">
                {requests.map((request, index) => {
                    return (
                        <li key={index}>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className='font-medium text-white ml-2'>{request.sender.name}</span> your invitation is pending to approval.</p>
                            <div className="flex p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <figcaption className="flex items-center justify-center space-x-3">
                                    <img className="rounded-full w-9 h-9" src={request.receiver.image} alt={request.receiver.name} />
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">You have invited <span className="space-y-0.5 font-medium text-blue-400 text-left uppercase">{request.receiver.name}</span> to be part of your team</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">status of your invitation is<span className={request.status === 'pending' ? 'font-medium text-yellow-400 uppercase' : request.status === 'accepted' ? 'font-medium text-green-400 uppercase' : 'font-medium text-red-400 uppercase'}> {request.status} </span> </div>
                                        <div className='flex justify-between'>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{moment(request.createdAt).startOf('hour').fromNow()}</div>
                                        </div>
                                    </div>
                                </figcaption>
                            </div>
                            <button onClick={() => onDecline(request._id)} className="bg-red-100 float-right mt-1 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Dismiss</button>
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        return null;
    }

}