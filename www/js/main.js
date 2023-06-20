import { jsx as _jsx } from "https://jspm.dev/react/jsx-runtime";
import { createRoot } from 'https://jspm.dev/react-dom/client';
function App() {
    return _jsx("h1", { children: "App" });
}
// hydrateRoot(document.getElementById('root'), _jsx(App, {}));

const root = createRoot(document.getElementById('root'));
root.render(_jsx(App, {}));