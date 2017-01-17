/**
 * Created by LittleGpNator on 17.01.2017.
 */



function mobileSend(content) {
    //MÅ GJØRES I BACKEND
    //FRONTEND:
    //<button onclick="mobileSend('Hei Håvard, vi fra MinVakt ønsker deg Lykke til!!')">Send melding til håvard</button>

    var twilio = require(twilio);
    var client = twilio('AC907d3b123dfdddb0a167ba95a00341aa', 'a3503ef64e1e10c8c881cf5395190f55');
    //noinspection JSAnnotator
    client.sendMessage({
        to: '+47 46420821',
        from: '(217) 861-4880',
        body: content
    });
}