# Inventory Worker

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/arthurgubaidullin/inventory-worker)

**Inventory Worker** is a research-driven project aimed at creating a modular, loosely coupled application deployable on Cloudflare Workers and Cloudflare Pages. The project serves as a reusable template for future applications and explores the use of Google Protobuf for efficient HTTP contract management.

## Getting Started

If you already have VS Code and Docker installed, you can click the badge above or [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/arthurgubaidullin/inventory-worker) to get started.

Clicking these links will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

### Project Setup

**Setup Steps**:

1. Clone the repository

1. Install dependencies:

   `npm install`

1. Build the project:

   `npx turbo build`

1. Run the development server:

   `npm run dev -w web`

## Project Structure

### Applications

- `/web` — Web application.
- `/worker` — Cloudflare Workers application.

### Libraries

#### Catalog

- `/catalog` — Catalog bounded-context.
  - `/client` — State store.
  - `/http`
    - `/service` — HTTP service.
    - `/contracts` — HTTP contracts.
    - `/client` — HTTP client.
  - `/service` — Business logic.
  - `/database` — Database.

#### Inventory

- `/inventory` — Inventory bounded-context.
  - `/client` — State store (not implemented).
  - `/http`
    - `/service` — HTTP service.
    - `/contracts` — HTTP contracts.
    - `/client` — HTTP client (not implemented).
  - `/service` — Business logic.
  - `/database` — Database.

#### Others

- `/common` — Common modules.
- `/logger` — Logger service.
- `/services` — Services factory.
- `/http-services` — HTTP-related services factory.

## License

[MIT license](LICENSE).
