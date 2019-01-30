var express = require('express');
var router = express.Router();
let result = [];  
let Totalbalance = [];
let Alllines = [];
let totalbet = 0;
let totalwin = 0;
let winsNumber = 0;
let tableData = []  // hold all info 
let win_prec = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NetEnt' ,win_prec:win_prec,totalbet:totalbet,totalwin:totalwin, result: result , Totalbalance: Totalbalance, Alllines: Alllines,tableData:tableData});
});

// Get current balance every game played and update tableData
router.post('/api/balance', function (req, res) {
	
   var balanceval = req.body.balancevalue;
   Totalbalance.push(balanceval)
   tableData.push(Totalbalance)

   res.render('index', { Totalbalance: Totalbalance })
});

// get points win every game playes and make statistics on it
router.post('/api/winpoints', function (req, res) {
   var countValue = req.body.countValue;  //win points
   var roundStatus = req.body.roundStatus;    // free or normal round
   totalwin += countValue;  //updte sum of points win
   winsNumber++;            // number of game played you win
   win_prec = ((winsNumber/totalbet)*100).toFixed(0) || 0;  // win precentage 
   result.push({"countValue":countValue,"roundStatus":roundStatus})
   tableData.push(result)

   res.render('index', { result: result })
});

router.post('/api/winlines', function (req, res) {
   var allwinlines = req.body.winlines;
   totalbet++;      // calculated number of bets 
   var winninglines = '';  
   // simple draw representation every winning round

   allwinlines.forEach(line => {
   	switch (line.SYMBOLS.join()) {
  case "4,4,4":
    winninglines += "〚🍒 🍒 🍒〛 ";      // win 1000 points
    break;
  case "3,3,3":
      winninglines += "〚7️⃣ 7️⃣ 7️⃣〛 ";    // win 150 points
    break;
  case "3,4":
        winninglines += "〚7️⃣ 🍒〛 ";      // win 75 points  
    break;
  case "0,0,0":
        winninglines += "〚3X📊 3X📊 3X📊〛 ";  // win 50 points 
    break;
  case "2,2,2":
          winninglines += "〚2X📊 2X📊 2X📊〛 ";  // win 20 points 
    break;
  case "1,1,1":
            winninglines += "〚1X📊 1X📊 1X📊〛 ";    // win 10 points 
    break;
  case "0,1,2":
      winninglines += "〚3X📊 1X📊 2X📊〛 ";    // win 5 points 
} })
   Alllines.push(winninglines);
   tableData.push(Alllines)
   res.render('index', { Alllines: Alllines })
});

// get Lose game lines 
router.post('/api/loselines', function (req, res) {
   var lineslose = req.body.lines;
   var roundStatus = req.body.roundStatus;
   
   totalbet++; // calculated number of bets
   // simple draw representation every losing round
   lineslose.forEach(line=>{
            line.unshift('〚')
             line.push('〛')
     line.forEach(subline=>{
    line[line.indexOf(4)] = "🍒 ";
    line[line.indexOf(3)] = "7️⃣ ";
    line[line.indexOf(2)] = "2X📊 ";
    line[line.indexOf(1)] = "1X📊 ";
    line[line.indexOf(0)] = "3X📊 ";

     })
   });

   Alllines.push(lineslose)
   Totalbalance.push(Totalbalance.slice(-1)[0]||0)    // push last balance in array as no win points
   result.push({"countValue":0,"roundStatus":roundStatus})  // 0 indicate win nothing
   tableData.push(loselines)

   res.render('index', { Alllines: Alllines })
});







module.exports = router;
