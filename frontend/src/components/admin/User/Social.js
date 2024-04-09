import React, { useState } from 'react';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Social(props) {

    const { data } = props;

    return (
        <div>
            <div className="flex flex-col justify-between p-4 leading-normal h-[120px]">
                <h5 className="text-2xl font-bold tracking-tight text-white">Social Networks</h5>
                <p className="text-sm font-normal text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
                <div className='flex'>                    
                    <Link href='#' className="items-center text-sm p-2 mr-1 font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
                        <span className="whitespace-nowrap"><InstagramIcon /> {data.social?.instagram ? data.social.instagram : 'Instagram'}</span>
                    </Link>
                    <Link href='#' className="items-center text-sm p-2 mr-1 font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
                        <span className="whitespace-nowrap"><FacebookIcon /> {data.social?.facebook ? data.social.facebook : 'Facebook'}</span>
                    </Link>
                    <Link href='#' className="items-center text-sm p-2 mr-1 font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
                        <span className="whitespace-nowrap"><TwitterIcon /> {data.social?.twitter ? data.social.twitter : 'Twitter'}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
