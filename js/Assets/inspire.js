exports.inspire = function (msg, args, fs) {
  const dir = `./Assets/youcandoallthings/`;
  fs.readdir(dir, (err, files) => {
    console.log(files.length);
    inspirationPoint = Math.floor(Math.random() * files.length - 1)
    if (args.length == 1) {
      if (args < files.length - 1) {
        inspirationPoint = args
      } else {
        msg.channel.send(`Please use a number between 0 and ${files.length - 2}`)
        return
      }
    }
    msg.channel.send({
      files: [`./Assets/youcandoallthings/inspire${inspirationPoint}.png`]
    });
  });
}


