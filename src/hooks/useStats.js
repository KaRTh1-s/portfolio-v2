import { useState, useEffect } from 'react';

export const useStats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadStats = async () => {
            try {
                const response = await fetch('/.netlify/functions/stats');
                if (!response.ok) {
                    throw new Error(`Stats endpoint error: ${response.status}`);
                }
                const result = await response.json();
                if (isMounted) {
                    if (result && (result.github || result.leetcode)) {
                        setData(result);
                    } else {
                        throw new Error('Malformed stats data');
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadStats();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
};
