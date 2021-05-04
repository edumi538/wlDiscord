const { MessageEmbed} = require('discord.js')
const randomstring = require('randomstring');
const pool = require('../database/index')
const serverCfg = require('../servercfg.json')
module.exports.run = async (client, message) => {
               
  pool.getConnection(async function(err, connection) {
    if (err) throw err;
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    message.delete({ timeout: 300 }).catch(() => {})
    if (message.channel.id === `${serverCfg.idCanalWL}`) {

    if (message.guild.channels.cache.find(a => a.name == message.author.id)) return message.reply(`Você já possui uma whitelist aberta, siga em: <#${message.guild.channels.cache.find(a => a.name == message.author.id).id}>`).catch((a) => a.delete({ timeout: 10000 }).catch(() => {}))
    var randWL = randomstring.generate({
        length: 8,
        charset: 'hex'
      });
      let form = {
        idGame: 0,
        nome: 'Nenhum',
        finalizou: 'false'
      }
    const ch = await message.guild.channels.create(message.author.id, { parent: `${serverCfg.idCategoriaWL}`, permissionOverwrites: [ { id: message.guild.id, deny: ['VIEW_CHANNEL'], }, { id: message.author.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'], }, ] })
    // Embeds Iniciar
    const embed = new MessageEmbed()
    .setAuthor(`${serverCfg.servername}`, 'https://thegameworld.net/wp-content/uploads/2020/10/fivemlogo001.png', '')
    .setDescription(`
    >>  Olá <@${message.author.id}>!

    >> Seja bem vindo ao nosso Sistema Exclusivo de Whitelist!

    >>  Para iniciar as perguntas digite aqui neste canal **iniciar**

    >>  você possui 1 minuto para responder a cada pergunta
    >>  somente você e o bot possuem acesso a este canal

    >>  Se falhar, terá que refazer a whitelist!
    `) 
	  .setFooter('dev by thejota#0001', 'https://thegameworld.net/wp-content/uploads/2020/10/fivemlogo001.png');
  /////// Embeds Pergunta !
   const idEmbed = new MessageEmbed()
   .setTitle('Pergunta n.º 1 ')
    .setColor('#600670')
    .setDescription(`
    >> Qual o seu id apresentado no jogo?
    `) 
   ///
    const nameEmbed = new MessageEmbed()
    .setTitle('Pergunta n.º 2')
    .setColor('#600670')
    .setDescription(`
    >> Qual o nome  e sobrenome do seu personagem?
    `) 
   ///
   const embedrr = new MessageEmbed()
   .setTitle(`${serverCfg.servername}`)
   .setColor('RED')
   .setTitle('Ops... ')
   .setDescription(`! <@${message.author.id}>, algo deu errado. Este jogador já possui whitelist!`);
   ////
   const finalEmbed = new MessageEmbed()
   .setTitle(`${serverCfg.servername}`)
   .setColor('#600670')
   .setDescription(`
    Parabéns! <@${message.author.id}>!
    Estamos concluindo seu registro! :D
   
    Fique tranquilo que eu lhe avisarei no privado sobre o resultado!

    `) 
    ///
    await ch.send(embed)
    await ch.awaitMessages(m => m.content, { max: 1, time: 15000 }).then(a => resposta = a.first().content).catch(() =>  nigger(ch))
    console.log(resposta)
    await ch.bulkDelete(100);
    await ch.send(idEmbed).then(m => msg = m).catch(() => {})
    await ch.awaitMessages(m => m.content, { max: 1, time: 60000 }).then(a => form.idGame = a.first().content).catch(() => nigger(ch))
    if (msg) msg.delete().catch(() => {})
    await ch.bulkDelete(100);
    var sql = `SELECT  * FROM vrp_users WHERE id=${form.idGame}`;
       connection.query(sql, async function (err, result) {
       if (err) throw err;
       var result2 = JSON.stringify(result) 
        
        console.log(result2)
    if(result2.includes('","whitelisted":1,"')) {
      await ch.send(embedrr).catch(() => {}).then(m => msg = m)
      await sleep(5000)
      await ch.delete({ timeout: 10000 }).catch(() => {})
      return;
    } else {
    
      await ch.send(nameEmbed).catch(() => {}).then(m => msg = m)
      await ch.awaitMessages(m => m.content, { max: 1, time: 60000 }).then(a => form.nome = a.first().content).catch(() => nigger(ch))
      if (msg) msg.delete().catch(() => {})
      await ch.bulkDelete(100);
      form.finalizou = true;
 
      if(form.finalizou == true) {
        await ch.send(finalEmbed).catch(() => {}).then(m => msg = m)
        console.log({ idGame: form.idGame, nome: form.nome, finalizado: form.finalizou})
        await sleep(15000)
        await ch.delete({ timeout: 10000 }).catch(() => {})
        var sql = `UPDATE vrp_users SET whitelisted='1' WHERE id=${form.idGame}`;
            connection.query(sql, function (err, result) {
              if (err) throw err;         
       });
       await sleep(30000)
       let whitelisted = message.guild.roles.cache.get(`${serverCfg.idCargoWL}`);
       let notwhitelisted = message.guild.roles.cache.get(`${serverCfg.idCargoNotWL}`)
       await message.member.roles.add(whitelisted);
       await message.member.roles.remove(notwhitelisted)
       const embedv = new MessageEmbed()
       .setAuthor(`Seja bem vindo(a) ao ${serverCfg.servername}.`, "https://cdn.discordapp.com/emojis/778780190280646676.gif?v=1")
       .setDescription(`
       Você acaba de ser aprovado na whitelist do ${serverCfg.servername}!

       #Tecle F8 e digite no console:
       connect ${serverCfg.ipservidor}

       ${serverCfg.servername}, é um servidor de fivem livre para se divertir!
       `)
       .setColor("#ff6496")
       .setImage('https://i.pinimg.com/originals/d0/5a/5f/d05a5f8348acaf793bb3e399928e7194.gif')
        await message.member.send(embedv)
       console.log({ whitelist: true, status: 'finalizada', discord: 'ok', game: 'ok'})
       return message.member.setNickname(`${form.nome} | ${form.idGame}`)
      }else {
        return
      }
    }
    
  }); 
} else {
  message.react('😡')
  message.channel.send(`Você só pode executar este comando em <#${serverCfg.idCanalWL}>`).then(x => x.delete({ timeout: 19000 }).catch(() => {}));
  return
}

 });
 
};
  
  function nigger(ch) {
    ch.delete({ timeout: 10000 }).catch(() => {})
    return
 }
