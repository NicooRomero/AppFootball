import React from 'react';
import moment from 'moment';

export default function InvitationsCard(props) {

    const { notifications, onDecline, onAccept } = props;

    const invitations = notifications?.listInvitations

    if (invitations) {
        return (
            <ul className="my-4 space-y-3">
                {invitations.map((invitation, index) => {
                    return (
                        <li key={index}>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className='font-medium text-white ml-2'>{invitation.recipient.name}</span> {invitation.message}</p>
                            <div className="flex p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <figcaption className="flex items-center justify-center space-x-3">
                                    <img className="rounded-full w-9 h-9" src={invitation.sender.image} alt={invitation.sender.name} />
                                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                                        <div>{invitation.sender.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">He has invited you to join his team <span className='font-medium text-white'>{invitation.team.name}</span></div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{moment(invitation.createdAt).startOf('hour').fromNow()}</div>
                                    </div>
                                </figcaption>
                            </div>
                            <div className='flex mt-1 justify-end border-b border-gray-700'>
                                <button type="button" onClick={() => onAccept(invitation)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Accept</button>
                                <button type="button" onClick={() => onDecline(invitation._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Decline</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        return null;
    }

}