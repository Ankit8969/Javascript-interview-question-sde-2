# Frontend Security related stuff

## 🔐 7 Web Security Concepts That Changed the Way I Code:
- 𝗫𝗦𝗦 – when user input becomes a weapon
- 𝗖𝗦𝗥𝗙– when logged-in users become attackers
- 𝗖𝗢𝗥𝗦– misconfigured headers = data leaks
- 𝗝𝗪𝗧 𝗶𝘀𝘀𝘂𝗲𝘀 – tokens in localStorage = easy target
- 𝗖𝗦𝗣 – your browser-level firewall
- 𝗖𝗹𝗶𝗰𝗸𝗷𝗮𝗰𝗸𝗶𝗻𝗴 – UI that tricks users silently
- 𝗦𝗲𝗰𝘂𝗿𝗲 𝗛𝗲𝗮𝗱𝗲𝗿𝘀 – one-time config, huge impact

### 𝗦𝗼𝗺𝗲 𝘀𝗰𝗲𝗻𝗮𝗿𝗶𝗼-𝗯𝗮𝘀𝗲𝗱 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀 𝗜 𝗳𝗮𝗰𝗲𝗱:
- A user pastes ```<​script>alert('XSS')<​/script>``` in a text field and it executes. What went wrong and how do you prevent it?
- Your app stores JWT tokens in localStorage. What are the risks involved?
- A form on your site is being submitted from another domain, how do you block it?
- After logout, users can still access previous pages via the browser back button, how do you prevent this?
- You allow users to upload images. What security checks should be in place on the frontend?
- You dynamically inject scripts using innerHTML. What could go wrong?
- Your app is embedded in an iframe on a third-party site. What vulnerabilities might arise?
- You’re using a public CDN for loading scripts. How do you ensure the script hasn’t been tampered with?
- A button triggers an action without user interaction when opened from an external link, what’s the issue?
- Your frontend sends a POST request on button click, but it’s being triggered by attackers silently, how do you prevent it?
