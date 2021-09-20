const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
    const proms = urls.map(url => httpGet(url))
    const responses = await Promise.allSettled(proms)
    const res = responses.map(httpResp => {
        const key = httpResp.status === 'fulfilled' && httpResp.value.status === 200 ? 'Arnie Quote' : 'FAILURE'
        const body = JSON.parse(httpResp.value.body)
        return {
            [key] : body.message
        }
    })
    return res
};

module.exports = {
  getArnieQuotes,
};
