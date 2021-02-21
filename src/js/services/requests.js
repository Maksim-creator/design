const postData = async (url, data) => {
    let response = await fetch(url, {method: 'POST', body: data});

    return await response.text()
}

const getData = async (url) => {
    let response = await fetch(url);

    if(!response.ok){
        throw new Error(error, 'errror');
    }

    return await response.json()
}

export {getData, postData};