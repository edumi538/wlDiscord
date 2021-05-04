const { MessageEmbed} = require('discord.js')
module.exports.run = async (client, message, args) => {
  var complete = new MessageEmbed()
  .setAuthor(``)
  .setThumbnail("https://4.bp.blogspot.com/-fHPvPTT4Byw/WtnSPbLqFqI/AAAAAAAARm0/fJknKgxX-vMLEdzmxVsIwUOHHWp_9hm0QCLcBGAs/s1600/prega%25C3%25A7%25C3%25A3o_estudo_b%25C3%25ADblico_Lucas15_varrer_casa_dracma_perdida.gif")
  .setColor(0x000000);
  message.channel.bulkDelete((Number(args[0]) || 10), false)
  complete.setTitle("Sujeira limpa com sucesso!").setDescription(`Chat limpo.`);
  message.channel.send(complete).then(x => x.delete({ timeout: 19000 }).catch(() => {}));
};
  
