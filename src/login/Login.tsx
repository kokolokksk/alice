// src/pages/Login.tsx
import React, { useState } from 'react';
import * as sshpk from 'sshpk';

const Login: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [dataToEncrypt, setDataToEncrypt] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setPublicKey(fileContent);
      };

      reader.readAsText(selectedFile);
    }
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataToEncrypt(event.target.value);
  };

  const handleEncrypt = async () => {
    if (publicKey) {
       // 获取后端返回的数据
       console.info('publicKey', publicKey)
       console.info('dataToEncrypt', dataToEncrypt)
       fetch('/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({publicKey, dataToEncrypt}),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <label>
        选择公钥文件:
        <input type="file" accept=".pem" onChange={handleFileChange} />
      </label>
      <br />
      <label>
        登录名:
        <input type="text" value={dataToEncrypt} onChange={handleDataChange} />
      </label>
      <br />
      <button onClick={handleEncrypt}>登录名</button>
      <br />
    </div>
  );
};

export default Login;
