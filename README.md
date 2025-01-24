## <header>How to Set Up and Run the News CRUD Application</header>

To set up and run the News CRUD application, follow these steps:

### 1. **Clone the Repositories**:
   - Clone both the **news-api** and **news-crud-app** repositories to any folder of your choice:
     - Open **File Explorer** or **Finder**, navigate to your desired folder.
     - Open the **Terminal** in that folder and run the following commands:
       ```bash
       git clone https://github.com/your-username/news-api
       git clone https://github.com/your-username/news-crud-app
       ```

### 2. **Set Up Laragon**:
   - **Download Laragon** 
   - Open **Laragon** and start **Apache** and **MySQL**.

### 3. **Create the Database**:
   - Open **HeidiSQL** and create a new database named `news_api`:
     - Right-click on the connection (usually `localhost`), select **Create new** -> **Database**.
     - Name the database `news_api`.

### 4. **Set Up the Backend (news-api)**:
   - Open **Terminal** and navigate to the backend directory (`news-api`):
     ```bash
     cd path/to/news-api
     ```
   - Run the migration to create the necessary tables in the `news_api` database:
     ```bash
     php artisan migrate
     ```
   - After the migration, start the Laravel development server:
     ```bash
     php artisan serve
     ```

### 5. **Set Up the Frontend (news-crud-app)**:
   - Open another **Terminal** window and navigate to the frontend directory (`news-crud-app`):
     ```bash
     cd path/to/news-crud-app
     ```
   - Install the frontend dependencies and start the development server:
     ```bash
     npm install
     npm start
     ```

### 6. **View the News Articles**:
   - Open your browser and go to `http://localhost:3000`.
   - You should see the news articles displayed on your browser.

Feel free to reach out if you encounter any issues or need further assistance.
