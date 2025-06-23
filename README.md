### About the assignment?

Create a Custom API: Design and implement at least 4 different API endpoints that can be accessed by clients. These APIs can serve various functionalities such as retrieving, adding, updating, or deleting data from your database.

---

### Prerequisites & How to Set Up and Run the Project

Follow these steps to get the project running on your local machine using MongoDB as the database.

1. **Clone the Repository:**
   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/iamrudro/fellowship_session2.git
   cd fellowship_session2
   ```

2. **Build , Run and test the endpoints of the Application:**
   ```bash
   npm install
   npm run devStart
   ```
   ### Install REST CLient Extension in VSCode to interact with the APIs

---

### Available Endpoints

Once the application is running, you can interact with it using the following HTTP endpoints:

* **`GET /`**:
  * Fetch all the subscribers from MongoDB Database.
 
* **`GET /:id`**:
  * Fetch details of only one selected subscriber.

* **`POST /`**:
  * Create a new subscriber and store the details in MongoDB Database.

* **`PATCH /:id`**:
  * Update details of any existing subscriber.

* **`DELETE /:id`**:
  * Delete any subscriber from the database.

---

## 📸 Screenshot of MongoDB

<div class="image-container">
      <img alt="mongodb" src="https://github.com/user-attachments/assets/518037a4-eb17-407b-8c86-70d86e3bf5ce" width="500" height="300"/>
</div>

---

