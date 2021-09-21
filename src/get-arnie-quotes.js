const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
    const proms = urls.map(url => httpGet(url))
    const responses = await Promise.all(proms)
    const res = []
    responses.forEach(httpResp => {
        const key = httpResp.status === 200 ? 'Arnie Quote' : 'FAILURE'
        const body = JSON.parse(httpResp.body)
        res.push({
            [key] : body.message
        })
    })
    return res
};

module.exports = {
  getArnieQuotes,
};
