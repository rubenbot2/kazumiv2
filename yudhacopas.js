const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./dha.js')
nocache('../dha.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'yellow'), 'File is updated!'))

const starts = async (dha = new WAConnection()) => {
	dha.logger.level = 'warn'
	console.log(color(figlet.textSync('Javaica BOTZ V2', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[SOURCE CODE INI DIJAGA DAN DI LINDUNGI OLEH Kazumi-Team\n\n', 'orange'), color('\n======TERIMKASIH BANYAK KEPADA======\n•MHANKBARBAR\n•NINO\n•IKYADS\n•Rendy\n•DAFFA PATNER SAYA\n•COPAS TEAM\n•PENYEDIA APIKEY\n•Ndyie Botz\n•SELURUH SUBSCRIBERKU\n•Ndyie Botz', 'yellow'))
	console.log(color('\n\nJANGAN DI JUAL ULANG BRO😑\nKALAU ADA YG MINTA SURUH CHAT ©Javaica😅\nWA Javaica Botz 6289512355896�', 'pink'))
	dha.browserDescription = ["SHERLYNN BOTZ", "Chrome", "3.0.0"];

	// Menunggu QR
	dha.on('qr', () => {
		console.log(color('[', 'pink'), color('!', 'red'), color(']', 'pink'), color('SCANLAH BROKAN LU OWNER GUA SEKARANG'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && dha.loadAuthInfo(`./${setting.sessionName}.json`)
	dha.on('connecting', () => {
		console.log(color('[ Javaica ]', 'purple'), color('PROSES PENYAMBUNGAN'));
	})
const spinner = { 
  "interval": 120,
  "frames": [
    "J",
    "Ja",
    "Jav",
    "Java",
    "Javai",
    "Javaic",
    "Javaica",
    "Javaica X ",
    "Javaica X K",
    "Javaica X Ka",
    "Javaica X Kazu",
    "Javaica X Kazum",
    "Javaica X Kazumi",
    "Javaica X Kazumi-",
    "Javaica X Kazumi-T",
    "Javaica X Kazumi-Te",
    "Javaica X Kazumi-Tea",
    "Javaica X Kazumi-Team",
      ]}

	//connect
	dha.on('open', () => {
		console.log(color('[ Javaica ]', 'purple'), color('BOT SUDAH AKTIF SELAMAT MENGGUNAKAN'));
	})

	// session
	await dha.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(dha.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	dha.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dha.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	dha.on('group-participants-update', async (anu) => {
		await welcome(dha, anu)
	})

	dha.on('chat-update', async (message) => {
		require('./dha.js')(dha, message)
	})
}

starts()