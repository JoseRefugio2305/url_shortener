# Client
## Getting Started
Instructions for initializing the client project in React JS and Vite
### Prerequisites

-  NodeJS 22+
-  pnpm 10+

### Installation

1. **Instalación de dependencias.**

   Once the repository has been cloned, you need to go to the `client` directory and install the required dependencies.

   ```bash
   cd ./cilent

   pnpm install
   ```

2. **Configuration of environment variables.**

   In the `client/` path create the **_.env_** file with the following properties

   ```
   VITE_BASE_URL_PAGE= url_from_client
   VITE_API_BASE_URL_PAGE=url_from_api
   ```

   Replace the corresponding values ​​with the ones you will use in the application.

## Usage
How to execute the client

### Running the application

To start the application run the following command:

```bash
pnpm run dev
```

The server will be available at **`http://localhost:5173`**.

### Routes

-  **`/`** -> Main route where URL shortening and manual visits are carried out
-  **`/:short_url_code`** -> Route to make the request to the API service, in order to obtain the original URL and be redirected to it or display an error message if necessary.
-  **`/login`** -> Path to log in or register in the application
-  **`/dashboard`** -> Route where all the URLs shortened by the user are displayed and where you can search, edit, delete and consult URL statistics.
-  **`/*`** -> When trying to enter a non-existent route, a 404 page is displayed.