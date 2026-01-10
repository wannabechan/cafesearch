// Vercel Serverless Function for Kakao API
// API 키는 Vercel 환경 변수에 설정: KAKAO_API_KEY

export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { endpoint, query, x, y, radius, size } = req.query || req.body || {};

    if (!endpoint) {
        return res.status(400).json({ error: 'endpoint parameter is required' });
    }

    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
    if (!KAKAO_API_KEY) {
        return res.status(500).json({ error: 'KAKAO_API_KEY not configured' });
    }

    try {
        let url = '';
        
        switch (endpoint) {
            case 'address':
                url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}&size=${size || 15}`;
                break;
            case 'keyword':
                if (x && y && radius) {
                    url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&x=${x}&y=${y}&radius=${radius}&size=${size || 15}`;
                } else {
                    url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=${size || 15}`;
                }
                break;
            case 'coord2address':
                url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`;
                break;
            default:
                return res.status(400).json({ error: 'Invalid endpoint' });
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Kakao API error:', error);
        return res.status(500).json({ error: error.message });
    }
}
