async function GetParisData(id) {

    const req = await fetch('https://berlioz-cup.onrender.com/api/get-paris-data', {
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

  async function GetCotesData(id) {

    const req = await fetch('https://berlioz-cup.onrender.com/api/get-cotes-data', {
        headers: {  
            'id': id,
        },
    })
  
    const data = await req.json()
    if (data.status === 'ok') {
        return data.cotes;
      } else {
        throw new Error(data.error);
      }
  }


export { GetParisData, GetCotesData }