// src/api/api.js

export async function parseCV(file) {
    const formData = new FormData();
    formData.append('file', file);

    console.log('FormData prepared with file:', file.name);

    console.log('Uploading CV to:', process.env.REACT_APP_LOCAL_BACKEND_URL);

    const response = await fetch(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/resumes/parse`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload CV');
    }

    return response.json();
}