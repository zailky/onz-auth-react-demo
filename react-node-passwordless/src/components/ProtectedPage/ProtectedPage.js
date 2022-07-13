import { useEffect, useState } from 'react';

async function loadServerToken(accessToken) {
    return fetch('http://localhost:8080/adminInfo', {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`
        }), 
    })
    .then(data => {
        if (data.status === 200) {
            return data.json();
        } else {
            return `Unauthorised - ${data.status}`;
        }
    });
}

export default function ProtectedPage({ user }) {
    const [ adminInfo, setAdminInfo ] = useState(null);

    useEffect(() => {
        if (user && !adminInfo) {
            loadServerToken(user.accessToken).then(result => {
                setAdminInfo(result);
            });
        }
    });

    return (
        <>
            <h2>Protected Page</h2>
            <h3>Verified User From ProtectedAPI</h3>
            <div>
                {JSON.stringify(adminInfo)}
            </div>
        </>
    );
}