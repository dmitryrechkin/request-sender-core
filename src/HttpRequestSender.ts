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
			});
	 }
}
