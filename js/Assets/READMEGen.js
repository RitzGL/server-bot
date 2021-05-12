exports.gen = 

function (msg,fs,cmd) {
    if (msg.content === `${cmd}readme`) {
      wordCatcher(msg)
    };
  };
  
  function wordCatcher(msg) {
    var collectedText = []
    var initiator = msg.member
    const filter = m => m.member == initiator;
    const collector = msg.channel.createMessageCollector(filter, { idle: 60000 });
  
    collector.on('collect', m => {
      if (m.content === 'stop') {
        collector.stop()
        console.log('stopped')
      } else {
        console.log(`Collected ${m.content}`);
        let readmeText = ''
        readmeText += m.content
        let mdAdjust = readmeText.replace('heading', '##')
        mdAdjust = mdAdjust.replace('subtitle', '###')
        mdAdjust = mdAdjust.replace('title', '#')
        collectedText.push(mdAdjust)
      }
    });
  
    collector.on('end', collected => {
      console.log(`Collected ${collectedText.length} items`);
  
      let finalContent = '';
  
      collectedText.forEach(element => {
        finalContent += (element + '\n');
      })
      makeReadme(finalContent, msg)
    });
  }
  
  function makeReadme(str, msg) {
    fs.writeFile('helloworld.md', `${str}`, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.md');
    });
    msg.channel.send({
      files: ['helloworld.md']
    });
  }