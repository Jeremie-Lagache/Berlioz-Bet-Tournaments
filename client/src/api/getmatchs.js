async function getAllMatchs() {

    const req = await fetch('http://localhost:1337/api/get-all-matchs', {
        headers: {  
        },
    })
  
    const data = await req.json()
    if (data.status === 'ok') {
        return data.matchs;
      } else {
        throw new Error(data.error);
      }
  }

  async function getMatchData(id) {

    const req = await fetch('http://localhost:1337/api/get-match-data', {
        headers: {  
          'id' : id
        },
    })
  
    const data = await req.json()
    if (data.status === 'ok') {
        return data.match;
      } else {
        throw new Error(data.error);
      }
  }


export { getAllMatchs, getMatchData }