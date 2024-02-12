import socketio
import win32evtlog
import pandas as pd


# Extract login and logout event data
def monitor_login_logout_events():
    events = []

    handle = win32evtlog.OpenEventLog(None, 'Security')

    total_records = win32evtlog.GetNumberOfEventLogRecords(handle)

    event_types = [win32evtlog.EVENTLOG_AUDIT_SUCCESS, win32evtlog.EVENTLOG_AUDIT_FAILURE]

    while True:
        events_batch = win32evtlog.ReadEventLog(handle,
                                                win32evtlog.EVENTLOG_BACKWARDS_READ | win32evtlog.EVENTLOG_SEQUENTIAL_READ,
                                                0)

        for event in events_batch:
            if event.EventType in event_types:
                events.append({
                    'timestamp': event.TimeGenerated.Format(),
                    'eventType': 'Login' if event.EventType == win32evtlog.EVENTLOG_LOGON else 'Logout',
                    'username': event.StringInserts[0]
                })
        if len(events) >= total_records:
            break

        win32evtlog.CloseEventLog(handle)

        return events


# Preprocess Extracted Data
def preprocess_data(events):
    df = pd.DataFrame(events)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['date'] = df['timestamp'].dt.date
    df['time'] = df['timestamp'].dt.time
    return df


# Transmitting Processed Data
def transmit_processed_data():
    events = monitor_login_logout_events()
    processed_data = preprocess_data(events)
    socketio.emit('login_logout_data', processed_data.to_dict(orient='records'))
