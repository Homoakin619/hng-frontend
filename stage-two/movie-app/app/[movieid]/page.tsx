import SideNavbar from '@/components/SideNavbar'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className='main-container'>
        <SideNavbar />
        <div className="detail-container">
            <img id='player' src="/poster.png" alt="" />
            <div className="labels"></div>
            <div className="details-segment">
                
            </div>
        </div>
    </main>
  )
}