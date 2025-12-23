# All about Micro-frontend
- Micro-frontend is a microservice of frontend

### Advances
1. Scalability and Reusability
2. Reliability (If any specific feature goes down it will not affect the whole app)
3. Technology Flexibility
4. Have their own pipeline

### Dis-advantage
1. Excessive coupling 
  - Excessive coupling means that your individual microfrontends depend too much on each other, directly or indirectly — defeating the whole purpose of having separate, independently deployable frontends.
2. Increase in Cost
  - More Repos
  - More pipeline
  - More teams etc



### 🧠 What is Module Federation?
- With the help of MF we can use the microservice in frontend.
- There are multiple way to achieve this, "React + Wepack" or "React-Vite + vite/module-federation", we can use
- we can use iframe also to achieve micro frontend architecture.



### Ways to share the data b/w the APPS
1. We can share the data, as a props.
2. We can create a shared context, and that we will expose to the 2nd one and use it.
3. We can use Window Custom Event to share the updated b/w apps.


- We can use this CLI to install the packages for vite - mf
```
npm add @module-federation/vite --save
```


### Vite Configuration of APP-1 (Parent App)

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    federation({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        vite_provider_app2: {
          type: 'module',
          name: 'vite_provider_app2',
          entry: 'http://localhost:5173/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
})

```

- This is how we can import the Component
```
const Button = React.lazy(() => import('vite_provider_app2/button'));
```


### Vite config of APP-2

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vite_provider_app2',
      filename: 'remoteEntry.js',
      exposes: {
        './button': './src/button',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
})

```

