// pages/protected.tsx
import { useState } from 'react';

const ProtectedPage = () => {
    const [inputPassword, setInputPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedPassword = process.env.NEXT_PUBLIC_PAGE_PASSWORD;

        if (inputPassword === storedPassword) {
            setIsAuthorized(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (isAuthorized) {
        return (
            <div>
                <h1>Protected Content</h1>
                <p>This content is only visible to authorized users.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Password Protected Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={inputPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProtectedPage;
