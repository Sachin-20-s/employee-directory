import { mockEmployees } from './data.js';
import { generateUUID } from './id.js';
import {deptRoles} from './deptRoles.js'

// =================== Selectors ===================
const navbarCont = document.getElementById("navbarCont");
const navButtonBar = document.getElementById("navButtonBar");
const navButtonClose = document.getElementById("navButtonClose");
const extraAdd = document.getElementById("extraAdd");
const addEmployee = document.getElementById("addEmployee");
const department=document.getElementById("department");
const role=document.getElementById("role");
const departmentEdit=document.getElementById("departmentEdit");
const roleEdit=document.getElementById("roleEdit");
const filter=document.getElementById("filter");
const filterPopoupBtn=document.getElementById("filterPopoupBtn");
const filterRole=document.getElementById("filterRole");
const search=document.getElementById("search");
const show=document.getElementById("show");
let page=0;
let filteredGlobal = [];
let itemsPerPage = 10;

// =================== Event Listeners ===================
window.addEventListener('DOMContentLoaded', render);
navButtonBar.addEventListener('click', showMenu);
navButtonClose.addEventListener("click", hideMenu);
addEmployee.addEventListener("click", openAddForm);
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popupOverlay").classList.add("hidden");
});
document.getElementById("employeeForm").addEventListener("submit", handleAddEmployee);
department.addEventListener("change",changeSelect);
departmentEdit.addEventListener("change",changeDept);
filterPopoupBtn.addEventListener("click",(()=>{
  document.getElementById("filterPopoup").classList.add("hidden");
}))
filter.addEventListener("click",openFilterForm);
filterDeptName.addEventListener("change",changeSelectFilter);
search.addEventListener("keydown",searchClicked);
show.addEventListener("change",numberOfItems);

document.getElementById("prevPage").addEventListener("click", () => {
  if (page > 0) {
    page--;
    render();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredGlobal.length / itemsPerPage);
  if (page < totalPages - 1) {
    page++;
    render();
  }
});

document.getElementById("searchMobile").addEventListener("keydown", searchClicked);
document.getElementById("filterMobile").addEventListener("click", openFilterForm);


