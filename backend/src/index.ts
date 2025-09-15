/**
 * Newsletter Subscription API
 * CloudFlare Workers backend for AI newsletter subscription
 */

interface Env {
	DB: D1Database;
}

// CORS 헤더 설정
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Max-Age': '3600',
};

// 이메일 유효성 검증
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// CORS preflight 요청 처리
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		try {
			const url = new URL(request.url);
			const path = url.pathname;

			// 루트 경로 - 상태 확인
			if (path === '/' && request.method === 'GET') {
				return new Response(
					JSON.stringify({
						message: 'AI Newsletter Subscription API is running',
						version: '1.0.0',
						endpoints: {
							subscribe: 'POST /subscribe',
							health: 'GET /',
						},
					}),
					{
						headers: {
							'Content-Type': 'application/json',
							...corsHeaders,
						},
					}
				);
			}

			// 구독 엔드포인트
			if (path === '/subscribe' && request.method === 'POST') {
				const body = await request.json() as { email: string };
				
				// 이메일 유효성 검증
				if (!body.email || !isValidEmail(body.email)) {
					return new Response(
						JSON.stringify({
							success: false,
							message: '유효한 이메일 주소를 입력해주세요.',
						}),
						{
							status: 400,
							headers: {
								'Content-Type': 'application/json',
								...corsHeaders,
							},
						}
					);
				}

				try {
					// 이미 구독한 이메일인지 확인
					const existingSubscriber = await env.DB.prepare(
						'SELECT id FROM subscribers WHERE email = ?'
					)
						.bind(body.email)
						.first();

					if (existingSubscriber) {
						return new Response(
							JSON.stringify({
								success: false,
								message: '이미 구독하신 이메일입니다.',
							}),
							{
								status: 409,
								headers: {
									'Content-Type': 'application/json',
									...corsHeaders,
								},
							}
						);
					}

					// 새 구독자 추가
					await env.DB.prepare(
						'INSERT INTO subscribers (email) VALUES (?)'
					)
						.bind(body.email)
						.run();

					return new Response(
						JSON.stringify({
							success: true,
							message: '구독이 완료되었습니다. 곧 첫 번째 뉴스레터를 받아보실 수 있습니다!',
						}),
						{
							headers: {
								'Content-Type': 'application/json',
								...corsHeaders,
							},
						}
					);
				} catch (error) {
					console.error('Database error:', error);
					return new Response(
						JSON.stringify({
							success: false,
							message: '구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
						}),
						{
							status: 500,
							headers: {
								'Content-Type': 'application/json',
								...corsHeaders,
							},
						}
					);
				}
			}

			// 구독자 목록 조회 (관리자용)
			if (path === '/subscribers' && request.method === 'GET') {
				const subscribers = await env.DB.prepare(
					'SELECT id, email, created_at, status FROM subscribers ORDER BY created_at DESC'
				).all();

				return new Response(
					JSON.stringify({
						success: true,
						data: subscribers.results,
						count: subscribers.results.length,
					}),
					{
						headers: {
							'Content-Type': 'application/json',
							...corsHeaders,
						},
					}
				);
			}

			// 404 Not Found
			return new Response(
				JSON.stringify({
					success: false,
					message: '요청한 엔드포인트를 찾을 수 없습니다.',
				}),
				{
					status: 404,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				}
			);
		} catch (error) {
			console.error('Request error:', error);
			return new Response(
				JSON.stringify({
					success: false,
					message: '서버 오류가 발생했습니다.',
				}),
				{
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				}
			);
		}
	},
} satisfies ExportedHandler<Env>;