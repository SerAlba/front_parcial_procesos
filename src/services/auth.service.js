class Auth {
    static URLBASE = "http://localhost:8081";
    register(data) {
        return new Promise((resolve, reject) => {
          fetch(`${Auth.URLBASE}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              const statusCode = response.status;
              return response.json()
                .then(data => {
                  resolve({ statusCode, data });
                })
                .catch(error => {
                  reject(error);
                });
            });
        });
      }

    login (_data) {
        return new Promise((resolve, reject) => {
            fetch(`${Auth.URLBASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_data)
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json()
                        .then(data => {
                            resolve({ statusCode, data });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    
}