// =================== Render Function ===================
function render(id) {
  const container = document.getElementById('employee-list-container');
  container.innerHTML = '';

  const isMobile = window.innerWidth <= 768;
  const searchInput = isMobile
    ? document.getElementById("searchMobile")
    : document.getElementById("search");

  const searchValue = searchInput.value.trim().toLowerCase();
  const filterFirstName = document.getElementById("filterFirstName")?.value.trim().toLowerCase();
  const filterDept = document.getElementById("filterDeptName")?.value;
  const filterRole = document.getElementById("filterRole")?.value;

  let filteredEmployees = mockEmployees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();

    const matchSearch = (
      emp.firstName.toLowerCase().includes(searchValue) ||
      emp.lastName.toLowerCase().includes(searchValue) ||
      emp.email.toLowerCase().includes(searchValue) ||
      fullName.includes(searchValue)
    );

    const matchFirstName = filterFirstName ? emp.firstName.toLowerCase().startsWith(filterFirstName) : true;
    const matchDept = filterDept ? emp.department === filterDept : true;
    const matchRole = filterRole ? emp.role === filterRole : true;

    // Custom logic for "ALL" department
    if (filterDept === "ALL") {
      return matchSearch && matchFirstName;
    }

    return matchSearch && matchFirstName && matchDept && matchRole;
  });

  const sortValue = document.getElementById("sortSelect")?.value;
  if (sortValue === "firstName") {
    filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortValue === "lastName") {
    filteredEmployees.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } else if (sortValue === "email") {
    filteredEmployees.sort((a, b) => a.email.localeCompare(b.email));
  }

  // Save globally
  filteredGlobal = filteredEmployees;

  // Paginate
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filteredEmployees.slice(start, end);

  // Render only current page
  paginated.forEach(emp => {
    const card = document.createElement('li');
    card.className = 'list-item';
    card.innerHTML = `
      <h3 class="headName">${emp.firstName} ${emp.lastName}</h3>
      <p class="headName">Email: ${emp.email}</p>
      <p class="headName">Department: ${emp.department}</p>
      <p class="headName">Role: ${emp.role}</p>
      <div class="containerBtn">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    card.querySelector(".delete-btn").addEventListener("click", () => deleteEmployee(emp.id));
    card.querySelector(".edit-btn").addEventListener("click", () => openEditForm(emp.id));
    container.appendChild(card);
  });

  // Update page number display
  document.getElementById("pageNumber").textContent = page + 1;
}

function numberOfItems() {
  const value = document.getElementById("show").value;
  itemsPerPage = value === "Infinite Scroll" ? filteredGlobal.length : parseInt(value);
  page = 0;
  render();
}


// =================== Search Functions ===================
function searchClicked(event){
  if(event.key==="Enter") render();
}
// =================== Add Functions ===================
function openAddForm() {
  document.getElementById("popupOverlay").classList.remove("hidden");
  const dept = document.getElementById("department").value;
  const matched = deptRoles.find(each => dept === each.id);
  if (!matched) return;

  role.innerHTML = '';
  matched.roles.forEach(each => {
    const temp = document.createElement('option');
    temp.textContent = each;
    role.appendChild(temp);
  });
}

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popupOverlay").classList.add("hidden");
  document.getElementById("employeeForm").reset(); // reset form
});


function handleAddEmployee(e) {
  e.preventDefault();

  const newEmp = {
    id: generateUUID(),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim()
  };

  mockEmployees.push(newEmp);
  render();
  e.target.reset();
  document.getElementById("popupOverlay").classList.add("hidden");
}

// =================== Edit Functions ===================
function openEditForm(id) {
  const overlay = document.getElementById("popupOverlayEdit");
  overlay.classList.remove("hidden");

  const emp = mockEmployees.find(e => e.id === id);
  if (!emp) return;

  // Populate form
  document.getElementById("firstNameEdit").value = emp.firstName;
  document.getElementById("lastNameEdit").value = emp.lastName;
  document.getElementById("emailEdit").value = emp.email;
  document.getElementById("departmentEdit").value = emp.department;
  const dept=emp.department;
  roleEdit.innerHTML='';
  const value=deptRoles.find(each=>dept===each.id).roles
  value.map(each=>{
    const temp=document.createElement('option');
    if(each===emp.role) temp.selected=true;
    temp.textContent=each 
    roleEdit.appendChild(temp);
  })
  

  // Close button
  document.getElementById("closePopupEdit").addEventListener("click", () => {
    overlay.classList.add("hidden");
  }, { once: true });

  // Submit handler
  const form = document.getElementById("employeeFormEdit");
  form.addEventListener("submit", function handleEdit(e) {
    e.preventDefault();

    emp.firstName = document.getElementById("firstNameEdit").value.trim();
    emp.lastName = document.getElementById("lastNameEdit").value.trim();
    emp.email = document.getElementById("emailEdit").value.trim();
    emp.department = document.getElementById("departmentEdit").value.trim();
    emp.role = document.getElementById("roleEdit").value.trim();

    render();
    form.reset();
    overlay.classList.add("hidden");

    form.removeEventListener("submit", handleEdit); // prevent duplicate binds
  }, { once: true });
}

//Edit Dept or Roles
function changeDept(event){
  const dept=event.target.value;
  console.log(dept);
  roleEdit.innerHTML='';
  const value=deptRoles.find(each=>dept===each.id).roles
  value.map(each=>{
    const temp=document.createElement('option');
    temp.textContent=each 
    roleEdit.appendChild(temp);
  })
}

// =================== Delete ===================
function deleteEmployee(id) {
  const emp = mockEmployees.find(e => e.id === id);
  if (!emp) return;

  const confirmDelete = confirm(`Are you sure you want to delete ${emp.firstName} ${emp.lastName}?`);
  if (!confirmDelete) return;

  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    mockEmployees.splice(index, 1);
    render();
  }
}


// =================== Navigation Toggle ===================
function showMenu() {
  navButtonClose.classList.remove("navDrop");
  navButtonBar.classList.add("navDrop");
  extraAdd.classList.remove("navDrop");
}

function hideMenu() {
  navButtonClose.classList.add("navDrop");
  navButtonBar.classList.remove("navDrop");
  extraAdd.classList.add("navDrop");
}

// =================== Options Toggle ===================
function changeSelect(event){
  const dept=event.target.value;
  console.log(dept);
  role.innerHTML='';
  const value=deptRoles.find(each=>dept===each.id).roles
  value.map(each=>{
    const temp=document.createElement('option');
    temp.textContent=each 
    role.appendChild(temp);
  })
}

// =================== Filter Form Toggle ===================
function openFilterForm() {
  const filterPopup = document.getElementById("filterPopoup");
  filterPopup.classList.remove("hidden");
  const dept = document.getElementById("filterDeptName").value;
  const matched = deptRoles.find(each => dept === each.id);
  if (!matched) return;

  filterRole.innerHTML = '';
  matched.roles.forEach(each => {
    const temp = document.createElement('option');
    temp.textContent = each;
    filterRole.appendChild(temp);
  });

  const form = document.getElementById("filterForm");
  form.addEventListener("submit", function handleEdit(e) {
    e.preventDefault();
    render();
    filterPopup.classList.add("hidden");
    form.removeEventListener("submit", handleEdit);
  }, { once: true });
  const reset1 = document.getElementById("resetBtn");
  reset1.addEventListener('click', function handleReset() {
  document.getElementById("filterForm").reset();
  render(); // show full employee list
  filterPopup.classList.add("hidden"); // hide the filter popup
}, { once: true }); // optional: prevent duplicate binds

}

function changeSelectFilter(event){
  filterRole.innerHTML="";
  const dept=event.target.value;
  console.log(dept);
  role.innerHTML='';
  const value=deptRoles.find(each=>dept===each.id).roles
  value.map(each=>{
    const temp=document.createElement('option');
    temp.textContent=each 
    filterRole.appendChild(temp);
  })
}

// =================== Render temp values ===================

function renderChoice(values){

  const container = document.getElementById('employee-list-container');
  container.innerHTML = '';

  values.forEach(emp => {
    const card = document.createElement('li');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    card.querySelector(".delete-btn").addEventListener("click", () => deleteEmployee(emp.id));
    card.querySelector(".edit-btn").addEventListener("click", () => openEditForm(emp.id));
    
    container.appendChild(card);
  });
}

// =================== Sort ===================

document.getElementById("sortSelect").addEventListener('change',render);
