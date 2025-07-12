# Employee Directory

An interactive and responsive employee management dashboard built using **HTML**, **CSS**, and **JavaScript** — complete with add, edit, delete, filter, search, and sort functionalities.

---

## Setup & Run Instructions

### Prerequisites
No server setup or installation needed. Simply open the `index.html` file in any modern web browser.

>  If using **Freemarker** (optional extension), ensure you have:
- Java installed
- A compatible web server (like Apache Tomcat)
- Proper configuration for `.ftl` templates

### Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sachin-20-s/employee-directory.git
   cd employee-directory
# Project Structure
employee-directory/
│
├── css/
│   └── styles.css            # Global styling
│
├── js/
│   ├── main.js               # Core logic
│   ├── data.js               # Mock employee data
│   ├── id.js                 # UUID generator
│   └── deptRoles.js          # Department-role map
│
├── index.html                # Entry HTML file
├── README.md                 # Project info
└── assets/                   # Screenshots/images

# Screenshots
## Desktop View
### Landing page <img width="1912" height="969" alt="image" src="https://github.com/user-attachments/assets/8daf4174-ce0d-40c8-9824-d1a68d4109d7" />
### Search view <img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/f099f394-7f64-49fd-b9e6-8da66d4bf135" />
### Add Employee Form <img width="1914" height="973" alt="image" src="https://github.com/user-attachments/assets/1fe78a25-2aa5-4a4e-a9fa-743b1f400e26" />
### Employee Added <img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/b2c6d239-e998-481a-b91f-61247cc2f8ab" />
### Sort By email <img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/6b993ccf-1cc8-429d-b666-046012007eae" />
### Filter <img width="1918" height="969" alt="image" src="https://github.com/user-attachments/assets/9d8fb845-cc79-43bc-861f-f93551ec3bee" />
### Show <img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/35d160fa-4fbc-434a-bafd-7b4a51b8d1ef" />

## Mobile view
### Landing page <img width="455" height="802" alt="image" src="https://github.com/user-attachments/assets/ccf0c2ae-d2e7-432a-912b-758e6a01255f" />
### Search <img width="452" height="801" alt="image" src="https://github.com/user-attachments/assets/0d059cc0-f504-4007-92f8-9ac9180e832f" />
### Add Employee Form <img width="459" height="810" alt="image" src="https://github.com/user-attachments/assets/0dcf767f-5c01-40d6-b706-cc5deb7e0db1" />
### Employee Added <img width="459" height="803" alt="image" src="https://github.com/user-attachments/assets/d5164f27-a323-4fcf-a13d-351f3ae4f746" />
### Sort By FirstName <img width="458" height="806" alt="image" src="https://github.com/user-attachments/assets/6f548219-f252-4392-bc4a-1a87bd21f19c" />
### Filter <img width="461" height="807" alt="image" src="https://github.com/user-attachments/assets/00e29f40-6d2e-4ff1-8802-0d8a3cf532d1" />
### show <img width="460" height="809" alt="image" src="https://github.com/user-attachments/assets/5f7f7983-b4a4-4bc2-b91f-b4ff7754a043" />


# Reflection
## Challenges Faced
### Dynamic dropdown handling (department → role)
### Syncing search and filter on both desktop and mobile
### Preventing duplicate event binding in edit form
### Managing pagination alongside infinite scroll

## Improvements for Future
### Better error validation and user feedback
### Persistent storage (localStorage or backend integration)
### More accessible UI with keyboard support
### Enhanced animations for smoother UX






