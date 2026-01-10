// Vercel Serverless Function for Naver API
// API 키는 Vercel 환경 변수에 설정: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET

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

    const { endpoint, query, display, sort, x, y } = req.query || req.body || {};

    if (!endpoint) {
        return res.status(400).json({ error: 'endpoint parameter is required' });
    }

    if (endpoint !== 'local' && endpoint !== 'blog') {
        return res.status(400).json({ error: 'endpoint must be "local" or "blog"' });
    }

    if ((endpoint === 'local' || endpoint === 'blog') && !query) {
        return res.status(400).json({ error: 'query parameter is required' });
    }

    const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
    const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

    if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
        return res.status(500).json({ error: 'NAVER API keys not configured' });
    }

    try {
        let url = '';
        
        switch (endpoint) {
            case 'local':
                // 네이버 검색 API (Local) - 장소 검색
                url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=${display || 10}&sort=${sort || 'random'}`;
                break;
            case 'blog':
                // 네이버 검색 API (Blog) - 블로그 검색 (리뷰 키워드 추출용)
                url = `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(query)}&display=${display || 10}&sort=${sort || 'sim'}`;
                break;
            default:
                return res.status(400).json({ error: 'Invalid endpoint. Use: local, blog' });
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Naver API error:', error);
        return res.status(500).json({ error: error.message });
    }
}
