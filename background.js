//For Server
//var socket = io.connect('https://extension-backend.hestawork.com');
//For Local URL OF NODE Server
var socket = io.connect('http://127.0.0.1:4000');

//Socket connection through node server
socket.on('FromAPI', function (data) {
    console.log('Client connected', data);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'notification32.png',
        title: 'Alarm',
        message: data.TaskName,
        /* buttons: [{
            title: 'Keep it Flowing.'
        }], */
        priority: 0
    });
    const audio = new Audio('./Old-alarm-clock-sound.mp3');
    audio.play();
    chrome.alarms.clearAll();
    chrome.alarms.create(data.TaskName, {
        periodInMinutes: 5/60
    })


    //chrome.runtime.sendMessage({msg:"socket",text:'please start your task'},function(response){});
    /* chrome.alarms.create('Reminder pl start your tracker', {
        periodInMinutes: data.time/60
    }) */
});



// listener for alarm, execute when an alarm has elasped
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("alarm", alarm);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'notification32.png',
        title: 'Alarm',
        message: alarm.name,
       /*  buttons: [{
            title: 'Keep it Flowing.'
        }], */
        priority: 0
    });
    const audio = new Audio('./Old-alarm-clock-sound.mp3');
    audio.play();
})

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log('tabId, changeInfo, tab', tabId, changeInfo, tab);
//     chrome.storage.sync.get('alarmData', (storage) => {
//         console.log('storage', storage);

//         if (storage.alarmData.length) {

//         } else {

//         }
//     });
// })