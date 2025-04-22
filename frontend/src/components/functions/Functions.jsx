import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VideoCall from './VideoCall'

const FunctionsRoutes = () => {
    return (
        <Routes>
            <Route path="video-call/*" element={<VideoCall />} />
        </Routes>
    )
}

const Functions = () => {
    return (
        <div className='w-3/5'>
            <FunctionsRoutes />
        </div>
    )
}

export default Functions
