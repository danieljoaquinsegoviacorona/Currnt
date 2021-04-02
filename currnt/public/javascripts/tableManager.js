async function loadTableData() {

    await fetch('http://localhost:3000/users/list')
        .then((response) => { return response.json(); })
        .then((data) => { populateTableListing(data); })
        .catch((e) => console.log(`%c Error: ${e}`, 'background: #F00; color: #FFF'));
}

async function updateData() {
    const options = {
        method: 'PUT',
        url: `http://localhost:3000/users/update/${document.getElementById("userUpdateId").value}`,
        data: {
            first_name: document.getElementById("u_first_name").value,
            last_name: document.getElementById("u_last_name").value,
            password: document.getElementById("u_password").value,
            birth_date: document.getElementById("u_birth_date").value,
            gender: document.getElementById("u_gender").value
        },
        transformResponse: [(data) => {
            return data;
        }]
    };
    console.log(axios(options));
}

async function deleteUser(id) {
    await fetch(`http://localhost:3000/users/delete/${id}`, { method: 'DELETE' });
    userListing();
}

function populateTableListing(items) {
    const table = document.getElementById("tableBody");
    items.forEach(item => {
        let row = table.insertRow();
        let id = row.insertCell(0);
        id.innerHTML = item.user_id;
        let f_name = row.insertCell(1);
        f_name.innerHTML = item.first_name;
        let l_name = row.insertCell(2);
        l_name.innerHTML = item.last_name;
        let details = row.insertCell(3);
        details.innerHTML = `<a 
        class="waves-effect waves-light btn modal-trigger" 
        data-target="modal1"
        onclick="loadUserData(${item.user_id})">
        <i class="Large material-icons">details</i></a>`;
        let edit = row.insertCell(4);
        edit.innerHTML = `<a class="waves-effect waves-light btn" 
        onclick="updateUser(${item.user_id})"><i class="Large material-icons">update</i></a>`;
        let del = row.insertCell(5);
        del.innerHTML = `<a class="waves-effect waves-light btn" 
        onclick="deleteUser(${item.user_id})"><i class="Large material-icons">delete</i></a>`;
    });
}

async function loadUserData(id) {
    await fetch(`http://localhost:3000/users/get/${id}`)
        .then((response) => { return response.json(); })
        .then((data) => {
            loadGender(data);
        })
        .catch((e) => console.log(`%c Error: ${e}`, 'background: #F00; color: #000'));
}

async function loadGender(data) {
    await fetch(`http://localhost:3000/users/getGender/${data[0].gender}`)
        .then((response) => { return response.json(); })
        .then((gender) => {
            populateModal(data[0], gender[0]);
        })
        .catch((e) => console.log(`%c Error: ${e}`, 'background: #F00; color: #FFF'));
}

async function populateModal(data, gender) {
    let content = document.getElementById("contentModal");
    content.innerHTML = `<h4>${data.first_name} ${data.last_name}</h4> 
    <br>Password: XXXXXXXXXX
    <br>Gender: ${gender.name}
    <br>BirthDate: ${data.birth_date}`;
}

function hideAll() {
    let createUserForm = document.getElementById("createUserForm");
    createUserForm.className = 'row hide';
    let userListing = document.getElementById("userListing");
    userListing.className = "row hide";
    let updateUser = document.getElementById("updateUserForm");
    updateUser.className = "row hide";
}

function userListing() {
    console.log(`%c Entering to user listings.`, 'background: #F00; color: #FFF');
    hideAll();
    let container = document.getElementById("userListing");
    container.className = "row";
    container.innerHTML = `<table class="highlight">
        <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Open Details</th>
            <th>Edit User</th>
            <th>Delete User</th>
        </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>`;
    loadTableData();
}

function createUser() {
    hideAll();
    let container = document.getElementById("createUserForm");
    container.className = 'row';
}

async function updateUser(id) {
    const data = await fetch(`http://localhost:3000/users/get/${id}`)
        .then((response) => { return response.json(); })
        .then((data) => {
            return data;
        })
        .catch((e) => console.log(`%c Error: ${e}`, 'background: #F00; color: #000'));
    hideAll();
    let idInput = document.getElementById("userUpdateId");
    idInput.setAttribute("value", data[0].user_id);
    let fnInput = document.getElementById("u_first_name");
    fnInput.setAttribute("value", data[0].first_name);
    let lnInput = document.getElementById("u_last_name");
    lnInput.setAttribute("value", data[0].last_name);
    let pwdInput = document.getElementById("u_password");
    pwdInput.setAttribute("value", data[0].password);
    let bdInput = document.getElementById("u_birth_date");
    bdInput.setAttribute("value", data[0].birth_date);
    let gnInput = document.getElementById("u_gender");
    gnInput.setAttribute("value", data[0].gender);
    let container = document.getElementById("updateUserForm");
    container.className = 'row';
}


