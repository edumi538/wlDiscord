const { MessageEmbed} = require('discord.js')
const randomstring = require('randomstring');
const pool = require('../database/index')

module.exports.run = async (client, message) => {
               
  pool.getConnection(async function(err, connection) {
    if (err) throw err;
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    message.delete({ timeout: 300 }).catch(() => {})
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
    const ch = await message.guild.channels.create(message.author.id, { parent: '836887051743658005', permissionOverwrites: [ { id: message.guild.id, deny: ['VIEW_CHANNEL'], }, { id: message.author.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'], }, ] })
    // Embeds Iniciar
    const embed = new MessageEmbed()
    .setAuthor('Cabaré City', 'https://cdn.discordapp.com/attachments/792945435073314876/836865535739691048/cdl.png', '')
    .setDescription(`
    <a:2_seta_direita:832756896279691265>  Olá <@${message.author.id}>!

    <a:2_seta_direita:832756896279691265> Seja bem vindo ao nosso Sistema Exclusivo de Whitelist!

    <a:2_seta_direita:832756896279691265>  Para iniciar as perguntas digite aqui neste canal **iniciar**

    <a:2_seta_direita:832756896279691265>  você possui 1 minuto para responder a cada pergunta
    <a:2_seta_direita:832756896279691265>  somente você e o bot possuem acesso a este canal

    <a:2_seta_direita:832756896279691265>  Se falhar, terá que refazer a whitelist!
    `) 
	  .setFooter('dev by thejota#0001', 'https://cdn.discordapp.com/attachments/792945435073314876/836865535739691048/cdl.png');
  /////// Embeds Pergunta !
   const idEmbed = new MessageEmbed()
   .setTitle('Pergunta n.º <a:11_:832763122783223848> ')
    .setColor('#600670')
    .setDescription(`
    <a:2_seta_direita:832756896279691265> Qual o seu id apresentado no jogo?
    `) 
   ///
    const nameEmbed = new MessageEmbed()
    .setTitle('Pergunta n.º <a:12_:832763130916503612>')
    .setColor('#600670')
    .setDescription(`
    <a:2_seta_direita:832756896279691265> Qual o nome  e sobrenome do seu personagem?
    `) 
   ///
   const embedrr = new MessageEmbed()
   .setTitle('Cabaré City')
   .setColor('RED')
   .setTitle('Ops... ')
   .setDescription(`! <@${message.author.id}>, algo deu errado. Este jogador já possui whitelist!`);
   ////
   const finalEmbed = new MessageEmbed()
   .setTitle('Cabaré City')
   .setColor('#600670')
   .setDescription(`
    Parabéns! <@${message.author.id}>!
    Estamos concluindo seu registro! <a:2_simmm:832755559870496819>
   
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
       await sleep(60000)
       let whitelisted = message.guild.roles.cache.get("837135523646537740");
       await message.member.roles.add(whitelisted);
       const embedv = new MessageEmbed()
       .setAuthor("Seja bem vindo(a) ao Cabaré City.", "https://cdn.discordapp.com/emojis/778780190280646676.gif?v=1")
       .setDescription(`
       Você acaba de ser aprovado na whitelist do Cabaré City!

       #Tecle F8 e digite no console:
       connect 191.232.187.176

       Cabaré city é um servidor de fivem livre para se divertir!
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
 });
};
  
  function nigger(ch) {
    ch.delete({ timeout: 10000 }).catch(() => {})
    return
 }
