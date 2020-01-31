let Promise = require('bluebird');
let LoopBackContext = require('loopback-context');
let utilities = require('../../utilities/utils');
let moment = require('moment-timezone');

let sampleCustomers = [
  {
    accountNo: '001',
    cardNo: '0600133457416839',
    accountName: 'Jane Masembe',
    phoneNo: '0753453234',
    pin: '1234'
  },
  {
    accountNo: '002',
    accountName: 'John Serwamukoko',
    phoneNo: '0703773224',
    pin: '1234'
  }, {
    accountNo: '003',
    accountName: 'Billy Kiwanuka',
    phoneNo: '0717463264',
    pin: '1234'
  },
  {
    accountNo: '004',
    accountName: 'Lydia Musoke',
    phoneNo: '0778454221',
    pin: '1234'
  }
];

let sampleTransactions = [
  {
    time: '2020-01-30 13:14:05',
    productName: 'Deposit',
    amount: 1500
  },
  {
    time: '2020-01-25 14:04:05',
    productName: 'Deposit',
    amount: 1500
  },
  {
    time: '2020-01-27 15:04:05',
    productName: 'Deposit',
    amount: 1200
  },
  {
    time: '2020-01-28 11:02:05',
    productName: 'Withdraw',
    amount: 500
  },
  {
    time: '2020-01-30 17:04:00',
    productName: 'Withdraw',
    amount: 600
  }
];
module.exports = function (app) {
  let router = app.loopback.Router();
  router.get('/api/terminalUpdate/:terminalId', function (req, res) {
    res.status(200).send('');
  });

  router.post('/api/terminalAction', function (req, res) {
    if (!req.body.tmsId) {
      res.status(400).error('Invalid Request!');
      return;
    }
    let rtnState = '';
    let cardNo, customer, amount, accountNo, accountName, staffCard, remark;

    let printString = '';
    switch (req.body.act) {
      case 90134: // deposit initiation ::

        /*
        sample request ::
        {
          "ver": "0.1.7.k", // terminal firmware version
          "tid": "010006d4c5", // terminal id
          "act": 90134, // action id
          "mnu": "0",
          "rid": "-1",
          "seq": "245264", // terminal internal sequence number
          "rnd": "53de",
          "tm": "20200131204314", // timestamp YYYYMMDDHHmmss
          "p1": "0600133457416839", // Customer Card Number
          "m1": "Main",
          "lg": "EN",
          "w": "UN-P",
          "f": "DXXXXXXX",
          "b": "0",
          "tmsId": "collectionsug0015"
        }

        sample response:
        {D`[R`12345`][A`90137|EN|C0|DEPOSIT|TXN|<ACCT=001><CNME=Jane Masembe>(`S:mqv1|MZ|a1Ui\"47\"o\"48\"I\"v1,v2\"O\"v1,v2\"|L,101,20,20,0,40,-1,-1,24,0,Amount,0,1\\L,102,20,120,0,40,-1,-1,24,0,Remark,0,1\\I,1,20,70,280,40,-1,-1,24,0,M,0,1\\I,2,20,170,280,40,-1,-1,24,0,S,255,1|||Deposit - 001|Acc Name: Jane Masembe`)(`S:staff|KY|UT49||Receive &v1;||Please touch card|`)`]`}{B`A`}@@@
         */


        cardNo = req.body.p1;
        // return the customer account details and prompt to continue ::
        customer = sampleCustomers.find(x => x.cardNo && x.cardNo === cardNo);
        if (!customer) {
          rtnState = utilities.formatResponse('3', 'Customer Not Found!');
        } else {
          rtnState = '{D`[R`12345`][A`90137|EN|C0|DEPOSIT|TXN|<ACCT=' + customer.accountNo + '><CNME=' + customer.accountName + '>(`S:mqv1|MZ|a1Ui"47"o"48"I"v1,v2"O"v1,v2"|L,101,20,20,0,40,-1,-1,24,0,Amount,0,1\\L,102,20,120,0,40,-1,-1,24,0,Remark,0,1\\I,1,20,70,280,40,-1,-1,24,0,M,0,1\\I,2,20,170,280,40,-1,-1,24,0,S,255,1|||Deposit - ' + customer.accountNo + '|Acc Name: ' + customer.accountName + '`)(`S:staff|KY|UT49||Receive &v1;||Please touch card|`)`]`}{B`A`}@@@'; // return the customer detail confirmation step and other mz stuff
        }
        break;
      case 90135: // withdraw ::
        cardNo = req.body.p1;
        // return the customer account details and prompt to continue ::
        customer = sampleCustomers.find(x => x.cardNo && x.cardNo === cardNo);
        if (!customer) {
          rtnState = utilities.formatResponse('3', 'Customer Not Found!');
        } else {
          rtnState = '{D`[R`12345`][A`90138|EN|C0|WITHDRAW|TXN|<ACCT=' + customer.accountNo + '><CNME=' + customer.accountName + '>(`S:mqv1|MZ|a1Ui"47"o"48"I"v1,v2"O"v1,v2"|L,101,20,20,0,40,-1,-1,24,0,Amount,0,1\\L,102,20,120,0,40,-1,-1,24,0,Remark,0,1\\I,1,20,70,280,40,-1,-1,24,0,M,0,1\\I,2,20,170,280,40,-1,-1,24,0,S,255,1|||Withdraw - ' + customer.accountNo + '|Acc Name: ' + customer.accountName + '`)(`S:pin|LT|U|Withdraw|Enter||Customer PIN|`)(`S:staff|KY|UT49||Amount &v1;||Please touch Staff card|`)`]`}{B`A`}@@@'; // return the customer detail confirmation step and other mz stuff
        }
        break;
      case 90136: // statement ::
        cardNo = req.body.p1;
        // return the customer account details and prompt to continue ::
        customer = sampleCustomers.find(x => x.cardNo && x.cardNo === cardNo);
        if (!customer) {
          rtnState = utilities.formatResponse('3', 'Customer Not Found!');
        } else {
          printString = '';
          printString += '{fw2}   STATEMENT\n\n';
          printString += '{f1}      NerpServ Solutions\n';
          printString += '       Plot 39 Kira Road\n';
          printString += '        Kampala, Uganda\n\n';
          printString += 'Date:' + (new moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss')).padStart(27, ' ') + '\n';
          printString += 'TID:' + req.body.tid.toUpperCase().padStart(28, ' ') + '\n';
          printString += 'Staff: Tst Staff' + '\n';

          printString += `Account Name: ${customer.accountName}\n`;
          printString += 'DateTime\n' + 'Description    ' + '          Amount\n';
          printString += ('').padStart(32, '=') + '\n';

          let total = 0;
          printString += sampleTransactions.map(x => {
            total += x.amount;
            return `${x.time} \n${x.productName.padEnd(16, ' ')}${x.amount.toString().padStart(16, ' ')}`
          }).join('\n');


          printString += '{fh2}Total:' + total.toString().padStart(26, ' ') + '\n';
          printString += '{f1}' + ('').padStart(32, '=') + '\n';

          rtnState = utilities.formatResponse('4', 'Printing Statement', '', '', '', printString);
        }
        break;
      case 90137: // dynamic response for deposit - confirm customer detail ::

        /*

        sample request ::
        {
          "ver": "0.1.7.k", // terminal firmware version
          "tid": "010006d4c5", // terminal id
          "act": 90137, // action id
          "mnu": "0",
          "rid": "12345",
          "seq": "245265", // terminal internal sequence number
          "rnd": "a1b5",
          "p1": "100\n",
          "p2": {
            "v": "0.1.7.k",
            "t": "010006d4c5",
            "p48": "001", // customer account Number
            "p49": "Jane Masembe", // customer name
            "p50": "100", // amount
            "p51": "", // remark
            "cardno": "0600133457416839", // staff card number
            "cardtype": "mm4",
            "cardcnt": "19",
            "act": "90137",
            "txndate": "2020-01-31 20:43:13",
            "sid": "0",
            "hash": "2",
            "tid": "010006d4c5",
            "ver": "0.1.7.k"
          },
          "m1": "Main",
          "lg": "EN",
          "w": "UN-P",
          "f": "ULXXXXXX",
          "b": "0",
          "tmsId": "collectionsug0015"
        }

        sample response (includes printout)

        {B`A`}{L`[1`Transaction Successful`][2`Jane Masembe`][3`Savings Deposit`][4`Amount: 100`]`}{P`[T`{fw2}    DEPOSIT\n\n{f1}      NerpServ Solutions\n       Plot 39 Kira Road\n        Kampala, Uganda\n\nDate:        2020-01-31 15:43:23\nTID:                  010006D4C5\nStaff: Tst Staff\n{f1}    {ll1}Transaction Description{ll0}\n{f1}     Savings Deposit\n{f1}Transaction ID:            12345\nAccount Name: Jane Masembe\nAccount #: 001\nProduct Description: Deposit\nProduct Code: SACCO001\nTransaction fee:               0\n{fh2}Amount:                      100\n{f1}             Powered by Tracksol`]`}

         */
        amount = Number(req.body.p2.p50);
        accountNo = req.body.p2.p48;
        accountName = req.body.p2.p49;
        staffCard = req.body.p2.cardno;
        remark = req.body.p2.p51;

        printString = '';
        printString += '{fw2}    DEPOSIT\n\n';
        printString += '{f1}      NerpServ Solutions\n';
        printString += '       Plot 39 Kira Road\n';
        printString += '        Kampala, Uganda\n\n';
        printString += 'Date:' + (new moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss')).padStart(27, ' ') + '\n';
        printString += 'TID:' + req.body.tid.toUpperCase().padStart(28, ' ') + '\n';
        printString += 'Staff: Tst Staff' + '\n';

        printString += '{f1}    {ll1}Transaction Description{ll0}\n';
        printString += `{f1}     Savings Deposit\n`;

        printString += '{f1}Transaction ID:' + (12345).toString().padStart(17, ' ') + '\n';
        printString += 'Account Name: ' + accountName + '\n';
        printString += 'Account #: ' + accountNo + '\n';
        printString += 'Product Description: Deposit' + '\n';
        printString += 'Product Code: SACCO001' + '\n';
        printString += 'Transaction fee:' + ('0').padStart(16, ' ') + '\n';
        printString += '{fh2}Amount:' + (amount).toString().padStart(25, ' ') + '\n';
        printString += '{f1}             Powered by Tracksol\n';

        rtnState = utilities.formatResponse('3', 'Transaction Successful', accountName, 'Savings Deposit', 'Amount: ' + (amount), printString);

        break;
      case 90138: // dynamic response for withdraw - confirm customer detail ::
        amount = Number(req.body.p3.p50);
        accountNo = req.body.p3.p48;
        accountName = req.body.p3.p49;
        staffCard = req.body.p3.cardno;
        remark = req.body.p3.p51;

        // check PIN ::
        customer = sampleCustomers.find(x => x.accountNo && x.accountNo === accountNo);
        if (!(req.body.p2 && req.body.p2 === customer.pin)) {
          rtnState = utilities.formatResponse('3', 'Invalid PIN!');
        } else {
          printString = '';
          printString += '{fw2}    WITHDRAW\n\n';
          printString += '{f1}      NerpServ Solutions\n';
          printString += '       Plot 39 Kira Road\n';
          printString += '        Kampala, Uganda\n\n';
          printString += 'Date:' + (new moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss')).padStart(27, ' ') + '\n';
          printString += 'TID:' + req.body.tid.toUpperCase().padStart(28, ' ') + '\n';
          printString += 'Staff: Tst Staff' + '\n';

          printString += '{f1}    {ll1}Transaction Description{ll0}\n';
          printString += `{f1}     Savings Withdaw\n`;

          printString += '{f1}Transaction ID:' + (12345).toString().padStart(17, ' ') + '\n';
          printString += 'Account Name: ' + accountName + '\n';
          printString += 'Account #: ' + accountNo + '\n';
          printString += 'Product Description: Withdraw' + '\n';
          printString += 'Product Code: SACCO002' + '\n';
          printString += 'Transaction fee:' + ('0').padStart(16, ' ') + '\n';
          printString += '{fh2}Amount:' + (amount).toString().padStart(25, ' ') + '\n';
          printString += '{f1}             Powered by Tracksol\n';

          rtnState = utilities.formatResponse('3', 'Transaction Successful', accountName, 'Savings Withdraw', 'Amount: ' + (amount), printString);

        }

        break;
      default:
        rtnState = 'Invalid action ID!';
        break;
    }
    res.status(200).send(rtnState);
  });
  app.use(router);
};
