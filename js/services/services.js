const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json(); //Это промис
};

const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`error ${url}${result.status}` );
    }

    return await result.json(); //Это промис
};

export {postData, getResource};