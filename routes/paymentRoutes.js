/* Variables ==================================================================== */
// custom
const {
  createTablePayments,
  createPayment,
  getTotalPaymentsForUid,
} = require('../models');

const { stripe } = require('../services');
const { requireLogin } = require('../middleware');

/* Export Routes ==================================================================== */
// coming from /api/v1/payments
module.exports = (router) => {
  router.get('/create-table-payments', async (req, res) => {
    try {
      await createTablePayments();
      const successMessage = 'Successfully added payments table';
      console.log(successMessage);
      res.send({ successMessage });
    } catch (e) {
      console.log(`Error: ${e.message}`);
      res.status(400).send({
        message: `Error: ${e.message}`,
      });
    }
  });

  router.post('/create-payment', requireLogin, async (req, res) => {
    const { uid, amount, token } = req.body.paymentInfo;

    try {
      const chargeObj = await stripe.charges.create({
        amount,
        currency: 'usd',
        description: `${amount / 100} by user ${uid}`,
        source: token.id,
      });

      await createPayment({ uid, amount, chargeObj });
      const successMessage = `Successfully added payment of ${amount} for user ${uid}`;
      return res.send({ successMessage });
    } catch (e) {
      console.log(`Error: ${e.message}`); 
      return res.status(400).send({
        message: `Error: ${e.message}`,
      });
    }
  });

  router.get('/get-payments-by-user/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const userPaymentInfo = await getTotalPaymentsForUid(uid);
      console.log(userPaymentInfo);
      res.send(userPaymentInfo);
    } catch (e) {
      res.send(e.message);
    }
  });
};
