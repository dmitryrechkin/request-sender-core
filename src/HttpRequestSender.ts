import { type RequestSenderInterface } from './RequestSenderInterface';

export class HttpRequestSender implements RequestSenderInterface
{
	/**
	 * Sends a HTTP request to a given URL.
	 *
	 * @param {string} url - The endpoint URL
	 * @param {RequestInit} options - The request options (method, headers, body, etc.)
	 * @returns {Promise<Response>} - A promise that resolves to the response
	 */
	public async send(url: string, options: RequestInit = {}): Promise<Response>
	{
		console.log('Sending request to URL:', url);
		console.log('Request options:', JSON.stringify(options, null, 2));

		return fetch(url, {
			...options
		})
			.catch(error =>
			{
				console.error('Failed to send request:', JSON.stringify(error, null, 2));

				// Handle the exception and return a custom Response object
				const responseInit: ResponseInit = {
					status: 500,
					statusText: error.message
				};
				// Return a Response object with an appropriate error message
				return new Response(null, responseInit);
			})
			.then(async response =>
			{
				console.log('Received response status:', response.status);

				// Log the response body if it's JSON
				const contentType = response.headers.get('content-type');

				if (contentType && contentType.includes('application/json'))
				{
					const responseBody = await response.clone().json().catch(() => {response.text();});
					console.log('Received response body:', JSON.stringify(responseBody, null, 2));
				}
				else if (contentType && contentType.includes('text/plain'))
				{
					const responseBody = await response.clone().text();
					console.log('Received response body:', responseBody);
				}

				return response;
			});
	 }
}
