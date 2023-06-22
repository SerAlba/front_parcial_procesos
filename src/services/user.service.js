class User {
  static URLBASE = "http://localhost:8081";

  getListUsers() {
    const dataUser = localStorage.getItem('dataUser');
    const token = JSON.parse(dataUser).data.token;

    return new Promise((resolve, reject) => {
      fetch(`${User.URLBASE}/listUsers`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
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
  
  getUserById(_id) {
    const dataUser = localStorage.getItem('dataUser');
    const token = JSON.parse(dataUser).data.token;

    return new Promise((resolve, reject) => {
      fetch(`${User.URLBASE}/user/${_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
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

  editUser(_id, _data) {
    const dataUser = localStorage.getItem('dataUser');
    const token = JSON.parse(dataUser).data.token;

    return new Promise((resolve, reject) => {
      fetch(`${User.URLBASE}/updateUser/${_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
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
