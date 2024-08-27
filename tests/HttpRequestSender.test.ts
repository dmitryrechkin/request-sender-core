import { describe, it, expect, vi } from 'vitest';
import { HttpRequestSender } from '../src/HttpRequestSender';

describe('HttpRequestSender', () => {
	it('should send a HTTP request and return the response', async () => {
		const mockFetch = vi.fn();
		global.fetch = mockFetch;

		const url = 'https://example.com/api';
		const options: RequestInit = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		const mockResponse = new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});

		mockFetch.mockResolvedValue(mockResponse);

		const requestSender = new HttpRequestSender();
		const response = await requestSender.send(url, options);

		// Assertions
		expect(mockFetch).toHaveBeenCalledWith(url, options);
		expect(response.status).toBe(200);
		const json = await response.json();
		expect(json).toEqual({ success: true });

		// Restore the original fetch
		vi.restoreAllMocks();
	});

	it('should handle request failure and return a custom response', async () => {
		const mockFetch = vi.fn();
		global.fetch = mockFetch;

		const url = 'https://example.com/api';
		const options: RequestInit = { method: 'GET' };

		const mockError = new Error('Network Error');
		mockFetch.mockRejectedValue(mockError);

		const requestSender = new HttpRequestSender();
		const response = await requestSender.send(url, options);

		// Assertions
		expect(response.status).toBe(500);
		expect(response.statusText).toBe('Network Error');

		// Restore the original fetch
		vi.restoreAllMocks();
	});
});
