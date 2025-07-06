    
    const form = document.getElementById("registrationForm");
    const userTable = document.getElementById("userTable");
    const editIndexInput = document.getElementById("editIndex");

    // Fetch users from local storage
    function getUsers() {
      return JSON.parse(localStorage.getItem("users")) || [];
    }

    // Save users to local storage
    function saveUsers(users) {
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Render users in the table
    function renderUsers() {
      const users = getUsers();
      userTable.innerHTML = users.map((user, index) => `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
            <button class="btn edit" onclick="editUser(${index})">Edit</button>
            <button class="btn delete" onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>
      `).join("");
    }

    // Add or update user
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const editIndex = parseInt(editIndexInput.value);

      const users = getUsers();

      if (editIndex === -1) {
        // Add new user
        users.push({ name, email, phone });
      } else {
        // Update existing user
        users[editIndex] = { name, email, phone };
        editIndexInput.value = -1; // Reset the edit index
        form.querySelector("button[type='submit']").textContent = "Submit"; // Reset button text
      }

      saveUsers(users);
      form.reset();
      renderUsers();
    });

    // Edit user
    function editUser(index) {
      const users = getUsers();
      const user = users[index];

      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;
      editIndexInput.value = index;
      form.querySelector("button[type='submit']").textContent = "Update";
    }

    // Delete user
    function deleteUser(index) {
      const users = getUsers();
      users.splice(index, 1);
      saveUsers(users);
      renderUsers();
    }

    // Initialize table
    renderUsers();