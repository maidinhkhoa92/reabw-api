const { WebhookClient } = require('dialogflow-fulfillment');
const jwt = require('jsonwebtoken');
const APP_CONFIG = require('../config/APP_CONFIG');

module.exports = (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function sendlink () {
    const token = jwt.sign(req.body.queryResult.parameters, APP_CONFIG.token);
    agent.add('Enseguida me pongo en ello...cuando recibas el link síguelo y aplica por los inmuebles que más te gusten.....')
    agent.add(`Your link is ${APP_CONFIG.site_url}/property?token=${token}`)
  }

  let intentMap = new Map()
  intentMap.set('Busca_inmueble', sendlink)
  agent.handleRequest(intentMap)
}