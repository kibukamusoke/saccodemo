# saccodemo


initialize deposit action: 
```json5
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
```

response includes customer name and account # included 
```
{D`[R`12345`][A`90137|EN|C0|DEPOSIT|TXN|<ACCT=001><CNME=Jane Masembe>(`S:mqv1|MZ|a1Ui\"47\"o\"48\"I\"v1,v2\"O\"v1,v2\"|L,101,20,20,0,40,-1,-1,24,0,Amount,0,1\\L,102,20,120,0,40,-1,-1,24,0,Remark,0,1\\I,1,20,70,280,40,-1,-1,24,0,M,0,1\\I,2,20,170,280,40,-1,-1,24,0,S,255,1|||Deposit - 001|Acc Name: Jane Masembe`)(`S:staff|KY|UT49||Receive &v1;||Please touch card|`)`]`}{B`A`}@@@
```

deposit completion (step 2) -input amount and remarks:

```json5
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
```

sample response (includes printout)
```
{B`A`}{L`[1`Transaction Successful`][2`Jane Masembe`][3`Savings Deposit`][4`Amount: 100`]`}{P`[T`{fw2}    DEPOSIT\n\n{f1}      NerpServ Solutions\n       Plot 39 Kira Road\n        Kampala, Uganda\n\nDate:        2020-01-31 15:43:23\nTID:                  010006D4C5\nStaff: Tst Staff\n{f1}    {ll1}Transaction Description{ll0}\n{f1}     Savings Deposit\n{f1}Transaction ID:            12345\nAccount Name: Jane Masembe\nAccount #: 001\nProduct Description: Deposit\nProduct Code: SACCO001\nTransaction fee:               0\n{fh2}Amount:                      100\n{f1}             Powered by Tracksol`]`}
```
      
initialize withdrawal action
```json5
{
  "ver": "0.1.7.k",
  "tid": "010006d4c5",
  "act": 90135,
  "mnu": "0",
  "rid": "-1",
  "seq": "245266",
  "rnd": "432b",
  "tm": "20200131204327",
  "p1": "0600133457416839",
  "m1": "Main",
  "lg": "EN",
  "w": "UN-P",
  "f": "DXXXXXXX",
  "b": "0",
  "tmsId": "collectionsug0015"
}
```

sample response (includes customr name and account number + customer pin prompt)

```
{D`[R`12345`][A`90138|EN|C0|WITHDRAW|TXN|<ACCT=' + customer.accountNo + '><CNME=' + customer.accountName + '>(`S:mqv1|MZ|a1Ui"47"o"48"I"v1,v2"O"v1,v2"|L,101,20,20,0,40,-1,-1,24,0,Amount,0,1\\L,102,20,120,0,40,-1,-1,24,0,Remark,0,1\\I,1,20,70,280,40,-1,-1,24,0,M,0,1\\I,2,20,170,280,40,-1,-1,24,0,S,255,1|||Withdraw - ' + customer.accountNo + '|Acc Name: ' + customer.accountName + '`)(`S:pin|LT|U|Withdraw|Enter||Customer PIN|`)(`S:staff|KY|UT49||Amount &v1;||Please touch Staff card|`)`]`}{B`A`}@@@       
```

withdrawal completion:

```json5
{
  "ver": "0.1.7.k",
  "tid": "010006d4c5",
  "act": 90138,
  "mnu": "0",
  "rid": "12345",
  "seq": "245267",
  "rnd": "e44a",
  "p1": "200\n",
  "p2": "1234",
  "p3": {
    "v": "0.1.7.k",
    "t": "010006d4c5",
    "p48": "001",
    "p49": "Jane Masembe",
    "p50": "200",
    "p51": "",
    "cardno": "0600133457416839",
    "cardtype": "mm4",
    "cardcnt": "20",
    "act": "90138",
    "txndate": "2020-01-31 20:43:26",
    "sid": "0",
    "hash": "2",
    "tid": "010006d4c5",
    "ver": "0.1.7.k"
  },
  "m1": "Main",
  "lg": "EN",
  "w": "UN-P",
  "f": "USLXXXXX",
  "b": "0",
  "tmsId": "collectionsug0015"
}
```

response: 
```
{B`A`}{L`[1`Transaction Successful`][2`Jane Masembe`][3`Savings Withdraw`][4`Amount: 200`]`}{P`[T`{fw2}    WITHDRAW\n\n{f1}      NerpServ Solutions\n       Plot 39 Kira Road\n        Kampala, Uganda\n\nDate:        2020-01-31 15:43:37\nTID:                  010006D4C5\nStaff: Tst Staff\n{f1}    {ll1}Transaction Description{ll0}\n{f1}     Savings Withdaw\n{f1}Transaction ID:            12345\nAccount Name: Jane Masembe\nAccount #: 001\nProduct Description: Withdraw\nProduct Code: SACCO002\nTransaction fee:               0\n{fh2}Amount:                      200\n{f1}             Powered by Tracksol`]`}
```

statement request

```json5
{
  "ver": "0.1.7.k",
  "tid": "010006d4c5",
  "act": 90136,
  "mnu": "0",
  "rid": "-1",
  "seq": "245268",
  "rnd": "78fe",
  "tm": "20200131204341",
  "p1": "0600133457416839",
  "m1": "Main",
  "lg": "EN",
  "w": "UN-P",
  "f": "DXXXXXXX",
  "b": "0",
  "tmsId": "collectionsug0015"
}
             
```

statement printout response: 
```
response": "{B`E`}{L`[1`Printing Statement`]`}{P`[T`{fw2}   STATEMENT\n\n{f1}      NerpServ Solutions\n       Plot 39 Kira Road\n        Kampala, Uganda\n\nDate:        2020-01-31 15:43:43\nTID:                  010006D4C5\nStaff: Tst Staff\nAccount Name: Jane Masembe\nDateTime\nDescription              Amount\n================================\n2020-01-30 13:14:05 \nDeposit                     1500\n2020-01-25 14:04:05 \nDeposit                     1500\n2020-01-27 15:04:05 \nDeposit                     1200\n2020-01-28 11:02:05 \nWithdraw                     500\n2020-01-30 17:04:00 \nWithdraw                     600{fh2}Total:                      5300\n{f1}================================`]`}
```
