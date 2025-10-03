# API Flask
## Getting Started

These instructions will help you run the project API developed in Flask.

### Prerequisites

-  Python 3.8+
-  MySQL 8+ (Optional. Only if this manager was used as a database)

### Installation

1. **Creating and activating the Python virtual environment**

   Once the repository is cloned, inside the api/ directory

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install the required dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configuration of environment variables.**

   In the api/ path create the **_.env_** file with the following properties

   ```
   SECRET_KEY = secret_key
   SQLALCHEMY_DATABASE_URI = database_uri
   JWT_SECRET_KEY = jwt_secret_key
   URL_FRONT = url_from_frontend
   ENV = development_or_production
   ```

   Replace the corresponding values ​​with the ones you will use in the application.

   The frontend URL is required for CORS policy settings.

4. **Initialize the database**

   If you choose to use **MySQL** or a similar manager, you must first create a database called **urlshortener**. The tables will be automatically created based on the models when the application is first run.


## Usage
How to execute the API

### Running the application

To start the API in Flask, run the following command:

```bash
flask run
# or
flask --app app.py run
```

To activate debug mode you must add the **`--debug`** flag to the end of the command.

The server will be available at **`http://127.0.0.1:5000`**.

***When initializing the application, the `./logs` path will be created where the application log files will be stored.***

### Endpoints

The different endpoints of the API are documented below.

#### Authentication Endpoints

-  **[POST] `auth/register`** -> Register a new user:

   -  Request body:
      ```json
      {
         "email": "str",
         "password": "str"
      }
      ```
   -  Response body:

      code `201`

      ```json
      {
         "message": "str"
      }
      ```

-  **[POST] `auth/login`** -> User login:

   -  Request body:
      ```json
      {
         "email": "str",
         "password": "str"
      }
      ```
   -  Response body:

      code `200`

      ```json
      {
         "message": "str",
         "jwtToken": "str"
      }
      ```

#### URL Shortening Endpoints

-  **[POST] `url/shorten`** -> Shorten URL:

   -  **Headers:** `Authorization: Bearer jwt_token`
   -  Request body:
      ```json
      {
         "original_url": "HttpUrl"
      }
      ```
   -  Response body:

      code `201`

      ```json
      {
         "message": "str",
         "id": "int",
         "original_url": "str",
         "short_url": "str",
         "created_At": "str",
         "updated_At": "str"
      }
      ```

-  **[GET] `url/shorten/<url_code>`** -> Get the original url:

   -  Parameter: `url_code` is the code assigned to the shortened url
   -  Response body:

      code `200`

      ```json
      {
         "message": "str",
         "id": "int",
         "original_url": "str",
         "short_url": "str",
         "created_At": "str",
         "updated_At": "str"
      }
      ```

-  **[PUT] `url/shorten`** -> Update shortened url:

   -  **Headers:** `Authorization: Bearer jwt_token`
   -  Request body:
      ```json
      {
         "short_url": "str",
         "new_original_url": "HttpUrl"
      }
      ```
   -  Response body:

      code `200`

      ```json
      {
         "message": "str",
         "id": "int",
         "original_url": "str",
         "short_url": "str",
         "created_At": "str",
         "updated_At": "str"
      }
      ```

-  **[DELETE] `url/shorten/<url_code>`** -> Remove shortened url:

   -  **Headers:** `Authorization: Bearer jwt_token`
   -  Parameter: `url_code` is the code assigned to the shortened url
   -  Response body:

      code `204`

      ```json
      {
         "message": "str"
      }
      ```

-  **[GET] `url/shorten/stats/<url_code>`** -> Get statistics from a shortened url

   -  **Headers:** `Authorization: Bearer jwt_token`
   -  Parameter: `url_code` is the code assigned to the shortened url
   -  Response body:

      code `200`

      ```json
      {
         "message": "str",
         "id": "int",
         "original_url": "str",
         "short_url": "str",
         "created_At": "str",
         "updated_At": "str",
         "clicks": "int",
         "last_accessed_at": "str|null"
      }
      ```