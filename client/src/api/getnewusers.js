async function GetUserData() {

    const req = await fetch('https://berlioz-cup.onrender.com/api/dashboard', {
        headers: {
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

export { GetUserData }; 