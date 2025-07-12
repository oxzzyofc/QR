const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: oxzzy_bot,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function OXZZY_VISHNU_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_oxzzy_bot = oxzzy_bot({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Ubuntu)", "Chrome (Linux)", "Chrome (MacOs)"]
             });
             if(!Pair_Code_By_oxzzy_bot.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_oxzzy_bot.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_oxzzy_bot.ev.on('creds.update', saveCreds)
            Pair_Code_By_oxzzy_bot.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_oxzzy_bot.sendMessage(Pair_Code_By_oxzzy_bot.user.id, { text: 'OXZZYOFC~' + b64data });

               let OXZZY_KING_TEXT = `
OXZZY OFC Sucess Scan Session 

> Bot repo: https://github.com/oxzzyofc/OXZZY-BOT

> Owner: *Vishnu*

> BotName: *OXZZY BOT* 



*Follow support for updates*
https://instagram.com/ox.zzy


> _Regards oxzzyofc_ `

 await Pair_Code_By_oxzzy_bot.sendMessage(Pair_Code_By_oxzzy_bot.user.id,{text:OXZZY_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_oxzzy_bot.ws.close();
        await removeFile('./temp/'+id);
   require('child_process').exec('pm2 restart PAIR');
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    OXZZY_VISHNU_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Currently Unavailable"});
         }
        }
    }
    return await OXZZY_VISHNU_PAIR_CODE()
});
module.exports = router
