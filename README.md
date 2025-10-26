# 🧪 API Automation Testing — Reqres.in  

**Author:** **Fritzie Primananda Adi Praja**  

---

## 📘 Project Description  
This repository contains automated API test scripts written in **JavaScript** using the **Playwright Test** framework.  

The tests cover **positive** and **negative** scenarios for the public API endpoint:  
[https://reqres.in/api/users?page=2](https://reqres.in/api/users?page=2)

---

## 🧩 Test Coverage  

### **(+) Positive Scenarios**
- Valid page parameter responses (**page=1**, **page=2**)  
- Default behavior when the query parameter is omitted  
- Response structure and field validation  
- Header content validation  
- Response time verification  

### **(-) Negative Scenarios**
- Unauthorized or invalid page access  
- Unsupported HTTP methods  
- Malformed query parameters  
- Invalid or missing input values  

---

## ⚙️ How to Run the Tests  

### 1️ **Clone this repository**
```bash
git clone https://github.com/Fritzie1860/qa-submission_api-test.git
cd qa-submission_api-test
```

### 2️ **Install dependencies**
```bash
npm install
```

### 3️ **Run the tests**
Run all tests using Playwright’s built-in test runner:
```bash
npx playwright test
```

### 4️ **View the HTML report**
After execution:
```bash
npx playwright show-report
```

If no report is generated:
```bash
npx playwright test --reporter=list,html
```

---

## 🧠 Notes  
- Tests are implemented using **Playwright’s APIRequestContext** feature.  
- No authentication token is required and the endpoint is **public** and simulates various mock API responses.  
- Some endpoints (e.g., page=12 or malformed queries) may return **401 Unauthorized**, which is part of the expected mocked behavior.  

---

## 📁 Project Structure  
```
qa-submission_api-test/
├── tests/
│   ├── positive_api_test.spec.js
│   └── negative_api_test.spec.js
