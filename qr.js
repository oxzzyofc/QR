const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: oxzzy_vishnu,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("OXZZY-QR-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function OXZZY_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_oxzzy_vishnu = oxzzy_vishnu({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_oxzzy_vishnu.ev.on('creds.update', saveCreds)
			Qr_Code_By_oxzzy_vishnu.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_oxzzy_vishnu.sendMessage(Qr_Code_By_oxzzy_vishnu.user.id, { text: "" + b64data });
	
				   let OXZZY_TEXT = `
┏━━━━━━━━━━━━━━
┃MASTER MD SESSION IS 
┃SUCCESSFULLY
┃CONNECTED ✅🔥
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❶ || Creator = Vishnu / OXZZY 👨🏻‍💻
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❷ || WhattsApp = https://chat.whatsapp.com/KJl4ihT0khfBPe0vlgIwDM
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❸ || Owner = https://wa.me/+917907389440
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❺ || INSTAGRAM = https://www.instagram.com/ox.zzy
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
created by vishnu`
	 await Qr_Code_By_oxzzy_vishnu.sendMessage(Qr_Code_By_oxzzy_vishnu.user.id,{text:OXZZY_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_oxzzy_vishnu.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					OXZZY_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await OXZZY_QR_CODE()
});
module.exports = router
