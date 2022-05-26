import React, { useState } from 'react';
const App = () => {
    const [alarms, setAlarmsList] = useState([]);

    chrome.alarms.getAll((alarmsList) => {
        console.log('lalarms', alarmsList);
        // alarms = alarmsList;
        if (JSON.stringify(alarmsList) != JSON.stringify(alarms)) {
            setAlarmsList(alarmsList);
        }
    })
    const removeAlarm = (name) => {
        if (alarms.length) {
            setAlarmsList(alarms.filter(alarm => alarm.name !== name));
            chrome.alarms.clear(name);
        }
    }
    return (
        <div className="container">
            {alarms?.[0]?.name ?
                <div>
                    <div style={{ fontSize: '15px', textAlign: 'center' }}>
                        <h1>Please stop your tracker before leaving</h1>
                        <p style={{fontSize: '20px'}}>{alarms?.[0]?.name}</p>


                        <p> <button style={{ borderRadius: '20px', backgroundColor: '#4fb7e8', color: 'white', marginTop: '5re', fontSize: '1.7rem', padding: '0.7rem', marginTop: '2rem' }}
                            name="closeButton"
                            value="Close"
                            className="closeButton"
                            onClick={(e) => { e.preventDefault(); removeAlarm(alarms[0].name) }}>Close
                        </button></p>
                    </div>

                </div>
                :
                <div style={{ fontSize: '15px', textAlign: 'center' }}>
                     <h1>Do Not Have Any Task</h1>
                </div>
            }
        </div>
    );
};

export default App;