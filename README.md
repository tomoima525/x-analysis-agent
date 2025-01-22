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
    value: "replace with your auth_token",
    domain: ".x.com",
    path: "/",
    expires: 1737996835.631708,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
```



### Running the tool

```bash
bun run index.ts
```

