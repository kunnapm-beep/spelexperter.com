// Vercel Serverless Function - FootAPI7 Proxy
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const API_KEY = process.env.FOOTAPI_KEY || '9c5971aa6emsh5c4b0c31c8ab3e5p1e679fjsn5c28676954ce';
    const API_HOST = 'footapi7.p.rapidapi.com';

    try {
        // Get dates for today and tomorrow
        const matches = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const response = await fetch(
                `https://${API_HOST}/api/matches/${day}/${month}/${year}`,
                {
                    headers: {
                        'x-rapidapi-host': API_HOST,
                        'x-rapidapi-key': API_KEY
                    }
                }
            );

            if (!response.ok) continue;

            const json = await response.json();

            // Filter Premier League (tournament ID 17)
            const plMatches = (json.events || []).filter(e =>
                e.tournament?.uniqueTournament?.id === 17
            );

            matches.push(...plMatches);
        }

        // Transform to simpler format
        const transformed = matches.map(m => ({
            id: m.id,
            home: m.homeTeam?.name || 'TBD',
            away: m.awayTeam?.name || 'TBD',
            date: new Date(m.startTimestamp * 1000).toISOString().split('T')[0],
            time: new Date(m.startTimestamp * 1000).toLocaleTimeString('sv-SE', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Stockholm'
            }),
            timestamp: m.startTimestamp,
            status: m.status?.code || 0,
            statusText: m.status?.description || '',
            homeScore: m.homeScore?.current ?? null,
            awayScore: m.awayScore?.current ?? null,
            isLive: [6, 7, 31].includes(m.status?.code) // 1H, 2H, HT
        }));

        // Sort by timestamp
        transformed.sort((a, b) => a.timestamp - b.timestamp);

        res.status(200).json({
            success: true,
            count: transformed.length,
            matches: transformed,
            updated: new Date().toISOString()
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
