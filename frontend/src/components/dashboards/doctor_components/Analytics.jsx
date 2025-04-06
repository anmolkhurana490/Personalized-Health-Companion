import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';

const Analytics = () => {
    const { darkTheme } = useContext(AppContext);

    return (
        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
            <p>View your analytics here.</p>
        </div>
    );
};

export default Analytics;