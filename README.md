# x-research

A tool to verify your hypothesis about what people think from analyzing X(Twitter) posts.


## Preparation

- Install dependencies (using `bun`, but other package managers should work too):

```bash
bun install
```

- Copy `auth.ts.sample` file to `auth.ts` and fill in the required values. This is required to access X(Twitter) API.

```
  {
    name: "auth_token",
    value: "replace with your auth_token", // Update this token on your own!!!
    domain: ".x.com",
    path: "/",
    expires: 1737996835.631708, // Change this to the future timestamp!!!
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
```

- You can retrieve `auth_token` using Chome Dev Tool(inside `cookies` section)
<img width="747" alt="Screenshot 2025-01-21 at 4 03 36 PM" src="https://github.com/user-attachments/assets/e6cd97db-3480-4a80-afd8-ea029d9984df" />



### Running the tool

```bash
bun run index.ts
```

