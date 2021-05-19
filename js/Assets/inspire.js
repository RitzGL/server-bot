exports.inspire = function (msg) {
    inspirationPoint = Math.floor(Math.random()*162)
    msg.channel.send({
        files: [`./Assets/youcandoallthings/inspire${inspirationPoint}.png`]
      });
}