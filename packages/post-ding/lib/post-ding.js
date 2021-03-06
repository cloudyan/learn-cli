

const request = require('request');
const program = require('commander');

const version = require('../package.json').version;

function miniApp(type) {
  return list[type];
}

program
  .version(version)
  // .usage('[options] <file ...>')
  .option('-m, --message <n>', '发布消息')
  // .option('-t, --type <n>', '小程序名称', miniApp)
  // .option('-r, --range <a>..<b>', 'A range', range)
  // .option('-l, --list <items>', 'A list', list)
  // .option('-o, --optional [value]', 'An optional value')
  // .option('-c, --collect [value]', 'A repeatable value', collect, [])
  // .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);

// node ./src/postding.js -t hsq2  -m @2.1.0
console.log(program.message)

const regMsg = /^mini/i;
if (!program.message) {
  return '请输入正确的参数 ding -m 钉消息';
}

const msgTip = `${program.message} 发布啦 `;

const url = 'https://oapi.dingtalk.com/robot/send?access_token=';
const robots = [
  '38e6757164adfb68852b6ec0ce9151d797b091ceb11b9343fb8258f9954ca56b',
  '2161d3a87496843f3640d2f5d67037d581846c8bced6c1b50599bcfa3cae146b',
];

// 小程序发布通知
const message = {
  "msgtype": "text",
  "text": {
    "content": msgTip,
  },
  "at": {
    "isAtAll": true
  }
}

robots.forEach((item) => {
  const options = {
    method: 'POST',
    url: `${url}${item}`,
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'application/json',
    },
    // json: true,
    body: JSON.stringify(message),
  };
  request(options, function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
  })
});

