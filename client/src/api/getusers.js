async function GetUserData() {

    const req = await fetch('http://localhost:1337/api/dashboard', {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-refresh-token': localStorage.getItem('refresh-token'),

        },
    })

    const data = await req.json()
    if (data.status === 'ok') {
        return data.user;
      } else {
        throw new Error(data.error);
      }
}

async function getAllUsers() {

  const req = await fetch('http://localhost:1337/api/get-all-users', {
      headers: {
          'x-access-token': localStorage.getItem('token'),
          'x-refresh-token': localStorage.getItem('refresh-token'),

      },
  })

  const data = await req.json()
  if (data.status === 'ok') {
      return data.users;
    } else {
      throw new Error(data.error);
    }
}

async function getAllUsersTokens() {

  const req = await fetch('http://localhost:1337/api/get-all-users-tokens', {
      headers: {
      },
  })

  const data = await req.json()
  if (data.status === 'ok') {
      return data.users_data;
    } else {
      throw new Error(data.error);
    }
}



export { GetUserData, getAllUsers, getAllUsersTokens };