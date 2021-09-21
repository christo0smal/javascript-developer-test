'use strict';

const urlPrefix = `http://www.smokeballdev.com`;

const urlToResponseLookup = {
  [`${urlPrefix}/arnie0`]: 'Get to the chopper',
  [`${urlPrefix}/arnie1`]: 'MY NAME IS NOT QUAID',
  [`${urlPrefix}/arnie2`]: `What's wrong with Wolfie?`,
  [`${urlPrefix}/arnie4`]: "",
  [`${urlPrefix}/arnie5`]: null,
  [`${urlPrefix}/arnie6`]: undefined,
};

const httpRequestMockP = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const responseData = urlToResponseLookup[url];
    // Note: Due to dictionary lookup null and unresolved will return error. For now let's assume that valid quotes will always be strings
    // Bug fix: Empty string should not be error
    if (responseData || responseData === '') {
      resolve(responseData);
    } else {
      reject(new Error('Your request has been terminated'));
    }
  }, 200);
});

const httpGet = async (url) => {
  try {
    const message = await httpRequestMockP(url);
    return { status: 200, body: JSON.stringify({ message }) };
  } 
  catch (err) {
    return { status: 500, body: JSON.stringify({ message: err.message }) };
  }
};

module.exports = {
  httpGet,
};
