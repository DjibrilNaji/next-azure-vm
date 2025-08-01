# AZURE VM NEXT PROJECT

## Description

This project aims to enable the creation of disposable virtual machines on the Azure portal via a web application.  
When a user creates a VM, they receive RDP or SSH connection details.

There are multiple users with different roles, allowing them to launch various virtual machines.

## Project Setup

Start by creating and populating the `.env` file with the required Azure configuration:

```bash
## Config Azure
JWT_SECRET=''
AZURE_CLIENT_ID=''
AZURE_TENANT_ID=''
AZURE_CLIENT_SECRET=''
AZURE_SUBSCRIPTION_ID=''
```

### To do this, you need to go to the Azure portal and log in

To retrieve the value <span style="color: #FF0000">AZURE_SUBSCRIPTION_ID</span>:

1. In the search bar, type **"Subscriptions"** and select this option.
2. Choose the subscription you want to use.
3. Copy the Subscription ID.

> Subscription ID --> **AZURE_SUBSCRIPTION_ID**

---

To retrieve the following values <span style="color: #FF0000">AZURE_CLIENT_ID // AZURE_CLIENT_SECRET // AZURE_TENANT_ID</span>:

1. In the Azure portal search bar, type **"App registrations"**.
2. Select **"New registration"**.
3. Configure your application and click **"Register"**.
4. Once inside your app registration, go to **"Certificates & secrets"**, then click **"New client secret"**.
5. Make sure to copy the secret at the moment of creation.

> Secret --> **AZURE_CLIENT_SECRET**

6. Then, go to the **"Overview"** page of your app registration and copy the following:

> Application (client) ID --> **AZURE_CLIENT_ID**

> Directory (tenant) ID --> **AZURE_TENANT_ID**

---

### To run the project **manually**:

```bash
npm install
```

```bash
npm run dev
```

Your server will be running at:

> http://localhost:3000

## Login

The 3 pre-created user accounts are:

- **User who can choose their VM**:  
  - _Login_: **Admin**  
  - _Password_: **admin**

- **User who can launch a pre-selected VM**:  
  - _Login_: **Editor**  
  - _Password_: **editor**

- **User with no credit**:  
  - _Login_: **Viewer**  
  - _Password_: **viewer**

## Connecting to the VMs

This project supports two types of machines: Windows machines and Unix machines.

### For Windows machines:

To connect to a Windows machine, you will need to use RDP (Remote Desktop Protocol). You have two options:

> 1. **Install the "Microsoft Remote Desktop" app available on the Apple Store.**

Use the URL provided to fill in the "PC Name" field in the app. When connecting, you will be asked for a username and password. Make sure to enter those as well.

Don’t forget to select "Ask when required" at the start.

> 2. **Use FreeRDP, an open-source client.**

### For Unix machines:

A command will be displayed on screen. Simply copy and paste it into your terminal. A password will be requested; make sure to copy it as well.

##### Note: If you get a "Permission denied" error when trying to connect, just wait a few seconds and try again.

## Technology Stack

Here are the main components of our stack:

### Framework & Language

- **Next.js with TypeScript:** Next.js is used as the front-end framework. TypeScript is integrated for better code maintainability and robustness.

### Styling

- **Tailwind CSS:** Tailwind CSS is used as the CSS framework to simplify styling and customization.

### Icon Management

- **React Icons:** Used for easy integration of icons in the app.

### Authentication

- **jsonwebtoken:** Used to manage JWT tokens, securing communication and handling user authentication securely.

### Cloud Integration

- **Azure SDK:** Used for interacting with Azure services.

## Source Code Structure

The source code is carefully organized to promote readability, maintainability, and reusability. Here is the main folder structure:

### Main Folders

- **`app`:** Contains the routes of the project.

- **`components`:** Reusable components are grouped here. Each component is designed to be standalone and reusable, easing development and maintenance.

- **`datas`:** Contains static data used in the app (Users, VMs, etc.).

- **`hooks`:** Custom React hooks used in the app.

- **`models`:** Data models defining the structure of data handled by the app.

- **`services`:** Services interacting with external APIs or other services (auth functions, API clients, storage services, etc.).

- **`utils`:** Utility functions (string manipulation, date formatting, general helpers).

## VM Management

The VM management logic is based on a sample file taken from GitHub: [Sample Azure](https://github.com/Azure-Samples/js-e2e/blob/main/resources/virtual-machines/create-vm.js), a Microsoft Azure sample.

VM creation starts when the user clicks the **`Start`** button on the page.

Six steps are executed before the VM is fully created:

- Resource group creation  
- Storage account creation  
- VNet (virtual network) creation  
- Public IP creation  
- Network interface creation  
- Virtual machine creation  

If an error occurs, the resources are automatically cleaned up after the error is caught.

If no error is detected, the VM, resource group, and related resources are automatically deleted after 10 minutes of uptime.

> Notes:

> - VM creation takes a few minutes (2-3 min)

> - Deletion happens 10 minutes after creation but is not instantaneous; expect 2-3 minutes for full cleanup.

> - If you have reached the maximum number of VMs your account supports, creating a new one will not be possible.

# Démo :

https://drive.google.com/file/d/1TqX67_SjjghACYoStp-NaqMEZoexY0xK/view?usp=sharing
