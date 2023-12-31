async function GetParisData(id) {

    const req = await fetch('http://localhost:1337/api/get-paris-data', {
        headers: {  
            'id': id,
        },
    })
  
    const data = await req.json()
    if (data.status === 'ok') {
        return data.paris;
      } else {
        throw new Error(data.error);
      }
  }

export { GetParisData }