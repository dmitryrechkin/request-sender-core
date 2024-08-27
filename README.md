
# Request Sender Core

**Request Sender Core is a TypeScript library that provides a unified and extensible interface for sending HTTP requests.** This library is designed to be the foundation for implementing request-sending adapters, allowing you to easily integrate with various APIs or services while keeping your codebase clean and consistent.

## Installation

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/request-sender-core
```

## Features

- **Unified Interface**: A single interface (`RequestSenderInterface`) to handle HTTP requests, making it easy to swap out implementations without changing the consumer code.
- **Factory Pattern**: Use the `RequestSenderFactoryInterface` to create instances of request senders, allowing for dynamic instantiation based on specific requirements.
- **Extensibility**: Easily extend the library using the Adapter Pattern to create specialized request senders for different services.
- **Error Handling**: Built-in error handling for network failures, returning custom responses to ensure consistent behavior.

## Usage

### Sending a Basic HTTP Request

```typescript
import { HttpRequestSender } from "@dmitryrechkin/request-sender-core";

const requestSender = new HttpRequestSender();
const response = await requestSender.send('https://example.com/api', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
});

console.log('Response status:', response.status);
```

### Using the Factory Pattern

The factory pattern allows you to create instances of `RequestSenderInterface` dynamically, which can be useful in scenarios where you need different implementations based on runtime conditions.

#### Creating a Factory

First, implement the `RequestSenderFactoryInterface`:

```typescript
import { RequestSenderFactoryInterface } from "@dmitryrechkin/request-sender-core";
import { HttpRequestSender } from "@dmitryrechkin/request-sender-core";

export class HttpRequestSenderFactory implements RequestSenderFactoryInterface {
    public create(...args: unknown[]): HttpRequestSender {
        // Create and return a new HttpRequestSender instance
        return new HttpRequestSender();
    }
}
```

#### Using the Factory to Create a Request Sender

```typescript
import { HttpRequestSenderFactory } from './HttpRequestSenderFactory';

const factory = new HttpRequestSenderFactory();
const requestSender = factory.create(); // Create a new HttpRequestSender instance

const response = await requestSender.send('https://example.com/api', {
    method: 'POST',
    body: JSON.stringify({ key: 'value' }),
});

console.log('Response status:', response.status);
```

### Extending with Custom Adapters

To create a specialized adapter for a specific service, implement the `RequestSenderInterface`:

```typescript
import { RequestSenderInterface } from "@dmitryrechkin/request-sender-core";

export class CustomServiceRequestSender implements RequestSenderInterface {
    public async send(url: string, options: RequestInit = {}): Promise<Response> {
        // Custom implementation for sending requests to your specific service
        return fetch(url, {
            ...options,
            // Add custom logic here
        });
    }
}
```

### Using a Custom Adapter with a Factory

You can also create a factory for your custom adapter:

```typescript
import { RequestSenderFactoryInterface } from "@dmitryrechkin/request-sender-core";
import { CustomServiceRequestSender } from './CustomServiceRequestSender';

export class CustomServiceRequestSenderFactory implements RequestSenderFactoryInterface {
    public create(...args: unknown[]): CustomServiceRequestSender {
        return new CustomServiceRequestSender();
    }
}
```

This pattern allows you to abstract away the creation logic and use the same factory interface for different implementations, providing flexibility and modularity in your codebase.

## When to Use

`Request Sender Core` is ideal for projects that require a flexible and maintainable approach to handling HTTP requests, such as:

- **API Integrations**: Build integrations with various APIs using a consistent interface.
- **Service Adapters**: Create custom adapters for different services, ensuring your codebase remains clean and modular.
- **Error-Resilient Applications**: Leverage built-in error handling to manage network failures and ensure consistent responses.
- **Dynamic Request Handling**: Use factories to dynamically create instances of request senders based on runtime conditions.

## Installation & Setup

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/request-sender-core
```

Ensure your project is set up to handle TypeScript and supports ES modules, as this library is built with modern JavaScript standards.

## Rationale

### Extensibility with the Adapter and Factory Patterns

The `Request Sender Core` library is built with extensibility in mind, using both the Adapter and Factory Patterns. These patterns allow you to:

- **Decouple Implementation from Usage**: The consumer code only interacts with interfaces, not specific implementations. This makes it easier to switch out implementations as needed.
- **Promote Reusability**: Create adapters and factories that can be reused across different projects or modules, saving time and effort.
- **Simplify Testing**: With consistent interfaces, testing becomes easier since you can mock or replace implementations without modifying the tests themselves.
- **Dynamic Instantiation**: The factory pattern allows for flexible and dynamic creation of request sender instances, tailored to the specific needs of your application.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can run unit tests using:

```bash
pnpm test
```
