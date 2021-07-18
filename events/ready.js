module.exports = async client => {
  const { MessageEmbed } = require('discord.js')
  const chalk = require('chalk')
  const mysql = require('mysql')
  const config = client.config
  const channel = client.channels.cache.find(cn => cn.id === config.channel)

  let botid = config.targetbot
  let time = config.time
  let online = config.status.online
  let offline = config.status.offline

  let ctitle = config.embed.title.text
  let desc = config.embed.desc.text
  let footer = config.embed.footer.text
  let color = config.embed.color

  let type = config.type
  let table = config.mysql.table

  let enabled = config.embed.desc.enable
  let enablef = config.embed.footer.enable
  let enablet = config.embed.title.enable

  let user = client.users.cache.find(x => x.id === botid)
  let title = user.username + ' Stats'
  if (enablet === true) title = ctitle

  let foot = 'Updated every ' + time + ' seconds'
  if (enablef === true) foot = 'Updated every ' + time + ' seconds | ' + footer

  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  console.log(chalk.green('Name: ') + chalk.cyan('BotStats'))
  console.log(chalk.green('Mysql: ') + chalk.cyan(type))
  console.log(chalk.green('Version: ') + chalk.cyan('Stable 1.0.0'))
  console.log(chalk.green('Refresh Time: ') + chalk.cyan(time + ' Seconds'))
  console.log(chalk.green('Bot Status: ') + chalk.cyan('Online'))
  console.log(chalk.green('Support: ') + chalk.cyan('https://discord.gg/9Z7zpdwATZ'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

  let text = ''
  setInterval(() => {
    let stats = user.presence.status
    if (stats === 'online') stats = online
    if (stats === 'offline') stats = offline
    if (type === true) {
      const con = require('../utils/dbConnector')
      con.query('SELECT * FROM ' + table, async function(err,result) {
        text = online
        if (err) {
          text = offline
          console.log(err)
        }

        const embed = new MessageEmbed()
        embed.setTitle(title)
        if (enabled === true) {
          embed.setDescription(desc)
        }
        embed.addField('Bot Status:', stats)
        embed.addField('Databases Status:', text)
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(foot)
        embed.setTimestamp()
        channel.send(embed).then(msg => {msg.delete({ timeout: time + '000' })})
        console.log(chalk.cyan('[BotStats Checker] ') + chalk.green('Stats Updated'))
      })
    }
    if (type === false) {
      const embed = new MessageEmbed()
      embed.setTitle(title)
      if (enabled === true) {
        embed.setDescription(desc)
      }
      embed.addField('Bot Status:', stats)
      embed.setThumbnail(client.user.avatarURL())
      embed.setFooter(foot)
      embed.setTimestamp()
      channel.send(embed).then(msg => {msg.delete({ timeout: time + '000' })})
      console.log(chalk.cyan('[BotStats Checker] ') + chalk.green('Stats Updated'))
    }
  }, time + '000')
}
