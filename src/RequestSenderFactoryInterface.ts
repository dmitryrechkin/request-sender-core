import { type RequestSenderInterface } from './RequestSenderInterface';

export interface RequestSenderFactoryInterface
{
	/**
	 * Creates a new request sender instance.
	 *
	 * @param {unknown[]} args - The arguments to pass to the request sender constructor
	 * @returns {RequestSenderInterface} - The request sender instance
	 */
	create(...args: unknown[]): RequestSenderInterface;
}
