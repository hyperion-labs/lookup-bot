/* Variables ==================================================================== */
// custom
const {
  createTablePayments,
  createPayment,
  getTotalPaymentsForUid,
} = require('../models');

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

  router.post('/create-payment', async (req, res) => {
    const { paymentInfo } = req.body;
    try {
      await createPayment(paymentInfo);
      const successMessage = `Successfully added payment of ${paymentInfo.amount} for user ${paymentInfo.uid}`;
      console.log(successMessage);
      res.send({ successMessage });
    } catch (e) {
      console.log(`Error: ${e.message}`);
      res.status(400).send({
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
